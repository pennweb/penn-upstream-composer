<?php

namespace Drupal\penn_api_entity\Form;

use Drupal\Core\Form\ConfirmFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Datetime\DateFormatterInterface;
use Drupal\Core\Entity\RevisionableStorageInterface;

/**
 * Provides a form for deleting a Penn API Entity revision.
 *
 * @ingroup penn_api_entity
 */
class PennApiEntityRevisionDeleteForm extends ConfirmFormBase {

  /**
   * The Penn API Entity revision.
   *
   * @var \Drupal\penn_api_entity\Entity\PennApiEntityInterface
   */
  protected $revision;

  /**
   * The Penn API Entity storage.
   *
   * @var \Drupal\Core\Entity\RevisionableStorageInterface
   */
  protected $pennApiEntityStorage;

  /**
   * The database connection.
   *
   * @var \Drupal\Core\Database\Connection
   */
  protected $connection;

  /**
   * @var \Drupal\Core\Datetime\DateFormatterInterface
   */
  protected $dateFormatter;

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    $instance = parent::create($container);
    /** @var \Drupal\Core\Entity\RevisionableStorageInterface $storage */
    $storage = $instance->pennApiEntityStorage;
    $instance->pennApiEntityStorage = $storage;
    $instance->dateFormatter = $container->get('date.formatter');
    $instance->connection = $container->get('database');
    return $instance;
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'penn_api_entity_revision_delete_confirm';
  }

  /**
   * {@inheritdoc}
   */
  public function getQuestion() {
    return $this->t('Are you sure you want to delete the revision from %revision-date?', [
      '%revision-date' => $this->dateFormatter->format($this->revision->getRevisionCreationTime(), 'short'),    ]);
  }

  /**
   * {@inheritdoc}
   */
  public function getCancelUrl() {
    return new Url('entity.penn_api_entity.version_history', ['penn_api_entity' => $this->revision->id()]);
  }

  /**
   * {@inheritdoc}
   */
  public function getConfirmText() {
    return $this->t('Delete');
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state, $penn_api_entity_revision = NULL) {
    $this->revision = $this->pennApiEntityStorage->loadRevision($penn_api_entity_revision);    $form = parent::buildForm($form, $form_state);

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $this->pennApiEntityStorage->deleteRevision($this->revision->getRevisionId());

    $this->logger('content')->notice('Penn API Entity: deleted %title revision %revision.', ['%title' => $this->revision->label(), '%revision' => $this->revision->getRevisionId()]);
    $this->messenger()->addMessage($this->t('Revision from %revision-date of Penn API Entity %title has been deleted.', [
      '%revision-date' => $this->dateFormatter->format($this->revision->getRevisionCreationTime(), 'short'),
      '%title' => $this->revision->label(),
    ]));
    $form_state->setRedirect(
    'entity.penn_api_entity.canonical',
      ['penn_api_entity' => $this->revision->id()]
    );
    if ($this->connection->query('SELECT COUNT(DISTINCT vid) FROM {penn_api_entity_field_revision} WHERE id = :id', [':id' => $this->revision->id()])->fetchField() > 1) {
      $form_state->setRedirect(
        'entity.penn_api_entity.version_history',
         ['penn_api_entity' => $this->revision->id()]
      );
    }
  }

}
