<?php
/**
接收客户端提交的购物车详情记录编号(did)，以及最新的购买数量(count)，更新到数据库，返回succ或err
**/
header('Content-Type: text/plain;charset=UTF-8');

@$did = $_REQUEST['did'] or die('DID REQUIRED');
@$count = $_REQUEST['count'] or die('COUNT REQUIRED');
require('0_init.php');

$sql = "UPDATE shasha_cart_detail SET count='$count' WHERE did='$did'";
$result = mysqli_query($conn,$sql);
if($result){
	echo 'succ';
}else {
	echo 'err';
}