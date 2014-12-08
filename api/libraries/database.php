<?php

class DB {

	private $dbHandler;
	private $query; 

	// Database config items
	const DBUSER = 'root';
	const DBPASS = 'treehuggers';
	const DBNAME = 'treehuggers';
	const DBHOST = 'localhost';

	const MAXPLAYERS = 4;

	// Construct 
	public function __construct() {
		try {
			$this->dbHandler = new PDO('mysql:host=' . DB::DBHOST . ';dbname=' . DB::DBNAME, DB::DBUSER, DB::DBPASS);
		} catch (PDOException $e) {
    	print "Error!: " . $e->getMessage() . "<br/>";
    	die();
		}
	}	

	############## GENERAL METHODS ##############

	// get all items from table method
	public function getAll($table = '') {
		$this->query = "SELECT * FROM " . $table;

		return $this->dbHandler->query($this->query)->fetchAll(PDO::FETCH_ASSOC);

	}

	// get all items from table method
	public function getById($table = '', $id = 0) {
    $this->query = "SELECT * FROM `" . $table . "` WHERE `id` = " . $id;

    if ($table === 'users') {
      $this->query = "SELECT `users`.*, `users_data`.*, `users_data`.`id` as user_data_id FROM `users` LEFT JOIN `users_data` ON `users`.`id` = `users_data`.`user_id` WHERE `users`.`id` = " . $id;
    }		
		
		return $this->dbHandler->query($this->query)->fetch(PDO::FETCH_ASSOC);
		
	}	

	// insert method
	public function create($params = array()) {
		extract($params);

		$keys = array_keys($fields);

		$this->query = 'SHOW COLUMNS FROM `' . $table . '` ';

		$result = $this->dbHandler->query($this->query)->fetchAll();

		foreach ($result as $field) {
			$dbFields[] = $field['Field'];
		}

		foreach ($keys as $key => $field) {
			if (!in_array($field, $dbFields)) {
				unset($keys[$key]);
				unset($fields[$field]);
			}
		}		

		$this->query = 'INSERT INTO `' . $table . '` '
     . '(' . implode(', ', $keys) . ') '
     . "VALUES ('".implode("', '", $fields)."')";    

    $result = $this->dbHandler->query($this->query);

    // throw error
    if (!$result) {
    	$error = $this->dbHandler->errorInfo();

    	return array(
    		'errorMessage' => $error[2],
    		'status'       => 666
  		);
    }

    $lastInsert = $this->dbHandler->lastInsertId();

    if ($lastInsert) {
    	$fields['id'] = $lastInsert;	
    }
    
    return $fields;
	}


	// update method
	public function update($params = array()) {
		extract($params);
    
    $keys = array_keys($fields);

    $this->query = 'SHOW COLUMNS FROM `' . $table . '` ';

    $result = $this->dbHandler->query($this->query)->fetchAll();

    if (!isset($fields['id'])) {
      unset($_COOKIE['TH-Token']);
      setcookie('TH-Token', '', time() - 3600);
      
    }

    foreach ($result as $field) {
      $dbFields[] = $field['Field'];
    }

    foreach ($keys as $key => $field) {
      if (!in_array($field, $dbFields)) {
        unset($keys[$key]);
        unset($fields[$field]);
      }
    }   

		$this->query = 'UPDATE `' . $table . '` SET ';

		foreach ($fields as $key => $field) {
			$this->query .= '' . $key . ' = "' . $field .'", ';			
		}

		$this->query = substr($this->query, 0, -2);

		$this->query .= " WHERE `id` = " . $fields['id'];
		
		$result = $this->dbHandler->query($this->query);

		// throw error
    if (!$result) {
    	$error = $this->dbHandler->errorInfo();

    	return array(
    		'errorMessage' => $error[2],
    		'status'       => 666
  		);
    }    

    return $fields; 
	}

	// delete method
	public function remove($params = array()) {
		extract($params); 

		$this->query = 'DELETE FROM `' . $table . '` WHERE `id` = ' . $fields['id'];

		$result = $this->dbHandler->query($this->query);

		// throw error
    if (!$result) {
    	$error = $this->dbHandler->errorInfo();

    	return array(
    		'errorMessage' => $error[2],
    		'status'       => 666
  		);
    }    

    return array(
    	'status' =>'200'
    );
  }

  ############## INTERNAL METHODS ##############
  
  // get islands that are not filled
  public function getAssignableIsland() {

  	$this->query = "SELECT * FROM `islands` WHERE `players` < " . DB::MAXPLAYERS . " ORDER BY players ASC LIMIT 1";
  	$result = $this->dbHandler->query($this->query);

  	return $result->fetch(PDO::FETCH_ASSOC);
  }

  // get session entry for token
  public function getSessionByToken($token) {
  	$this->query = "SELECT * FROM `sessions` WHERE `token` = '" . $token . "' AND `expires` > NOW() ";
  	
  	$result = $this->dbHandler->query($this->query);

  	return $result->fetch(PDO::FETCH_ASSOC);
  }

