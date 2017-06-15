<?php
/**
删除摸一个购物车记录
**/
header('Content-Type: text/plain;charset=UTF-8');

@$did = $_REQUEST['did'] or die('DID REQUIRED');
require('0_init.php');

$sql = "DELETE FROM shasha_cart_detail WHERE did='$did'";
$result = mysqli_query($conn,$sql);
if($result){
	echo 'succ';
}else {
	echo 'err';
}