<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require 'vendor/autoload.php';
require 'libraries/database.php';

$app = new \Slim\Slim(array(
		'debug' => true,
		'mode'  => 'development'
	)
);

$db = new DB();

require 'libraries/http.php';

// $app->add(new \Slim\Middleware\SessionCookie(array(
//     'expires' => '60 minutes',
//     'path' => '/',
//     'domain' => null,
//     'secure' => false,
//     'httponly' => false,
//     'name' => 'slim_session',
//     'secret' => $token,
//     'cipher' => MCRYPT_RIJNDAEL_256,
//     'cipher_mode' => MCRYPT_MODE_CBC
// )));

require 'users.php';
require 'islands.php';

$app->run();
