<?php
include("./dbconnect.php");
?>

<?php
    $id = $_POST['id'];
    $sql = "DELETE FROM `booklist` WHERE `id`='$id'";
    if ($conn->query($sql) === TRUE) {
        echo "Record deleted successfully";
    } else {
        echo "Error deleting record: " . $conn->error;
    }
?>