<?php

namespace Drupal\penn_api_entity\Form;

use Drupal\Core\Entity\EntityForm;
use Drupal\Core\Form\FormStateInterface;

/**
 * Class PennApiEntityTypeForm.
 */
class PennApiEntityTypeForm extends EntityForm {

  /**
   * {@inheritdoc}
   */
  public function form(array $form, FormStateInterface $form_state) {
    $form = parent::form($form, $form_state);

    $penn_api_entity_type = $this->entity;
    $form['label'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Label'),
      '#maxlength' => 255,
      '#default_value' => $penn_api_entity_type->label(),
      '#description' => $this->t("Label for the Penn API Entity type."),
      '#required' => TRUE,
    ];

    $form['id'] = [
      '#type' => 'machine_name',
      '#default_value' => $penn_api_entity_type->id(),
      '#machine_name' => [
        'exists' => '\Drupal\penn_api_entity\Entity\PennApiEntityType::load',
      ],
      '#disabled' => !$penn_api_entity_type->isNew(),
    ];

    /* You will need additional form elements for your custom properties. */

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function save(array $form, FormStateInterface $form_state) {
    $penn_api_entity_type = $this->entity;
    $status = $penn_api_entity_type->save();

    switch ($status) {
      case SAVED_NEW:
        $this->messenger()->addMessage($this->t('Created the %label Penn API Entity type.', [
          '%label' => $penn_api_entity_type->label(),
        ]));
        break;

      default:
        $this->messenger()->addMessage($this->t('Saved the %label Penn API Entity type.', [
          '%label' => $penn_api_entity_type->label(),
        ]));
    }
    $form_state->setRedirectUrl($penn_api_entity_type->toUrl('collection'));
    return $status;
  }

}
