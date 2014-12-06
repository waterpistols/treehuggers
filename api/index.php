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

$app->get('/users', function () use ($app, $db) {
	
	$result = $db->getAll('users');
	
	$app->response->setBody(json_encode($result));

});

$app->get('/users/:id', function ($id) use ($app, $db) {
	
	$result = $db->getById('users', $id);
	
	$app->response->setBody(json_encode($result));

});

$app->post('/users', function() use ($app, $db) {	
	$requestBody['fields'] = json_decode($app->request->getBody(), TRUE);
	$requestBody['table'] = 'users';
	
	$result = $db->create($requestBody);

	$app->response->setBody(json_encode($result));

});

$app->put('/users/:id', function ($id) use ($app, $db) {
	$requestBody['fields'] = json_decode($app->request->getBody(), TRUE);
	$requestBody['table'] = 'users';

	$result = $db->update($requestBody);

	$app->response->setBody(json_encode($result), FALSE);
});

$app->delete('/users/:id', function ($id) use ($app, $db) {
	$requestBody['fields'] = json_decode($app->request->getBody(), TRUE);
	$requestBody['table'] = 'users';

	$result = $db->remove($requestBody);

	$app->response->setBody(json_encode($result), FALSE);
});

$app->run();