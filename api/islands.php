<?php

// Get All
$app->get('/islands', function () use ($app, $db) {
	
	$result = $db->getAll('islands');
	
	$app->response->setBody(json_encode($result));

});

// Get By Id
$app->get('/islands/:id', function ($id) use ($app, $db) {
	
	$result = $db->getById('islands', $id);
	
	$app->response->setBody(json_encode($result));

});

// Create
$app->post('/islands', function() use ($app, $db) {	
	$requestBody['fields'] = json_decode($app->request->getBody(), TRUE);
	$requestBody['table'] = 'islands';
	
	$result = $db->create($requestBody);
	
	$app->response->setBody(json_encode($result));

});

// Update
$app->put('/islands/:id', function ($id) use ($app, $db) {
	$requestBody['fields'] = json_decode($app->request->getBody(), TRUE);
	$requestBody['table'] = 'islands';

	$result = $db->update($requestBody);

	$app->response->setBody(json_encode($result), FALSE);
});

// Delete
$app->delete('/islands/:id', function ($id) use ($app, $db) {
	$requestBody['fields'] = json_decode($app->request->getBody(), TRUE);
	$requestBody['table'] = 'islands';

	$result = $db->remove($requestBody);

	$app->response->setBody(json_encode($result), FALSE);
});