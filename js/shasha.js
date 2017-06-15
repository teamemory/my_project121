/*功能1：广告轮播*/
$("#slider").slider();
/* 功能2：弹出框*/
$("#banner>ul>li").mouseover(function(){
    $(this).next().addClass("in");
});
$("#banner>ul>li").mouseout(function(){
    $(this).next().removeClass("in");
});
/*功能3：登录则显示欢迎回来*/
var uname = sessionStorage['LoginName'];
if(uname){
    $('#top p').html('欢迎回来：'+uname);
}
/*动画1*/
$(".donghua1").on("mouseenter",function(e){
    var This=$(this);
    This.addClass('animated rotateIn');
});
$(".donghua1").on("mouseout",function(e){
    var This=$(this);
    This.removeClass('animated rotateIn');
});
/*动画2*/
$(".donghua2").on("mouseenter",function(e){
    var This=$(this);
    This.addClass('animated shake');
});
$(".donghua2").on("mouseout",function(e){
    var This=$(this);
    This.removeClass('animated shake');
});
/*动画3*/
    $(".donghua3").on("mouseenter",function(e){
    var This=$(this);
    This.addClass('animated pulse');
});
$(".donghua3").on("mouseout",function(e){
    var This=$(this);
    This.removeClass('animated pulse');
});
/*动画4*/
$(".donghua4").on("mouseenter",function(e){
    var This=$(this);
    This.addClass('animated bounce');
});
$(".donghua4").on("mouseout",function(e){
    var This=$(this);
    This.removeClass('animated bounce');
});

/*搜索*/
$('.search button').on('click', function () {
    var kw=$(this).prev().val();
    sessionStorage.setItem('kw',kw);
    location.href='html/search.html';
});
