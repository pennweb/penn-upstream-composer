<?php

/**
 * Load services definition file.
 */
$settings['container_yamls'][] = __DIR__ . '/services.yml';

/**
 * Include the Pantheon-specific settings file.
 *
 * n.b. The settings.pantheon.php file makes some changes
 *      that affect all environments that this site
 *      exists in.  Always include this file, even in
 *      a local development environment, to ensure that
 *      the site settings remain consistent.
 */
include __DIR__ . "/settings.pantheon.php";

/**
 * Disable access to rebuild.php.
 *
 * This setting can be enabled to allow Drupal's php and database cached
 * storage to be cleared via the rebuild.php page. Access to this page can also
 * be gained by generating a query string from rebuild_token_calculator.sh and
 * using these parameters in a request to rebuild.php.
 */
$settings['rebuild_access'] = FALSE;

/**
 * Set the default location of the config directory
 * This can be customized per site in settings.site.php
 */
// $settings['config_sync_directory'] = 'sites/default/config';
$settings['config_sync_directory'] = dirname(DRUPAL_ROOT) . '/config';

/**
 * If there is a site settings file, then include it
 */
$site_settings = __DIR__ . "/settings.site.php";
if (file_exists($site_settings)) {
  include $site_settings;
}

/**
 * If there is a local settings file, then include it
 */
if(isset($_ENV['PANTHEON_ENVIRONMENT']) && $_ENV['PANTHEON_ENVIRONMENT'] == 'lando' ) {
  $local_settings = __DIR__ . "/settings.local.php";
  if (file_exists($local_settings)) {
    include $local_settings;
  }
}

/**
 * If there is a redis file, then include it
 */
if(isset($_ENV['PANTHEON_ENVIRONMENT']) && $_ENV['PANTHEON_ENVIRONMENT'] != 'lando' ) {
  $redis_settings = __DIR__ . "/settings.redis.php";
  if (file_exists($redis_settings)) {
    include $redis_settings;
  }
}

/**
 * If there is a redirects file, then include it
 */
$redirects = __DIR__ . "/settings.redirects.php";
if (file_exists($redirects)) {
  include $redirects;
}
