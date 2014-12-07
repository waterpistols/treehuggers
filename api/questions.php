<?php

// Get All
$app->get('/questions', function () use ($app, $db) {
		
	$payload = $app->request->params();

	$result = $db->getAllQuestions();
	
	foreach($result as $key => $question) {

		if ($payload && isset($payload['random'])) {
			$questionIds[] = $question['id'];
		}

		if ($question['type'] !== 'Input') {
			$answers = $db->getAnswersByQuestionId($question['id']);

			foreach ($answers as $answerKey => $answer) {			
				unset($answers[$answerKey]['correct']);
			}		 

			$result[$key]['answers'] = $answers;
		}
	}

	if ($result) {
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

	$response = array(
		'correct' => $correct
	);
	
	$app->response->setBody(json_encode($response));

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