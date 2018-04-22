<?php 
include_once 'dbProps.php';
include_once 'ParticipantInfo.php';

$data = json_decode(file_get_contents('php://input'), true);

$database = new Database();
$db = $database->getConnection();

// initialize object
$product = new ParticipantInfo($db,'1234');
$nameInput = $data["name"];
if (!empty($nameInput)){
	$product->setName($nameInput);	
}

if (!empty($data["phoneNumber"])){
	$product->setPhoneNumber($data["phoneNumber"]);	
}


if (!empty($data["email"])){
	$product->setEmail($data["email"]);	
}

if (!empty($data["accountId"])){
	$product->setAccountId($data["accountId"]);	
}


$lastId = $product->insertIntoDB();
echo json_encode(
        array("id" => $lastId)
    );
?>