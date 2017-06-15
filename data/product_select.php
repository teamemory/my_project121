<?php
header('Content-Type: application/json;charset=UTF-8');
//客户端输入页数
@$pageNum=$_REQUEST['pageNum'];
if(!$pageNum){
    $pageNum=1;
}else{
    $pageNum=intval($pageNum);
}
//向要客户端输出的关联数组——JSON对象
$output = [
	'recordCount'=>0,			//符合条件的总记录数
	'pageSize'=>6,				//每页最多显示的记录数
	'pageCount'=>0,				//总的页数
	'pageNum'=>$pageNum,	//当前要显示的页号
	'data'=>[]						//当前页中的记录行
];

$conn = mysqli_connect('127.0.0.1', 'root', '', 'shasha', 3306);
$sql="SET NAMES UTF8";
mysqli_query($conn,$sql);

$sql="SELECT COUNT(*) FROM shasha_productlist";
$result=mysqli_query($conn,$sql);
//总的记录行数
$output['recordCount']=mysqli_fetch_row($result)[0];
//总的页数
$output['pageCount']=ceil(($output['recordCount'])/($output['pageSize']));
//当前页面的总记录数
$start=($output['pageNum']-1)*$output['pageSize'];
$count=$output['pageSize'];

$sql="SELECT * FROM shasha_productlist LIMIT $start,$count";//从某一个开始，到某一个结束
$result=mysqli_query($conn,$sql);

$output['data'] = mysqli_fetch_all($result, MYSQLI_ASSOC);

echo json_encode($output);

