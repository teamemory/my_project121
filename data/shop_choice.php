<?php
header('Content-Type: application/json;charset=UTF-8');
@$pid = $_REQUEST['pid'] or die('{"msg":"err", "reason":"pid required"}');

require('0_init.php');

$sql="SELECT * FROM shasha_productlist WHERE pid='$pid'";
$result=mysqli_query($conn,$sql);
$list=mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($list);