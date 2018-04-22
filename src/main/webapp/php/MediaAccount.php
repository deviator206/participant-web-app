
<?php
class MediaAccount{
 
    // database connection and table name
    private $conn;
    private $table_name = "media_tracking";
 
    // object properties
    public $id;
    // object properties
    public $mediaId;
    public $accountId;
    
    // constructor with $db as database connection
    public function __construct($db,$mediaId,$accountId,$partId){
        $this->conn = $db;
        $this->mediaId = $mediaId;
        $this->accountId = $accountId;
        $this->id = $partId;

    }

    public function insertIntoDB($inputEmail){
    try {

         $sql = "INSERT INTO media_tracking (accountId,mediaId,participantId)VALUES ('$this->accountId','$this->mediaId','$this->id')";
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