<?php
include("./dbconnect.php");
?>

<?php
    // var_dump($_POST);
    // echo $_POST['year'] . " " . $_POST['course'] . $_POST['book'];
    // $data = json_decode(stripslashes($_POST["data"]));
    // echo json_encode($data["year"]);

    $id = $_POST['id'];
    $year = $_POST['year'];
    $course = $_POST['course'];
    $book = $_POST['book'];

    // $sql = "UPDATE booklist SET year='" . $year . "', " . "course='" . $course . "', " . "book='" . $book . "', " . "WHERE id=" . $id; // wrong.
    if($id > 0){
        $sql = "UPDATE `booklist` SET `year` = '$year',`course` = '$course',`book` =   '$book' WHERE `id` = '$id'";
        if ($conn->query($sql) === TRUE) {
            echo "Record updated successfully";
        } else {
            echo "Error updating record: " . $conn->error;
        }
    }else{
        $sql = "INSERT INTO `booklist` (`year`, `course`, `book`) VALUES ('$year', '$course', '$book')";
        if ($conn->query($sql) === TRUE) {
            $last_id = $conn->insert_id;
            echo $last_id;
        } else {
            echo "Error updating record: " . $conn->error;
        }
    }
    
?>