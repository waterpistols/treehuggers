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

require 'users.php';
require 'questions.php';
require 'islands.php';

$app->response->headers->set('Access-Control-Allow-Origin', 'http://andreilaza.koding.io');
$app->response->headers->set('Access-Control-Allow-Credentials', 'true');
$app->response->headers->set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
$app->response->headers->set('Access-Control-Allow-Headers', 'Content-Type');

$app->run();
