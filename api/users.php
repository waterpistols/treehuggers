<?php

// Get All
$app->get('/users', function () use ($app, $db) {
	
	$result = $db->getAll('users');	

	$app->response->setBody(json_encode($result));

});

// Get By Id
$app->get('/users/:id', function ($id) use ($app, $db) {
	
	$result = $db->getById('users', $id);
	
	$app->response->setBody(json_encode($result));

});

// Create
$app->post('/login', function() use ($app, $db) {	

	$requestBody['fields'] = json_decode($app->request->getBody(), TRUE);
	$requestBody['table'] = 'users';
	
	$result = $db->create($requestBody);

	// Assign user to island
	$island = $db->getAssignableIsland();

	if (!array_key_exists('errorMessage', $result)) {

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
			// There is a free island. Assign the new user to it
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

		// Create a token for the session
		$salt = microtime();
		$token = crypt($requestBody['fields']['email'] + microtime(), $salt);

		$now = date("Y-m-d H:i:s");
		$expires = date("Y-m-d H:i:s", strtotime($now) + 3600);


		$params['table'] = 'sessions';
		$params['fields'] = array(
			'token'     => $token,
			'user_id'   => $result['id'],
			'last_used' => date("Y-m-d H:i:s"),
			'expires'   => $expires
		);

		$db->create($params);
	} else {		
		$result = $db->getById('users', $requestBody['fields']['id']);
		$session = $db->getSessionByUserId($result['id']);

		// Create a token for the session
		$salt = microtime();
		$token = crypt($requestBody['fields']['email'] + microtime(), $salt);

		$now = date("Y-m-d H:i:s");
		$expires = date("Y-m-d H:i:s", strtotime($now) + 3600);

		$params['table'] = 'sessions';
		if ($session) {
					
			$params['fields'] = array(
				'id'        => $session['id'],
				'token'     => $token,
				'user_id'   => $result['id'],
				'last_used' => date("Y-m-d H:i:s"),
				'expires'   => $expires
			);

			$db->update($params);
		}	else {			
	
			$params['fields'] = array(
				'token'     => $token,
				'user_id'   => $result['id'],
				'last_used' => date("Y-m-d H:i:s"),
				'expires'   => $expires
			);

			$db->create($params);
		}	

	}

	$result['token'] = $token;
	setcookie('TH-Token', $token);
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