  // get session by userId 
  public function getSessionByUserId($userId) {
  	$this->query = "SELECT * FROM `sessions` WHERE `user_id` = '" . $userId . "' AND `expires` > NOW() ";  	
  	$result = $this->dbHandler->query($this->query);

  	return $result->fetch(PDO::FETCH_ASSOC);
  }

  // get answer by questionId
  public function getAnswersByQuestionId($questionId, $type = 'Dropdown') {
  	$this->query = "SELECT * FROM `answers` WHERE `question_id` = '" . $questionId . "'";  	
  	$result = $this->dbHandler->query($this->query);
  	
    if ($type === 'Input') {
      return $result->fetch(PDO::FETCH_ASSOC);
    }

  	return $result->fetchAll(PDO::FETCH_ASSOC);
  }

  // get all questions filtered by unanswered correctly
  public function getAllQuestions($userId = 0) {
  	$this->query = "SELECT GROUP_CONCAT( `questions`.`id` ) as ids
			FROM `questions`
			LEFT JOIN `users_answers` ON `questions`.`id` = `users_answers`.`question_id`
			WHERE `users_answers`.`correct` = 1 AND `users_answers`.`user_id` = " . $userId . "
			GROUP BY `users_answers`.`correct`";

  	$result = $this->dbHandler->query($this->query)->fetch(PDO::FETCH_ASSOC);
    
    $this->query = "SELECT * FROM `questions`";
    
    if ($result) {
      $this->query .= " WHERE `id` NOT IN (" . $result['ids'] . ")";   
      
    }

    return $this->dbHandler->query($this->query)->fetchAll(PDO::FETCH_ASSOC);


  }

  public function getUserByApiId($apiId = 0) {
    $this->query = "SELECT * FROM `users` WHERE `api_id` = '" . $apiId . "'";

    $result = $this->dbHandler->query($this->query);

    return $result->fetch(PDO::FETCH_ASSOC); 

  }

  public function getZonesByUserId($userId = 0, $zoneId = 0) {
    $this->query = "SELECT `users_zones`.*, `zones`.`title` FROM `users_zones` LEFT JOIN `zones` ON `zones`.`id` = `users_zones`.`zone_id` WHERE `user_id` = '" . $userId . "'";

    if ($zoneId) {
      $this->query .= " AND `zone_id` = " . $zoneId;

      $result = $this->dbHandler->query($this->query);

      return $result->fetch(PDO::FETCH_ASSOC); 
    }

    $result = $this->dbHandler->query($this->query);

    return $result->fetchAll(PDO::FETCH_ASSOC); 

  }

  // choose a zone for degradation 
  public function getEligibleZone($userId = 0) {
    $this->query = "SELECT `users_zones`.*, `zones`.`title` FROM `users_zones` LEFT JOIN `zones` ON `zones`.`id` = `users_zones`.`zone_id` WHERE `user_id` = '" . $userId . "' AND `degrading_state` <= 4 AND `degrading_state` > 0 ORDER BY RANK ASC LIMIT 1";

    $result = $this->dbHandler->query($this->query);

    return $result->fetch(PDO::FETCH_ASSOC); 
  }

  // choose a zone for degradation 
  public function getUserDataByUserId($userId = 0) {
    $this->query = "SELECT * FROM `users_data` WHERE `user_id` = " . $userId;

    $result = $this->dbHandler->query($this->query);
      
    return $result->fetch(PDO::FETCH_ASSOC); 
  }

  public function getIslandUsersByIslandId($islandId = 0) {
    $this->query = "SELECT * FROM `islands_users` WHERE `island_id` = " . $islandId;

    $result = $this->dbHandler->query($this->query);
      
    return $result->fetchAll(PDO::FETCH_ASSOC); 
  }

  public function getIslandByUserId($userId = 0) {
    $this->query = "SELECT * FROM `islands_users` WHERE `user_id` = " . $userId;

    $result = $this->dbHandler->query($this->query);
      
    return $result->fetch(PDO::FETCH_ASSOC); 
  }

  public function getUserRelationsByIsland($islandId = 0, $all = false) {
    $this->query = "SELECT * FROM `users_relations` WHERE `island_id` = " . $islandId;

    if ($all == false) {
      $this->query .= " LIMIT 1";

      $result = $this->dbHandler->query($this->query);
      
      return $result->fetch(PDO::FETCH_ASSOC); 
    }

    $result = $this->dbHandler->query($this->query);
      
    return $result->fetchAll(PDO::FETCH_ASSOC); 

  }

  public function calculateDegradingSum($userId = 0) {
    $this->query = "SELECT SUM(degrading_state) as degrading_sum FROM users_zones WHERE user_id = " . $userId . " GROUP BY user_id";

    $result = $this->dbHandler->query($this->query);
      
    return $result->fetch(PDO::FETCH_ASSOC); 
  }

  public function getNotificationByUserId($userId = 0) {
    $this->query = "SELECT * FROM `help_notifications` WHERE `user_id` = " . $userId . " AND received_help = 0";

    $result = $this->dbHandler->query($this->query);
      
    return $result->fetch(PDO::FETCH_ASSOC); 
  }

  
}