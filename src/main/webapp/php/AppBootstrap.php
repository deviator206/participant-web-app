<?php
class AppBootstrap{
 
    // database connection and table name
    private $conn;
    private $table_name = "neuro_account";
 
    // object properties
    public $id;
    public $accountName;
    public $accountMediaId;
    public $accountId;

    // constructor with $db as database connection
    public function __construct($db, $accountId){
        $this->conn = $db;
        $this->accountId = $accountId;
    }

        // read products
    public function read(){
        // echo "start in func";
        // select all query
        $query = "SELECT * FROM neuro_account where generatedId ='$this->accountId'";
        // echo "start in func1";
        // prepare query statement
        $stmt = $this->conn->prepare($query);
        // echo "start in func2";
        // execute query
        $stmt->execute();
        
        // echo "func ended";
        return $stmt;
    }
}
?>