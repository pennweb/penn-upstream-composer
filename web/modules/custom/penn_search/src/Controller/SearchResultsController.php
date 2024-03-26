<?php

namespace Drupal\penn_search\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Component\Utility\Xss;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\RequestStack;

/**
 * Search Results controller for the penn_search module.
 */
class SearchResultsController extends ControllerBase {

  /**
   * The request stack manager. We're using this to access URL parameters.
   *
   * @var \Symfony\Component\HttpFoundation\RequestStack
   */
  protected $requestStack;

  /**
   * {@inheritdoc}
   */
  public function __construct(RequestStack $request_stack) {
    $this->requestStack = $request_stack;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('request_stack')
    );
  }

  /**
   * Displays the search results page.
   *
   * @return array
   *   A render array as expected by
   *   \Drupal\Core\Render\RendererInterface::render().
   */
  public function pennSearchResults() {
    $config = $this->config('penn_search.settings');
    $search_query_parameter = $config->get('search_query_parameter');
    //If it's empty then set to empty string. Can't pass null to Xss::filter().
    $search_query_parameter = empty($search_query_parameter) ? '' : $search_query_parameter;
    $search_terms = $this->requestStack->getCurrentRequest()->query->get($search_query_parameter);
    $search_terms = empty($search_terms) ? '' : $search_terms;

    $build['results'] = [
      '#type' => 'markup',
      '#cache' => ['max-age' => 0],
      '#theme' => 'penn_search',
      '#penn_search_label' => $config->get('penn_search_label'),
      '#site_name' => $this->config('system.site')->get('name'),
      '#search_query_parameter' => $search_query_parameter,
      '#search_terms' => $search_terms,
      '#search_pg_title' => $config->get('search_pg_title'),
      '#refined_search_title' => $config->get('refined_search_title'),
      '#global_search_title' => $config->get('global_search_title'),
      '#show_global_search_first' => $config->get('show_global_search_first'),
      '#search_pg_tagline' => $config->get('search_pg_tagline'),
      '#attached' => [
        'library' => ['penn_search/penn_search'],
      ]
    ];
    // Send some config to our custom JS:
    $build['results']['#attached']['drupalSettings']['penn_search']['searchEngineID'] = $config->get('penn_search_cx');

    return $build;
  }

}
