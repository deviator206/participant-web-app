<?php 
include_once 'dbProps.php';
include_once 'MediaAccount.php';

$data = json_decode(file_get_contents('php://input'), true);
$database = new Database();
$db = $database->getConnection();
if (!empty($data["participantId"]) && !empty($data["mediaId"]) && !empty($data["accountId"])){
	// initialize object\
	$product = new MediaAccount($db,$data["mediaId"],$data["accountId"],$data["participantId"]);
	$lastId = $product->insertIntoDB();
	echo json_encode(
        array("id" => $lastId)
    );
} else {

	 echo json_encode(
        array("error" => "Some information missing.")
    );

}

?>