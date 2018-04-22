<?php

	// include database and object files
include_once '../dbProps.php';
include_once '../objects/BootStrap.php';

	// echo "KUCH";

	// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
// echo "$db "+$db;
 
// initialize object
$product = new AppBootstrap($db);

 
// query products
$stmt = $product->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
 // echo "KKKKKKK"+$num;
 } else {
 	// echo "hello mana";
 }
/*
 	$host = "www.neuro-insideout.com";
     $db_name = "neuro_db";
     $username = "sandeep";
     $password = "sandeep";
     $conn;
 
    // get the database connection
    function getConnection(){
 
        $conn = null;
 
        try{
            $conn = new PDO("mysql:host=" . $host . ";dbname=" . $db_name, $username, $password);
            $conn->exec("set names utf8");
        }catch(PDOException $exception){
            // echo "Connection error: " . $exception->getMessage();
        }
 
        return $conn;
    }
*/
// echo "\nHELLLLLL";
?>