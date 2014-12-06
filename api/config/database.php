<?php

class DB {

	private $dbHandler;
	private $query; 

	const DBUSER = 'root';
	const DBPASS = 'treehuggers';
	const DBNAME = 'treehuggers';

	public function __construct() {
		try {
			$this->dbHandler = new PDO('mysql:host=localhost;dbname=' . DB::DBNAME, DB::DBUSER, DB::DBPASS);
		} catch (PDOException $e) {
    	print "Error!: " . $e->getMessage() . "<br/>";
    	die();
		}
	}

	public function getAll($table = '') {
		$this->query = "SELECT * FROM " . $table;

		return $this->dbHandler->query($this->query)->fetchAll();

	}
}