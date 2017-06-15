/*功能1：动态添加商品图片*/
var pid=sessionStorage['bianhao'];
$.ajax({
    url:"../data/shop_choice.php",
    data:{'pid':pid},
    success:function(list){
        html='';
        html1='';
        $.each(list,function(i,p){

         html1+=`
            <p>&nbsp;&nbsp;&nbsp;&nbsp;SNP 金丝燕窝深层保湿面膜含有高浓缩燕窝原液，集中供给皮肤水分锁水能力突出，在皮肤水分子表面形成保护膜防止水分快速流失。</p>

                    <h1>SNP&nbsp;&nbsp;&nbsp;&nbsp; ${p.pname}</h1>

                    <h1>金丝燕窝深层保湿面膜 &nbsp;&nbsp;&nbsp;(10片)</h1>

                    <h2>数量：
                        <button>-</button>
                        <span class="count1">1</span>
                        <button>+</button>
                    </h2>

                    <h3>特卖价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>市场价</span> &nbsp;&nbsp;&nbsp;<b>¥${p.price}</b></h3>
                    <h4 class="lf">
                        <button class="qianggou"><a href="">立即抢购</a></button>
                    </h4>
                    <div class="lf">
                        <button class="jiesuan">去购物车结算</button>
                    </div>
                    <h5>评&nbsp;分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#">(752人评价)</a>
                    </h5>
                    <hr>
                    <h6>收&nbsp;藏&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a
                            href="#">分享到</a></h6>
         `;
        });

       $('#rush_shop').html(html1);

    }
});

/*功能2：增加数量*/
$("#rush_shop").on("click", 'h2 button',function () {
    if ($(this).text() == "+")
    {
        $(this).parent().children("span").text(parseInt($(this).parent().children("span").text()) + 1);
    }
    else
    {
        if ($(this).parent().children("span").text() == "1") {
            return;
        } else {
            $(this).parent().children("span").text(parseInt($(this).parent().children("span").text()) - 1);
        }
    }
});

/*功能4：判断跳转到点立即购物跳转到哪个页面*/
$('#rush_shop').on('click','h4 a',function(e){
    var uname = sessionStorage['LoginName'];
    var count=parseInt($('.count1').html());
    console.log(count);
    if(uname){
        e.preventDefault();
        $.ajax({
            type:'POST',
            url:'../data/cart_add.php',
            data:{'uname':uname,'pid':pid,'count':count},
            success: function () {
                alert('添加购物车成功，请继续购买');
            },
            error: function (arguments) {
                console.log(arguments);
            }
        })
    }else{
        e.preventDefault();
        $('.modal').css('display','block');
        var uname = sessionStorage['LoginName'];
        if(uname){
            $('#top p').html('欢迎回来：'+uname);
        }
    }
});
/*功能5：去购物车结算*/
$('#rush_shop').on('click','.jiesuan',function(){
    var uname = sessionStorage['LoginName'];
    if(uname){

        location.href='shoppingList.html';
    }else{
        $('.modal').css('display','block');
    }
});
/*功能6：动画*/
$(".donghua3").on("mouseenter",function(e){
    var This=$(this);
    This.addClass('animated rotateIn');
});
$(".donghua3").on("mouseout",function(e){
    var This=$(this);
    This.removeClass('animated rotateIn');
});

$(".donghua5").on("mouseenter",function(e){
    var This=$(this);
    This.addClass('animated bounceIn');
});
$(".donghua5").on("mouseout",function(e){
    var This=$(this);
    This.removeClass('animated bounceIn');
});


