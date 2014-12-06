<?php

// Get All
$app->get('/questions', function () use ($app, $db) {
		
	$payload = $app->request->params();

	$result = $db->getAllQuestions();

	foreach($result as $key => $question) {

		if ($payload && isset($payload['random'])) {
			$questionIds[] = $question['id'];
		}

		$answers = $db->getAnswersByQuestionId($question['id']);

		foreach ($answers as $answerKey => $answer) {			
			$answers[$answerKey]['correct'] = (boolean) $answer['correct'];
		}		 

		$result[$key]['answers'] = $answers;
	}

	if ($payload && isset($payload['random'])) {
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

	if (isset($payload['answerText'])) {
		$answerText = $payload['answerText'];
		$answerId   = 0;
	} else {
		$answerText = '';
		$answerId = $payload['answerId'];
	}

	$correct = $payload['correct'] ? true : false;
	
	$requestBody           = array();
	$requestBody['table']  = 'users_answers';
	$requestBody['fields'] = array(
		'question_id' => $payload['questionId'],
		'answer_id'   => $answerId,
		'answer_text' => $answerText,
		'user_id'     => $result['user_id'],
		'correct'     => $correct
	);
	
	$result = $db->create($requestBody);
	
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
	$requestBody['table'] = 'questions';

	$result = $db->remove($requestBody);

	$app->response->setBody(json_encode($result), FALSE);
});