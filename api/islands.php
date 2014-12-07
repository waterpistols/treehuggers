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


// Polling endpoint
$app->get('/islands-polling', function() use ($app, $db) {
	if(isset($_COOKIE['TH-Token'])) {
		$neighbours = array();

		$cookieValue = $_COOKIE['TH-Token'];

  	$result = $db->getSessionByToken($cookieValue);

  	$island = $db->getIslandByUserId($result['user_id']);

  	$islandUsers = $db->getIslandUsersByIslandId($island['island_id']);

  	foreach ($islandUsers as $islandUser) {
  		if ($islandUser['user_id'] != $result['user_id']) {
				$neighbours[] = $db->getById('users', $islandUser['user_id']);					
  		}  		
  	}
		  	
  	$relations = $db->getUserRelationsByIsland($island['island_id'], true);

  	foreach ($neighbours as $key => $neighbour) {
  		// calculating degradation sum
  		$degradingSum = $db->calculateDegradingSum($neighbour['user_id']);
      $neighbours[$key]['degrading_sum'] = $degradingSum['degrading_sum'];

  		// calculating position

        $OK = false;
  		foreach ($relations as $relation) {
  			if ($relation['user_id'] == $result['user_id']) {
                $OK = true;
  				if ($relation['neighbour_id'] == $neighbour['user_id'] && !isset($neighbours[$key]['position'])) {
  					$neighbours[$key]['position'] = $relation['position'];  					
  				}
  			} else {
  				if ($relation['neighbour_id'] == $result['user_id']) {
  					$referenceId       = $relation['user_id'];
  					$referencePosition = $relation['position'];
  					
  				}		
  			}
  		}

        if (!$OK) {
            foreach ($relations as $relation) {
                if ($relation['user_id'] == $referenceId && $relation['neighbour_id'] == $neighbour['id'] && !isset($neighbours[$key]['position'])) {

                if ($relation['position'] === 'north' && $referencePosition == 'west') {
                $neighbours[$key]['position'] = 'west';

                }

                if ($relation['position'] === 'north' && $referencePosition == 'east') {
                $neighbours[$key]['position'] = 'east';
                }

                elseif ($relation['position'] === 'east' && $referencePosition == 'west') {
                $neighbours[$key]['position'] = 'north';

                }

                if ($relation['position'] === 'east' && $referencePosition == 'north') {
                $neighbours[$key]['position'] = 'west';
                }

                if ($relation['position'] === 'west' && $referencePosition == 'north') {
                $neighbours[$key]['position'] = 'east';
                }

                if ($relation['position'] === 'west' && $referencePosition == 'east') {
                $neighbours[$key]['position'] = 'north';
                }
                }

                if ($relation['user_id'] == $referenceId && $relation['neighbour_id'] == $result['user_id'] && !isset($neighbours[$key]['position'])) {


                if ($relation['position'] == 'north' && !isset($neighbours[$key]['position'])) {
                $neighbours[$key]['position'] = 'north';
                }

                if ($relation['position'] == 'west' && !isset($neighbours[$key]['position'])) {

                $neighbours[$key]['position'] = 'east';
                }

                if ($relation['position'] == 'east' && !isset($neighbours[$key]['position'])) {
                    $neighbours[$key]['position'] = 'west';
                }
                }
             }}


      // getting help notification
      $help = $db->getNotificationByUserId($neighbour['user_id']);

      if ($help) {
        $neighbours[$key]['askForHelp'] = true;
      }
  		
  		
  	}

  	$app->response->setBody(json_encode($neighbours), FALSE);
	}
});