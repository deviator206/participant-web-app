<?php
class AppBootstrap{
 
    // database connection and table name
    private $conn;
    private $table_name = "neuro_account";
 
    // object properties
    public $id;
    public $name;
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

        // read products
    public function read(){
     
        // select all query
        $query = "SELECT accountName, id FROM "+$this->table_name ;
     
        // prepare query statement
        $stmt = $this->conn->prepare($query);
     
        // execute query
        $stmt->execute();
     
        return $stmt;
    }
}
?>