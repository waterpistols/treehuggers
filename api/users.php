<?php

// Get All
$app->get('/users', function () use ($app, $db) {
	
	$result = $db->getAll('users');	
	$app->response->setBody(json_encode($result));

});

// Get User
$app->get('/user', function () use ($app, $db) {

	if(isset($_COOKIE['TH-Token'])) {
		$cookieValue = $_COOKIE['TH-Token'];

  	$result = $db->getSessionByToken($cookieValue);
  	
  	$result = $db->getById('users', $result['user_id']);

  	$zones = $db->getZonesByUserId($result['user_id']);

  	$result['zones'] = $zones;

  	$db->update(array(
  		'table'  => 'users',
  		'fields' => array(
  			'id'          => $result['user_id'],
  			'first_login' => 0
			)
		));
	}

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

			$apiId  = $requestBody['fields']['api_id'];
			$result = $db->create($requestBody);

			// initializing user data
			$requestBody['table'] = 'users_data';

			$requestBody['fields'] = array(
				'user_id'   => $result['id'],
				'trees'     => 8,
				'pollution' => 100,
				'asks'      => 3
			);
			$db->create($requestBody);

			// initializing zones
			$zones = $db->getAll('zones');

			$requestBody['table'] = 'users_zones';
			foreach ($zones as $zone) {
				$requestBody['fields'] = array(
					'user_id'         => $result['id'],
					'zone_id'         => $zone['id'],
					'degrading_state' => 0
				);

				$db->create($requestBody);
			}

			// Assign user to island
			$island = $db->getAssignableIsland();			

			// No island created yet OR no free island
			if (!$island) {

				$params['fields'] = array(
					'name'    => 'Serenity',
					'players' => 1
				);
				$params['table'] = 'islands';

				$island = $db->create($params);

				$params['fields'] = array(
					'user_id'   => $result['id'],
					'island_id' => $island['id']
				);
				$params['table'] = 'islands_users';

				$db->create($params);

			} else {
				// There is a free island. Assign the new user to it
				$params['fields'] = array(
					'user_id'   => $result['id'],
					'island_id' => $island['id']
				);
				$params['table'] = 'islands_users';

				$db->create($params);

				$island['players']++;
				
				$params['fields'] = $island;
				$params['table'] = 'islands';
				
				$db->update($params);			
			}

			$positions = array(				
				1 => 'west',
				2 => 'north',
				3 => 'east'
			);

			$oppositions = array(
				1 => 'east',
				2 => 'north',
				3 => 'west'
			);

			if ($island['players'] == 2) {
				$islandUsers = $db->getIslandUsersByIslandId($island['id']);				

				foreach ($islandUsers as $islandUser) {
					if($islandUser['user_id'] != $result['id']) {
						$entry = array(
							'island_id'    => $island['id'],
							'user_id'      => $islandUser['user_id'],
							'neighbour_id' => $result['id'],
							'position'      => 'west'
						);

						$db->create(array(
							'table'  => 'users_relations',
							'fields' => $entry
						));
						$neighbourId = $islandUser['user_id'];
					}
				}				
			}

			if ($island['players'] > 2 && $island['players'] <= 4) {
				$userRelation = $db->getUserRelationsByIsland($island['id']);

				$entry = array(
					'island_id'    => $island['id'],
					'user_id'      => $userRelation['user_id'],
					'neighbour_id' => $result['id'],
					'position'     => $positions[$island['players'] - 1]
				);

				$db->create(array(
					'table'  => 'users_relations',
					'fields' => $entry
				));
			}
			

			// Create a token for the session
			$salt = microtime();
			$token = crypt($apiId + microtime(), $salt);

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

			$db->update(array(
				'table'  => 'users',
				'fields' => array(
					'id'          => $result['id'],
					'first_login' => 1
				)
			));

			$result['token'] = $token;
			setcookie('TH-Token', $token);
			$app->response->setBody(json_encode($result));	
		}
		
	}	

});

// ask for help
$app->post('/ask-help', function() use($app, $db) {
	if(isset($_COOKIE['TH-Token'])) {
		$cookieValue = $_COOKIE['TH-Token'];

  	$result = $db->getSessionByToken($cookieValue);
  	
  	$db->create(array(
  		'table' => 'help_notifications',
  		'fields' => array(
  			'user_id'       => $result['user_id'],
  			'received_help' => 0
			)  		
		));

		$user = $db->getById('users', $result['user_id']);

		$db->update(array(
			'table'  => 'users_data',
			'fields' => array(
				'asks' => $user['asks'] - 1,
				'id'   => $user['user_data_id']
			)
		));
		$user['asks']--;
		$app->response->setBody(json_encode($user));	
  }

});

// help
$app->post('/help', function() use($app, $db) {
	if(isset($_COOKIE['TH-Token'])) {
		$cookieValue = $_COOKIE['TH-Token'];

  	$result      = $db->getSessionByToken($cookieValue);
  	
  	$helpingUser = $db->getById('users', $result['user_id']);
  	$helpingUser['trees']--;
  	
  	$db->update(array(
			'table'  => 'users_data',
			'fields' => array(
				'trees' => $helpingUser['trees'],
				'id'   => $helpingUser['user_data_id']
			)
		));

  	$payload     = json_decode($app->request->getBody(), TRUE);
  	$helpedUser  = $db->getById('users', $payload['user_id']);
  	
  	$notif = $db->getNotificationByUserId($payload['user_id']);

  	$db->update(array(
  		'table'  => 'help_notifications',
  		'fields' => array(
  			'id'            => $notif['id'],
  			'received_help' => 1
			)
		));		
  }

  $app->response->setBody(json_encode(array('trees' => $helpingUser['trees'])), FALSE);

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