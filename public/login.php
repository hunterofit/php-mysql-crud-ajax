
<?php
include("./dbconnect.php");

$message="";
if(!empty($_POST["login"])) {
	$result = mysqli_query($conn,"SELECT * FROM user WHERE email='" . $_POST["email"] . "' and password = '". $_POST["password"]."'");
	$row  = mysqli_fetch_array($result);
	if(is_array($row)) {
    $_SESSION["user_id"] = $row['id'];
?><script>document.location.href="./read.php";</script>
<?php
	} else {
    $message = "Invalid Username or Password!";
?><script>document.location.href="./index.php"</script>
<?php
	}
}
?>