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

require 'users.php';
require 'islands.php';

$app->run();