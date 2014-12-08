<?php

// Get All
$app->get('/questions', function () use ($app, $db) {
	
	// determine userId
	$cookieValue = $_COOKIE['TH-Token'];

	$session = $db->getSessionByToken($cookieValue);

	$result = $db->getAllQuestions($session['user_id']);

	foreach($result as $key => $question) {
			
		$questionIds[] = $question['id'];
		

		if ($question['type'] !== 'Input') {
			$answers = $db->getAnswersByQuestionId($question['id']);

			foreach ($answers as $answerKey => $answer) {
				unset($answers[$answerKey]['correct']);
			}

			$result[$key]['answers'] = $answers;
		}
	}

	if ($result) {
		
		$questionId = array_rand($questionIds);
		$questionId = $questionIds[$questionId];

		foreach ($result as $key => $question) {
			if ($questionId == $question['id']) {
				$idKey = $key;
			}
		}

		$result = $result[$idKey];
		
	}

	$app->response->setBody(json_encode($result));

});

// Get By Id
$app->get('/questions/:id', function ($id) use ($app, $db) {

	$result = $db->getById('questions', $id);

	$answers = $db->getAnswersByQuestionId($result['id']);

	foreach ($answers as $answerKey => $answer) {
		$answers[$answerKey]['correct'] = (boolean) $answer['correct'];
	}

	$result['answers'] = $answers;

	$app->response->setBody(json_encode($result));

});

// Create
$app->post('/questions', function() use ($app, $db) {
	$payload = json_decode($app->request->getBody(), TRUE);

	// determine userId
	$cookieValue = $_COOKIE['TH-Token'];

	$result = $db->getSessionByToken($cookieValue);

	// question type input
	if (isset($payload['answerText'])) {
		$answerText = $payload['answerText'];
		$answerId   = 0;
		$answer = $db->getAnswersByQuestionId($payload['questionId'], $type = 'Input');

		$correct = ($answerText <= $answer['text'] + ($answer['text'] / 10) && $answerText >=  $answer['text'] - ($answer['text'] / 10)) ? true : false;

	} else {
		$answerText = '';
		$answerId = $payload['answerId'];
		$answer = $db->getById('answers', $answerId);

		$correct = (boolean) $answer['correct'];
	}

	$userData = $db->getUserDataByUserId($result['user_id']);
	$zones    = $db->getZonesByUserId($result['user_id']);

	// if the answer is incorrect, degrade a zone
	if ($correct === false) {
		$zone = $db->getEligibleZone($result['user_id']);		

		$zones = array();
		
		if ($zone) {
			
			$zones[] = $zone;
			$zone['degrading_state']--;

			if ($zone['degrading_state'] == 0) {
				$userData['pollution'] = ($userData['pollution'] + 16) > 100 ? 100 : $userData['pollution'] + 16;
				$db->update(array(
					'table'  => 'users_data',
					'fields' => $userData
				));
			}

			$db->update(array(
				'table'  => 'users_zones',
				'fields' => $zone
			));
		}
	}

	// if the answer is correct, increase number of trees
	if ($correct === true) {

		$question = $db->getById('questions', $payload['questionId']);
		
		$userData['points'] += $question['points'];
		$userData['trees']++;		

		$db->update(array(
			'table'  => 'users_data',
			'fields' => $userData
		));
	}

	$result = $db->getById('users', $result['user_id']);  

  $result['zones']   = $zones;
  $result['correct'] = $correct;
  $result['points']  = $userData['points'];
  
	$requestBody           = array();
	$requestBody['table']  = 'users_answers';
	$requestBody['fields'] = array(
		'question_id' => $payload['questionId'],
		'answer_id'   => $answerId,
		'answer_text' => $answerText,
		'user_id'     => $result['user_id'],
		'correct'     => $correct
	);

	$db->create($requestBody);

	// $response = array($result);

	$app->response->setBody(json_encode($result));

});

// Update
$app->put('/questions/:id', function ($id) use ($app, $db) {
	$requestBody['fields'] = json_decode($app->request->getBody(), TRUE);
	$requestBody['table'] = 'questions';

	$result = $db->update($requestBody);

	$app->response->setBody(json_encode($result), FALSE);
});

// Delete
$app->delete('/questions/:id', function ($id) use ($app, $db) {
	$requestBody['fields'] = json_decode($app->request->getBody(), TRUE);
	$requestBody['table']  = 'questions';

	$result = $db->remove($requestBody);

	$app->response->setBody(json_encode($result), FALSE);
});


// Plant tree
$app->post('/plant', function() use ($app, $db) {
	// determine userId
	$cookieValue = $_COOKIE['TH-Token'];

	$result = $db->getSessionByToken($cookieValue);

	$payload = json_decode($app->request->getBody(), TRUE);
	$zoneId  = $payload['zoneId'];
    
	// set zone to fully planted
	$userZone = $db->getZonesByUserId($result['user_id'], $zoneId);
	$userZone['degrading_state'] = 3;
    unset($userZone['title']);
	$var = $db->update(array(
		'table'  => 'users_zones',
		'fields' => $userZone
	));
    
	// decrease the number of trees by 4
	$userData = $db->getUserDataByUserId($result['user_id']);
	$userData['trees'] -= 4;

	$userData['pollution'] = ($userData['pollution'] - 16) < 20 ? 20 : $userData['pollution'] - 16;	

	$db->update(array(
		'table'  => 'users_data',
		'fields' => $userData
	));

	
	$db->update(array(
		'table'  => 'users_data',
		'fields' => $userData
	));

	$app->response->setBody(json_encode($userData), FALSE);
});
