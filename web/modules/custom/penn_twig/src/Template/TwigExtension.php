<?php

namespace Drupal\penn_twig\Template;

use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;
use Drupal\Core\Url;
use Drupal\Component\Utility\UrlHelper;

/**
 * Twig extension providing custom functionalities.
 *
 * @package Drupal\penn_twig\Template
 */
class TwigExtension extends AbstractExtension
{
  /**
   * {@inheritdoc}
   */
  public function getName()
  {
    return 'penn_twig';
  }

  /**
   * {@inheritdoc}
   */
  public function getFunctions()
  {
    return [
      new TwigFunction('penn_twig_is_link_external', [
        $this,
        'isLinkExternal'
      ]),
      new TwigFunction('external_link_class', [
        $this,
        'getExternalLinkClass'
      ]),
    ];
  }

  public function isLinkExternal($item) {
    // $url = $item['#url'];
    // $url_object = $item['content']['#url'];
    // if($url_object) {
    //   return $url_object->isExternal();
    // }
    //Likely a link field raw value passed from a penn_entity template
    //e.g. penn_entity.field_link.value
    if(isset($item[0]['uri']) && is_string($item[0]['uri'])) {
      return UrlHelper::isExternal($item[0]['uri']);
      // return UrlHelper::isExternal($item);
    }
    //Likely from a link field template, and '#url' is a UrlObject inside the 'content' render array
    if(isset($item['content']['#url']) && $item['content']['#url'] instanceof Url){
      return $item['content']['#url']->isExternal();
    }
    //Item is a simplify_menu array and 'url' is a string, but check to make sure.
    elseif(isset($item['url']) && is_string($item['url'])) {
      return UrlHelper::isExternal($item['url']);
    }
  }

  function getExternalLinkClass() {
     return 'cta--arrow';
  }
}
