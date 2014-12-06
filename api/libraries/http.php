<?php

if (!(strstr($_SERVER['REQUEST_URI'], 'login') || $_SERVER['REQUEST_METHOD'] === 'POST')) {
	
	if (isset($_COOKIE['TH-Token'])) {

		$cookieValue = $_COOKIE['TH-Token'];		

		if ($cookieValue) {
			$result = $db->getSessionByToken($cookieValue);	

			$now                 = date("Y-m-d H:i:s");
			$expires             = date("Y-m-d H:i:s", strtotime($now) + 3600);

			$result['expires']   = $expires;
			$result['last_used'] = $now;
			$params['table']     = 'sessions';
			$params['fields']    = $result;

			$db->update($params);

			setcookie('TH-Token', $cookieValue);
		}
	}	else {
		
	}
} 