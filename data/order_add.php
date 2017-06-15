<?php
/***
*接收客户端提交的订单信息，生成订单，
*删除购物车中上述商品，返回{"code":1, "msg":"succ","orderId":15} 或 {"code":2, "msg":"err", "sql":"..."}
*jd_order(oid, rcvName, addr, payment(INT), price, orderTime, status, userId)
*jd_order_detail(did, orderId, productId, count)
*/
header('Content-Type: application/json;charset=UTF-8');


//接收客户端提交的订单数据
@$rcvName = $_REQUEST['rcvName'] or die('{"code":2,"msg":"rcvName required"}');
@$addr = $_REQUEST['addr'] or die('{"code":2,"msg":"addr required"}');
@$payment = $_REQUEST['payment'] or die('{"code":2,"msg":"payment required"}');
@$price = $_REQUEST['price'] or die('{"code":2,"msg":"price required"}');
$orderTime = time()*1000;
$status = 1;
@$uname= $_REQUEST['uname'] or die('{"code":2,"msg":"uname required"}');
//订单所购买的商品需要到购物车详情表中查找

require('0_init.php');

//SQL1：根据用户名查询用户编号
$sql = "SELECT uid FROM shasha_user WHERE uname='$uname'";
$result = mysqli_query($conn,$sql);
$userId = mysqli_fetch_assoc($result)['uid'];

//SQL2：向订单表中添加一条新记录，获取该订单的自增编号
$sql = "INSERT INTO shasha_order VALUES(NULL, '$rcvName', '$addr', '$payment', '$price', '$orderTime', '$status', '$userId')";
mysqli_query($conn,$sql);
$orderId = mysqli_insert_id($conn);

//SQL3：查询出当前用户购物车中的所有商品及购买数量
$sql = "SELECT productId,count FROM shasha_cart_detail WHERE cartId=(SELECT cid FROM shasha_cart WHERE userId='$userId')";
$result = mysqli_query($conn,$sql);
$productList = mysqli_fetch_all($result,MYSQLI_ASSOC);

//SQL4：循环执行：向订单详情表中插入记录
foreach($productList as $p){
    $sql = "INSERT INTO shasha_order_detail VALUES(NULL, '$orderId','$p[productId]','$p[count]')";
    mysqli_query($conn,$sql);
}

//SQL5：删除当前用户购物车中的内容
$sql = "DELETE FROM shasha_cart_detail WHERE cartId=(SELECT cid FROM shasha_cart WHERE userId='$userId')";
mysqli_query($conn,$sql);

echo '{"code":1,"msg":"succ","orderId":'.$orderId.'}';