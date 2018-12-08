<?php
include("./dbconnect.php");
?>

<?php
    // if(!$conn->connect_error){
    //     echo "Connected successfully.";
    // }else{
    //     echo "Connect error!";
    // }
    $list = array();
    $query = "SELECT * FROM booklist";
    $result = mysqli_query($conn,$query);
    $rowcount = mysqli_num_rows($result);    
    // echo $rowcount;

    foreach($result as $row){
        $item = array();
        $item['id'] = $row["id"];
        $item['year'] = $row["year"];
        $item['course'] = $row["course"];
        $item['book'] = $row["book"];
        $list[] = $item;
    }
    echo json_encode($list);
?>