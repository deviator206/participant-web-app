<?php
class DBClass {

    private $host = "localhost";
    private $username = "sandeep";
    private $password = "sandeep";
    private $database = "neuro_db";

    public $connection;

    // get the database connection
    public function getConnection(){

        $this->connection = null;

        try{
            $this->connection = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->database, $this->username, $this->password);
            $this->connection->exec("set names utf8");
        }catch(PDOException $exception){
            // echo "Error: " . $exception->getMessage();
        }

        return $this->connection;
    }
}
?>