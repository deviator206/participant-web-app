<?php
include_once 'dbProps.php';
include_once 'AppBootstrap.php';


$database = new Database();
// echo "IMPORTED this.  DB ";
$db = $database->getConnection();

// initialize object
// echo "create neuro_account";
$product = new AppBootstrap($db, $_GET["id"]);
$stmt = $product->read();
$num = $stmt->rowCount();

if($num>0){
// echo "\nROW count...";
 
 	// products array
    $products_arr=array();
 // echo "\nROW count...1";
    $products_arr["records"]=array();
    // echo "\nROW count...2";
     while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only

// echo "\nROW count...3";
        extract($row);
 // echo "\nROW count...4";
        $product_item=array(
            "id" => $id,
            "accountName" => $accountName,
            "mediaId" => $accountMediaId
        );
 
 // echo "\nROW count...5";
        array_push($products_arr["records"], $product_item);
        // echo "\nROW count...6";
    }

    // echo "\nROW count...7";
     echo json_encode($products_arr);

 } else {
 	 echo json_encode(
        array("message" => "No products found.")
    );
 
 }


$database->closeConnection();
?>