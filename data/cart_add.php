<?php
/**
接收客户端提交的uname和pid，实现购物车条目的增加操作，返回{"msg":"succ", "count":4} 或 {"msg":"err", "reason":"...."}
**/
header('Content-Type: application/json;charset=UTF-8');

//读取客户端提交的uname和pid
@$uname = $_REQUEST['uname'] or die('{"msg":"err", "reason":"uname required"}');
@$pid = $_REQUEST['pid'] or die('{"msg":"err", "reason":"pid required"}');

@$count = $_REQUEST['count'] or die('{"msg":"err", "reason":"count required"}');

require('0_init.php');

//SQL1：根据用户名查找用户编号
$sql = "SELECT uid FROM shasha_user WHERE uname='$uname'";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_row($result);
if($row){		//能够根据用户名查询到编号
	$uid = $row[0];
}else {			//无法查询到用户编号
	die('{"msg":"err", "reason":"uname non-exists"}');
}

//SQL2：根据用户编号查找购物车编号
$sql = "SELECT cid FROM shasha_cart WHERE userId='$uid'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_row($result);
if($row){			//查询到当前用户的购物车编号
	$cid = $row[0];
}else {		//当前用户没有购物车
	//SQL3：若用户编号没有对应的购物车编号，则执行添加语句生成购物车，得到购物车编号
	$sql = "INSERT INTO shasha_cart VALUES(NULL,'$uid')";
	mysqli_query($conn, $sql);
	$cid = mysqli_insert_id($conn);
}

//SQL4：根据购物车编号和产品编号，到详情表查询是否有该记录
$sql = "SELECT did,count FROM shasha_cart_detail WHERE cartId='$cid' AND productId='$pid'";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_row($result);
if(!$row){  //当前购物车中尚未购买该商品
	//SQL5：若详情表中没有该商品记录，则执行插入，购物数量为1
//	$count = 1;
	$sql = "INSERT INTO shasha_cart_detail VALUES(NULL, '$cid','$pid','$count')";
	mysqli_query($conn, $sql);
}else {  //当前购物车中已购买过该购买该商品
	//SQL6：若详情表中已有该商品记录，则执行更新，购买数量+1
	$did = $row[0];			//详情编号
	$count1 = $row[1];		//已购买的数量
	$count1+=$count;
	$sql = "UPDATE shasha_cart_detail SET count='$count1' WHERE did='$did'";
	mysqli_query($conn, $sql);
}
//$sql = "INSERT INTO shasha_cart_detail VALUES(NULL, '$cid','$pid','$count')";
//mysqli_query($conn, $sql);

echo '{"msg":"succ", "count":'.$count.'}';

