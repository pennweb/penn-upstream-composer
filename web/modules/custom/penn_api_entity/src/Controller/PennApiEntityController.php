<?php

namespace Drupal\penn_api_entity\Controller;

use Drupal\Component\Utility\Xss;
use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\DependencyInjection\ContainerInjectionInterface;
use Drupal\Core\Url;
use Drupal\penn_api_entity\Entity\PennApiEntityInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Class PennApiEntityController.
 *
 *  Returns responses for Penn API Entity routes.
 */
class PennApiEntityController extends ControllerBase implements ContainerInjectionInterface {

  /**
   * The date formatter.
   *
   * @var \Drupal\Core\Datetime\DateFormatter
   */
  protected $dateFormatter;

  /**
   * The renderer.
   *
   * @var \Drupal\Core\Render\Renderer
   */
  protected $renderer;

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    $instance = parent::create($container);
    $instance->dateFormatter = $container->get('date.formatter');
    $instance->renderer = $container->get('renderer');
    return $instance;
  }

  /**
   * Displays a Penn API Entity revision.
   *
   * @param int $penn_api_entity_revision
   *   The Penn API Entity revision ID.
   *
   * @return array
   *   An array suitable for drupal_render().
   */
  public function revisionShow($penn_api_entity_revision) {
    $penn_api_entity = $this->entityTypeManager()->getStorage('penn_api_entity')
      ->loadRevision($penn_api_entity_revision);
    $view_builder = $this->entityTypeManager()->getViewBuilder('penn_api_entity');

    return $view_builder->view($penn_api_entity);
  }

  /**
   * Page title callback for a Penn API Entity revision.
   *
   * @param int $penn_api_entity_revision
   *   The Penn API Entity revision ID.
   *
   * @return string
   *   The page title.
   */
  public function revisionPageTitle($penn_api_entity_revision) {
    $penn_api_entity = $this->entityTypeManager()->getStorage('penn_api_entity')
      ->loadRevision($penn_api_entity_revision);
    return $this->t('Revision of %title from %date', [
      '%title' => $penn_api_entity->label(),
      '%date' => $this->dateFormatter->format($penn_api_entity->getRevisionCreationTime()),
    ]);
  }

  /**
   * Generates an overview table of older revisions of a Penn API Entity.
   *
   * @param \Drupal\penn_api_entity\Entity\PennApiEntityInterface $penn_api_entity
   *   A Penn API Entity object.
   *
   * @return array
   *   An array as expected by drupal_render().
   */
  public function revisionOverview(PennApiEntityInterface $penn_api_entity) {
    $account = $this->currentUser();
    $penn_api_entity_storage = $this->entityTypeManager()->getStorage('penn_api_entity');

    $langcode = $penn_api_entity->language()->getId();
    $langname = $penn_api_entity->language()->getName();
    $languages = $penn_api_entity->getTranslationLanguages();
    $has_translations = (count($languages) > 1);
    $build['#title'] = $has_translations ? $this->t('@langname revisions for %title', ['@langname' => $langname, '%title' => $penn_api_entity->label()]) : $this->t('Revisions for %title', ['%title' => $penn_api_entity->label()]);

    $header = [$this->t('Revision'), $this->t('Operations')];
    $revert_permission = (($account->hasPermission("revert all penn api entity revisions") || $account->hasPermission('administer penn api entity entities')));
    $delete_permission = (($account->hasPermission("delete all penn api entity revisions") || $account->hasPermission('administer penn api entity entities')));

    $rows = [];

    $vids = $penn_api_entity_storage->revisionIds($penn_api_entity);

    $latest_revision = TRUE;

    foreach (array_reverse($vids) as $vid) {
      /** @var \Drupal\penn_api_entity\PennApiEntityInterface $revision */
      $revision = $penn_api_entity_storage->loadRevision($vid);
      // Only show revisions that are affected by the language that is being
      // displayed.
      if ($revision->hasTranslation($langcode) && $revision->getTranslation($langcode)->isRevisionTranslationAffected()) {
        $username = [
          '#theme' => 'username',
          '#account' => $revision->getRevisionUser(),
        ];

        // Use revision link to link to revisions that are not active.
        $date = $this->dateFormatter->format($revision->getRevisionCreationTime(), 'short');
        if ($vid != $penn_api_entity->getRevisionId()) {
          $link = $this->l($date, new Url('entity.penn_api_entity.revision', [
            'penn_api_entity' => $penn_api_entity->id(),
            'penn_api_entity_revision' => $vid,
          ]));
        }
        else {
          $link = $penn_api_entity->link($date);
        }

        $row = [];
        $column = [
          'data' => [
            '#type' => 'inline_template',
            '#template' => '{% trans %}{{ date }} by {{ username }}{% endtrans %}{% if message %}<p class="revision-log">{{ message }}</p>{% endif %}',
            '#context' => [
              'date' => $link,
              'username' => $this->renderer->renderPlain($username),
              'message' => [
                '#markup' => $revision->getRevisionLogMessage(),
                '#allowed_tags' => Xss::getHtmlTagList(),
              ],
            ],
          ],
        ];
        $row[] = $column;

        if ($latest_revision) {
          $row[] = [
            'data' => [
              '#prefix' => '<em>',
              '#markup' => $this->t('Current revision'),
              '#suffix' => '</em>',
            ],
          ];
          foreach ($row as &$current) {
            $current['class'] = ['revision-current'];
          }
          $latest_revision = FALSE;
        }
        else {
          $links = [];
          if ($revert_permission) {
            $links['revert'] = [
              'title' => $this->t('Revert'),
              'url' => $has_translations ?
              Url::fromRoute('entity.penn_api_entity.translation_revert', [
                'penn_api_entity' => $penn_api_entity->id(),
                'penn_api_entity_revision' => $vid,
                'langcode' => $langcode,
              ]) :
              Url::fromRoute('entity.penn_api_entity.revision_revert', [
                'penn_api_entity' => $penn_api_entity->id(),
                'penn_api_entity_revision' => $vid,
              ]),
            ];
          }

          if ($delete_permission) {
            $links['delete'] = [
              'title' => $this->t('Delete'),
              'url' => Url::fromRoute('entity.penn_api_entity.revision_delete', [
                'penn_api_entity' => $penn_api_entity->id(),
                'penn_api_entity_revision' => $vid,
              ]),
            ];
          }

          $row[] = [
            'data' => [
              '#type' => 'operations',
              '#links' => $links,
            ],
          ];
        }

        $rows[] = $row;
      }
    }

    $build['penn_api_entity_revisions_table'] = [
      '#theme' => 'table',
      '#rows' => $rows,
      '#header' => $header,
    ];

    return $build;
  }

}
