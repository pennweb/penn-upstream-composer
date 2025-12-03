<?php

namespace Drupal\penn_menu\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\State\StateInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Settings form for Penn Menu external link icon display.
 *
 * Uses State API to store settings in the database only (not exported to config).
 */
class PennMenuAdmin extends FormBase {

  /**
   * The state service.
   *
   * @var \Drupal\Core\State\StateInterface
   */
  protected $state;

  /**
   * Constructs a PennMenuAdmin object.
   *
   * @param \Drupal\Core\State\StateInterface $state
   *   The state service.
   */
  public function __construct(StateInterface $state) {
    $this->state = $state;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('state')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'penn_menu_admin';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $form['description'] = [
      '#type' => 'markup',
      '#markup' => '<p>' . $this->t('Show External Link Icons for the following menus. These settings only apply to the current site.') . '</p>',
    ];

    $form['header_main_navigation'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Header - Main Navigation'),
      '#default_value' => $this->state->get('penn_menu.header_main_navigation', FALSE),
    ];

    $form['footer_navigate'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Footer - Navigate (Libraries, Public Safety, etc. Flagship only.)'),
      '#default_value' => $this->state->get('penn_menu.footer_navigate', FALSE),
    ];

    $form['footer_utility_links'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Footer - Utility Links (Contact, Maps, Parking. Flagship only.)'),
      '#default_value' => $this->state->get('penn_menu.footer_utility_links', FALSE),
    ];

    $form['footer_legal'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Footer - Legal (Disclaimer, Privacy Policy, etc.)'),
      '#default_value' => $this->state->get('penn_menu.footer_legal', FALSE),
    ];

    $form['actions'] = [
      '#type' => 'actions',
    ];

    $form['actions']['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Save settings'),
      '#button_type' => 'primary',
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $this->state->set('penn_menu.header_main_navigation', (bool) $form_state->getValue('header_main_navigation'));
    $this->state->set('penn_menu.footer_navigate', (bool) $form_state->getValue('footer_navigate'));
    $this->state->set('penn_menu.footer_utility_links', (bool) $form_state->getValue('footer_utility_links'));
    $this->state->set('penn_menu.footer_legal', (bool) $form_state->getValue('footer_legal'));

    $this->messenger()->addStatus($this->t('Penn Menu settings have been saved.'));
  }

}
