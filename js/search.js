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

/*功能2:点击自己页面的搜索框*/
$('#header').on('click','.search_kw', function () {
    var kw=$(this).prev().val();
    console.log(kw);
    $.ajax({
        type: 'GET',
        url: "../data/search.php",
        data:{'kw': kw},
        success: function (list) {
            console.log(list);
            html='';
            $.each(list, function (i, p) {
                html += `
                <div class="row1_pic1">
                    <!-- ͼƬ-->
                <a href="shop_detail.html" target="_blank">
                <img  class="donghua3" src="../${p.pic}" alt="${p.pid}"/>
                </a>
                    <!-- �۸�-->
                <p>
                <span>¥${p.price}</span>
                <b>¥230</b>
                <i>4.6折</i>
                </p>
                    <!-- ����-->
                <div class="introduce">
                <b>SNP</b>
                <p>${p.pname}</p>
                </div>
                    <!-- ����-->
                <div class="number">10Ƭ</div>
                    <!-- ��ϸ����-->
                <div class="introduce_detail">
                SNP 水钻美白保湿面膜 集中供给皮肤供给皮肤水分锁水亮白能力
                </div>
                    <!-- ����-->
                <div class="sold">
                已售38件
                </div>

                </div>
                `;
            });
            $(".row1").html(html);

        }
    });


});
/*功能3：其他页面过来搜索*/
var kw=sessionStorage['kw'];
$.ajax({
    type: 'GET',
    url: "../data/search.php",
    data:{'kw': kw},
    success: function (list) {
        console.log(list);
        html='';
        $.each(list, function (i, p) {
            html += `
                <div class="row1_pic1">
                    <!-- ͼƬ-->
                <a href="shop_detail.html" target="_blank">
                <img  class="donghua3" src="../${p.pic}" alt="${p.pid}"/>
                </a>
                    <!-- �۸�-->
                <p>
                <span>¥${p.price}</span>
                <b>¥230</b>
                <i>4.6折</i>
                </p>
                    <!-- ����-->
                <div class="introduce">
                <b>SNP</b>
                <p>${p.pname}</p>
                </div>
                    <!-- ����-->
                <div class="number">10Ƭ</div>
                    <!-- ��ϸ����-->
                <div class="introduce_detail">
                SNP 水钻美白保湿面膜 集中供给皮肤供给皮肤水分锁水亮白能力
                </div>
                    <!-- ����-->
                <div class="sold">
                已售38件
                </div>

                </div>
                `;
        });
        $(".row1").html(html);

    }
});

/*功能4：动画*/
$(".row1").on("mouseenter",'.donghua3',function(e){
    console.log('HEIH');
    var This=$(this);
    This.addClass('animated pulse');
});
$(".row1").on("mouseout",'.donghua3',function(e){
    var This=$(this);
    This.removeClass('animated pulse');
});
