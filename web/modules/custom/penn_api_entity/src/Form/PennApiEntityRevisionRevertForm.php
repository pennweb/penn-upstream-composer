<?php

namespace Drupal\penn_api_entity\Form;

use Drupal\Core\Form\ConfirmFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;
use Drupal\penn_api_entity\Entity\PennApiEntityInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Entity\RevisionableStorageInterface;

/**
 * Provides a form for reverting a Penn API Entity revision.
 *
 * @ingroup penn_api_entity
 */
class PennApiEntityRevisionRevertForm extends ConfirmFormBase {

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
   * The date formatter service.
   *
   * @var \Drupal\Core\Datetime\DateFormatterInterface
   */
  protected $dateFormatter;

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    $instance = parent::create($container);
    $instance->pennApiEntityStorage = $container->get('entity_type.manager')->getStorage('penn_api_entity');
    $instance->dateFormatter = $container->get('date.formatter');
    return $instance;
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'penn_api_entity_revision_revert_confirm';
  }

  /**
   * {@inheritdoc}
   */
  public function getQuestion() {
    return $this->t('Are you sure you want to revert to the revision from %revision-date?', [
      '%revision-date' => $this->dateFormatter->format($this->revision->getRevisionCreationTime()),
    ]);
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
    return $this->t('Revert');
  }

  /**
   * {@inheritdoc}
   */
  public function getDescription() {
    return '';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state, $penn_api_entity_revision = NULL) {
    $this->revision = $this->pennApiEntityStorage->loadRevision($penn_api_entity_revision);
    $form = parent::buildForm($form, $form_state);

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    // The revision timestamp will be updated when the revision is saved. Keep
    // the original one for the confirmation message.
    $original_revision_timestamp = $this->revision->getRevisionCreationTime();

    $this->revision = $this->prepareRevertedRevision($this->revision, $form_state);
    $this->revision->revision_log = $this->t('Copy of the revision from %date.', [
      '%date' => $this->dateFormatter->format($original_revision_timestamp),
    ]);
    $this->revision->save();

    $this->logger('content')->notice('Penn API Entity: reverted %title revision %revision.', ['%title' => $this->revision->label(), '%revision' => $this->revision->getRevisionId()]);
    $this->messenger()->addMessage(t('Penn API Entity %title has been reverted to the revision from %revision-date.', ['%title' => $this->revision->label(), '%revision-date' => $this->dateFormatter->format($original_revision_timestamp)]));
    $form_state->setRedirect(
      'entity.penn_api_entity.version_history',
      ['penn_api_entity' => $this->revision->id()]
    );
  }

  /**
   * Prepares a revision to be reverted.
   *
   * @param \Drupal\penn_api_entity\Entity\PennApiEntityInterface $revision
   *   The revision to be reverted.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   The current state of the form.
   *
   * @return \Drupal\penn_api_entity\Entity\PennApiEntityInterface
   *   The prepared revision ready to be stored.
   */
  protected function prepareRevertedRevision(PennApiEntityInterface $revision, FormStateInterface $form_state) {
    $revision->setNewRevision();
    $revision->isDefaultRevision(TRUE);
    $revision->setRevisionCreationTime(\Drupal::time()->getRequestTime());
    return $revision;
  }

}
