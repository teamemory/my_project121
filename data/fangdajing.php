<?php
header('Content-Type: application/json;charset=UTF-8');
@$fid = $_REQUEST['fid'] or die('{"msg":"err", "reason":"fid required"}');

require('0_init.php');

$sql="SELECT * FROM shasha_fangdajing WHERE fid='$fid'";
$result=mysqli_query($conn,$sql);
$list=mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($list);