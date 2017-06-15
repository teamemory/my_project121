<?php
/**模糊查询**/
header('Content-Type: application/jon;charset=UTF-8');
@$kw=$_REQUEST['kw'] or die ('{"msg":"err","reason":"kw required"}');
//if(empty($kw))
//{
//    echo '[]';
//    return ;
//}
require('0_init.php');
$sql = "SELECT * FROM shasha_productlist WHERE pname LIKE '%$kw%'";
$result = mysqli_query($conn, $sql);
$output=[];
while(true){
    $row=mysqli_fetch_assoc($result);
    if(!$row){
        break;
    }
    $output[]=$row;
}
echo json_encode($output);