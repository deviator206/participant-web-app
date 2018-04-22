<?php
class Database{
 
    // specify your own database credentials
    private $host = "localhost";
    private $db_name = "s80824_neuro_db";
    private $username = "sandeep";
    private $password = "sandeep";
    public $conn;
 
    // get the database connection
    public function getConnection(){
 
        $this->conn = null;
 
        try{
            // echo "trying to connect";
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            // echo " now dones,....";
             $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            // echo "Connected successfully"; 
            
        }catch(PDOException $exception){
            // echo "Connection error: " . $exception->getMessage();
        }
 
        return $this->conn;
    }


    public function closeConnection(){
        $this->conn = null;
    }
}   
?>