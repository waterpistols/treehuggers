<?php

// Get All
$app->get('/users', function () use ($app, $db) {
	
	$result = $db->getAll('users');
	echo "<html><head><title>Slim Application Error</title><style>body{margin:0;padding:30px;font:12px/1.5 Helvetica,Arial,Verdana,sans-serif;}h1{margin:0;font-size:48px;font-weight:normal;line-height:48px;}strong{display:inline-block;width:65px;}</style></head><body><h1>Slim Application Error</h1><p>The application could not run because of the following error:</p><h2>Details</h2><div><strong>Type:</strong> ErrorException</div><div><strong>Code:</strong> 8</div><div><strong>Message:</strong> Undefined index: id</div><div><strong>File:</strong> /vagrant/public/local.dev/api/users.php</div><div><strong>Line:</strong> 55</div><h2>Trace</h2><pre><div>#0 /vagrant/public/local.dev/api/users.php(55): Slim\Slim::handleErrors(8, 'Undefined index...', '/vagrant/public...', 55, Array)"; 

	$app->response->setBody(json_encode($result));

});

// Get By Id
$app->get('/users/:id', function ($id) use ($app, $db) {
	
	$result = $db->getById('users', $id);
	
	$app->response->setBody(json_encode($result));

});

// Create
$app->post('/users', function() use ($app, $db) {	
	$requestBody['fields'] = json_decode($app->request->getBody(), TRUE);
	$requestBody['table'] = 'users';
	
	$result = $db->create($requestBody);

	// Assign user to island
	$island = $db->getAssignableIsland();

	// No island created yet OR no free island
	if (!$island) {

		$params['fields'] = array(
			'name'    => 'Serenity',
			'players' => 1
		);
		$params['table'] = 'islands';

		$createdIsland = $db->create($params);

		$params['fields'] = array(
			'user_id' => $result['id'],
			'island_id' => $createdIsland['id']
		);
		$params['table'] = 'islands_users';

		$db->create($params);

	} else {

		$params['fields'] = array(
			'user_id' => $result['id'],
			'island_id' => $island['id']
		);
		$params['table'] = 'islands_users';

		$db->create($params);

		$island['players']++;
		
		$params['fields'] = $island;
		$params['table'] = 'islands';
		
		$db->update($params);
	}


	$app->response->setBody(json_encode($result));

});

// Update
$app->put('/users/:id', function ($id) use ($app, $db) {
	$requestBody['fields'] = json_decode($app->request->getBody(), TRUE);
	$requestBody['table'] = 'users';

	$result = $db->update($requestBody);

	$app->response->setBody(json_encode($result), FALSE);
});

// Delete
$app->delete('/users/:id', function ($id) use ($app, $db) {
	$requestBody['fields'] = json_decode($app->request->getBody(), TRUE);
	$requestBody['table'] = 'users';

	$result = $db->remove($requestBody);

	$app->response->setBody(json_encode($result), FALSE);
});