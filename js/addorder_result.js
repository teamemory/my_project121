/*功能1:添加头和尾部*/
$(function(){
    $("div#header").load('../data/header.php',function(){
        var uname = sessionStorage['LoginName'];
        if(uname){
            $('#header #top p').html('欢迎回来：'+uname);
        }
    });
    $("div#footer").load('../data/footer.php');
});
/**功能点3：显示出上一页面保存的订单编号**/
$('#orderId').html( sessionStorage['OrderId'] );
/*功能4:搜索*/
$('#header').on('click', '.search button',function () {

    var kw=$(this).prev().val();
    sessionStorage.setItem('kw',kw);
    location.href='search.html';
});
