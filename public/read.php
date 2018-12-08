<?php
include("./dbconnect.php");
?>

<?php require "templates/header.php"; ?>

<a href="index.php" style="text-decoration: none; float: right; margin-right: 80px;">Back to home</a>

<?php
  
  $query = "SELECT * FROM users";
  $result = mysqli_query($conn,$query);
  $rowcount = mysqli_num_rows($result);
  $output = '
  <center style="margin-top: 50px;"><table width="70%" style="text-align: center;">
    <tr>
      <th width="5%">No</th>
      <th width="30%">First Name</th>
      <th width="30%">Last Name</th>
      <th width="5%">Age</th>
      <th width="15%">Edit</th>
      <th width="15%">Delete</th>
    </tr>
  ';
  if($rowcount > 0)
  {
    $i = 0;
    foreach($result as $row)
    {
      $output .= '
      <tr>
        <td width="5%">'.++$i.'</td>
        <td width="30%">'
          . '<span id="first_' . $row["id"] . '">' .$row["first_name"]. '</span>' .
          '<input type="text" value="' . $row["first_name"] . '" id="firstname_' . $row["id"] . '" style="display: none;"/>' .
        '</td>        
        <td width="30%">'
          . '<span id="last_' . $row["id"] . '">' .$row["last_name"]. '</span>' .
          '<input type="text" value="' . $row["last_name"] . '" id="lastname_' . $row["id"] . '" style="display: none;"/>' .
        '</td>
        <td width="5%">'
          . '<span id="age_' . $row["id"] . '">' .$row["age"]. '</span>' .
          '<input type="number" step="1" min="0" max="200" value="' . $row["age"] . '" id="age1_' . $row["id"] . '" style="display: none;"/>' .
        '</td>
        <td width="15%">
          <button type="button" name="edit" class="edit" id="edit_'.$row["id"].'" onClick="clickEdit(' . $row["id"] . ')">Edit</button>
        </td>
        <td width="15%">
          <button type="button" name="delete" class="delete" id="'.$row["id"].'" onClick="clickDelete(' . $row["id"] . ')">Delete</button>
        </td>
      </tr>
      ';
    }
  }
  else
  {
    $output .= '
    <tr>
      <td colspan="4" align="center">Data not found</td>
    </tr>
    ';
  }
  $output .= '</table></center>';
  echo $output;  
?>

<?php require "templates/footer.php"; ?>