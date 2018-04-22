<?php
class ParticipantInfo{
 
    // database connection and table name
    private $conn;
    private $table_name = "neuro_account";
 
    // object properties
    public $id;
    // object properties
    public $name;
    public $phoneNumber;
    public $email;
        public $accoundId;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
        $this->name = '';
        $this->phoneNumber = '';
        $this->email = '';
        $this->accoundId = '';

    }

    public function setName($inputName){
        $this->name = $inputName;
    }


    

    public function setAccountId($inputAccountId){
        $this->accountId = $inputAccountId;
     
    }

    public function setPhoneNumber($inputPhone){
        $this->phoneNumber = $inputPhone;
      }


    public function setEmail($inputEmail){
        $this->email = $inputEmail;

    }


    public function insertIntoDB($inputEmail){
    try {

         $sql = "INSERT INTO participant_information (name,phoneNumber,email,accountId)VALUES ('$this->name','$this->phoneNumber','$this->email','$this->accountId')";
        $this->conn->exec($sql);
        $last_id = $this->conn->lastInsertId();

        return $last_id;
    
    }
    catch(PDOException $e)
        {
        echo $sql . "<br>" . $e->getMessage();
        }
    }
}
?>