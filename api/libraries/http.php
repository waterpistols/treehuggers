<?php

if (strstr($_SERVER['REQUEST_URI'], 'login') && $_SERVER['REQUEST_METHOD'] === 'POST') {
	
} else {
	$token = $app->request->headers('Th-Token');
	
	if ($token) {
		$result = $db->getSessionByToken($token);

		if (!$result) {
			#TO-DO: die nicely;
			die('TOKEN1');
		}

		$now                 = date("Y-m-d H:i:s");
		$expires             = date("Y-m-d H:i:s", strtotime($now) + 3600);

		$result['expires']   = $expires;
		$result['last_used'] = $now;
		$params['table']     = 'sessions';
		$params['fields']    = $result;

		$db->update($params);
	} else {
		#TO-DO: die nicely;
		die('TOKEN2');
	}
}