/*功能：7放大镜*/
$.ajax({
        url:'../data/fangdajing.php',
        data:{'fid':pid},
        async:false,
        success: function (list) {
            var html='';
            var html1='';
            $.each(list,function(i,p){
                console.log(p);
                html1+=`
                      <img src="../${p.img_mid5}" width="400" height="400" alt="" id="midimg" />
                            <div style="display:none;" id="winSelector"></div>

                `;
                html+=`
                    <ul>
                                    <li id="onlickImg"><img src="../${p.img_small5}" width="68" height="68" alt="洋妞"/></li>
                                    <li><img src="../${p.img_small2}" width="68" height="68" alt="洋妞"/></li>
                                    <li><img src="../${p.img_small3}" width="68" height="68" alt="洋妞"/></li>
                                    <li><img src="../${p.img_small4}" width="68" height="68" alt="洋妞"/></li>
                                    <li><img src="../${p.img_small1}" width="68" height="68" alt="洋妞"/></li>
                                    <li><img src="../${p.img_small4}" width="68" height="68" alt="洋妞"/></li>
                                    <li><img src="../${p.img_small2}" width="68" height="68" alt="洋妞"/></li>
                                    <li><img src="../${p.img_small4}" width="68" height="68" alt="洋妞"/></li>
                                </ul>
                `;

            });
            $('#imageMenu').html(html);
            $('#vertical').html(html1);
        }



})
//功能7：放大
$(document).ready(function(){
    // 图片上下滚动
    var count = $("#imageMenu li").length - 4; /* 显示 6 个 li标签内容 */
    var interval = $("#imageMenu li:first").width();
    var curIndex = 0;

    $('.scrollbutton').click(function(){
        if( $(this).hasClass('disabled') ) return false;

        if ($(this).hasClass('smallImgUp')) --curIndex;
        else ++curIndex;

        $('.scrollbutton').removeClass('disabled');
        if (curIndex == 0) $('.smallImgUp').addClass('disabled');
        if (curIndex == count-1) $('.smallImgDown').addClass('disabled');

        $("#imageMenu ul").stop(false, true).animate({"marginLeft" : -curIndex*interval + "px"}, 600);
    });


    var midChangeHandler = null;

    $("#imageMenu ").on("click","li img" ,function(){
        if ($(this).attr("id") != "onlickImg") {
            midChange($(this).attr("src").replace("small", "mid"));
            $("#imageMenu").find('img').removeAttr("id");
            $(this).parent().attr("id", "onlickImg");
        }
    }).on("mouseover","img", function(){

        if ($(this).attr("id") != "onlickImg") {
            window.clearTimeout(midChangeHandler);
            midChange($(this).attr("src").replace("small", "mid"));
            $(this).css({ "border": "3px solid #959595" });

        }
    })
    function midChange(src) {
        $("#midimg").attr("src", src).load(function() {
            changeViewImg();
        });
    }
    //大视窗看图
    function mouseover(e) {
        if ($("#winSelector").css("display") == "none") {
            $("#winSelector,#bigView").show();
        }
        $("#winSelector").css(fixedPosition(e));
        e.stopPropagation();
    }
    function mouseOut(e) {
        if ($("#winSelector").css("display") != "none") {
            $("#winSelector,#bigView").hide();
        }
        e.stopPropagation();
    }
    $("#midimg").mouseover(mouseover); //中图事件
    $("#midimg,#winSelector").mousemove(mouseover).mouseout(mouseOut); //选择器事件

    var $divWidth = $("#winSelector").width(); //选择器宽度
    var $divHeight = $("#winSelector").height(); //选择器高度
    var $imgWidth = $("#midimg").width(); //中图宽度
    var $imgHeight = $("#midimg").height(); //中图高度
    var $viewImgWidth = $viewImgHeight = $height = null; //IE加载后才能得到 大图宽度 大图高度 大图视窗高度

    function changeViewImg() {
        $("#bigView img").attr("src", $("#midimg").attr("src").replace("mid", "big"));
    }
    changeViewImg();
    $("#bigView").scrollLeft(0).scrollTop(0);
    function fixedPosition(e) {
        if (e == null) {
            return;
        }
        var $imgLeft = $("#midimg").offset().left; //中图左边距
        var $imgTop = $("#midimg").offset().top; //中图上边距
        X = e.pageX - $imgLeft - $divWidth / 2; //selector顶点坐标 X
        Y = e.pageY - $imgTop - $divHeight / 2; //selector顶点坐标 Y
        X = X < 0 ? 0 : X;
        Y = Y < 0 ? 0 : Y;
        X = X + $divWidth > $imgWidth ? $imgWidth - $divWidth : X;
        Y = Y + $divHeight > $imgHeight ? $imgHeight - $divHeight : Y;

        if ($viewImgWidth == null) {
            $viewImgWidth = $("#bigView img").outerWidth();
            $viewImgHeight = $("#bigView img").height();
            if ($viewImgWidth < 200 || $viewImgHeight < 200) {
                $viewImgWidth = $viewImgHeight = 800;
            }
            $height = $divHeight * $viewImgHeight / $imgHeight;
            $("#bigView").width($divWidth * $viewImgWidth / $imgWidth);
            $("#bigView").height($height+parseInt(200));
        }
        var scrollX = X * $viewImgWidth / $imgWidth;
        var scrollY = Y * $viewImgHeight / $imgHeight;
        $("#bigView img").css({ "left": scrollX * -1, "top": scrollY * -1 });
        $("#bigView").css({ "top": 356, "left": $(".preview").offset().left +$(".preview").width() + 15 });

        return { left: X, top: Y };
    }
});

/**功能点8：为“登录”按钮绑定监听函数，实现异步登录验证**/
$('#bt-login').click(function(){
    var uname = $('[name="uname"]').val();
    var upwd = $('[name="upwd"]').val();
    //异步提交给服务器进行验证
    $.ajax({
        type: 'POST',
        url: '../data/login.php',
        data: {"uname":uname, "upwd":upwd},
        success: function(txt, msg, xhr){
            if(txt==='err'){  //用户名或密码错误
                $('.modal .alert').html('用户名或密码错误！请重试！');
            }else if(txt==='ok'){   //登录成功
                $('.modal').fadeOut(300);
                $('#welcome').html('欢迎回来：'+uname);
                //loginName = uname; //把登录用户名保存到全局
                sessionStorage.setItem('LoginName', uname);
                if(uname){
                    $('#top p').html('欢迎回来：'+sessionStorage['LoginName']);
                }
            }else { //其它错误
                $('.modal .alert').html(txt);
            }
        }
    });
});

/*功能9：欢迎回来*/
var uname = sessionStorage['LoginName'];
console.log(uname);
if(uname){
    $('#top p').html('欢迎回来：'+uname);
}
/*功能10:搜索*/
$('.search button').on('click', function () {
    var kw=$(this).prev().val();
    sessionStorage.setItem('kw',kw);
    location.href='search.html';
});