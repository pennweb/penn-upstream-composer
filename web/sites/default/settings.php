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

# Provide universal absolute path to the installation.
$settings['simplesamlphp_dir'] = $_ENV['HOME'] .'/code/private/simplesamlphp';

/**
 * If there is a local settings file, then include it
 */
$local_settings = __DIR__ . "/settings.local.php";
if (file_exists($local_settings)) {
  include $local_settings;
}

$config_directories['sync'] = __DIR__ . "/config";
$config['system.site']['name'] = 'Change to Site Name';
$config['system.site']['page']['front'] = '/home';
