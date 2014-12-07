<?php

// Get All
$app->get('/users', function () use ($app, $db) {
	
	$result = $db->getAll('users');	
	echo "<html><head><title>Slim Application Error</title><style>body{margin:0;padding:30px;font:12px/1.5 Helvetica,Arial,Verdana,sans-serif;}h1{margin:0;font-size:48px;font-weight:normal;line-height:48px;}strong{display:inline-block;width:65px;}</style></head><body><h1>Slim Application Error</h1><p>The application could not run because of the following error:</p><h2>Details</h2><div><strong>Type:</strong> ErrorException</div><div><strong>Code:</strong> 8</div><div><strong>Message:</strong> Undefined index: email</div><div><strong>File:</strong> /vagrant/public/local.dev/api/users.php</div><div><strong>Line:</strong> 94</div><h2>Trace</h2><pre><div>#0 /vagrant/public/local.dev/api/users.php(94): Slim\Slim::handleErrors(8, 'Undefined index...', '/vagrant/public...', 94, Array)
<div>#1 [internal function]: {closure}()";
	$app->response->setBody(json_encode($result));

});

// Get By Id
$app->get('/users/:id', function ($id) use ($app, $db) {
	
	$result = $db->getById('users', $id);
	
	$app->response->setBody(json_encode($result));

});

$app->post('/logout', function() use ($app, $db) {

	if(isset($_COOKIE['TH-Token'])) {
		$cookieValue = $_COOKIE['TH-Token'];
  	$result = $db->getSessionByToken($cookieValue);

  	if ($result) {
  		$params['fields'] = $result;
  		$params['table']  = 'sessions';
  				
  		$db->remove($params);
  		unset($_COOKIE['TH-Token']);
  		setcookie('TH-Token', '', time() - 3600);
  		$app->response->setBody('success');
  	}

	} else {
		$app->response->setBody('failed logout');
	}	
});
// Create
$app->post('/login', function() use ($app, $db) {	

	$requestBody['fields'] = json_decode($app->request->getBody(), TRUE);
	$requestBody['table'] = 'users';
	
	if (!$requestBody['fields']) {		
		$response = array('status' => 666, 'errorMessage' => 'Empty payload');
		$app->response->setBody(json_encode($response));
		
	} else {

		$existing = $db->getUserByApiId($requestBody['fields']['api_id']);

		if ($existing) {
			$requestBody['fields']['first_login'] = 0;
			$requestBody['fields']['id'] = $existing['id'];

			$result = $db->getById('users', $requestBody['fields']['id']);
			
			$session = $db->getSessionByUserId($result['id']);

			// Create a token for the session
			$salt = microtime();
			$token = crypt($requestBody['fields']['api_id'] + microtime(), $salt);

			$now = date("Y-m-d H:i:s");
			$expires = date("Y-m-d H:i:s", strtotime($now) + 3600);

			$params['table'] = 'sessions';
			$params['fields'] = array(
				'token'     => $token,
				'user_id'   => $result['id'],
				'last_used' => date("Y-m-d H:i:s"),
				'expires'   => $expires
			);
			if ($session) {						
				$params['fields']['id'] = $session['id'];					

				$db->update($params);
			}	else {			
				$db->create($params);
			}

			$result['token'] = $token;
			setcookie('TH-Token', $token);
			$db->update($requestBody);
			$app->response->setBody(json_encode($existing));
		} else {

			$requestBody['fields']['first_login'] = 1;
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
			$token = crypt($requestBody['fields']['api_id'] + microtime(), $salt);

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

			$result['token'] = $token;
			setcookie('TH-Token', $token);
			$app->response->setBody(json_encode($result));	
		}
		
	}

	

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