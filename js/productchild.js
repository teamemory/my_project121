/*功能1:加载头*/
$(function(){
    $("div#header").load('../data/header.php',function(){
        var uname = sessionStorage['LoginName'];
        console.log(uname);
        if(uname){
            $('#header #top p').html('欢迎回来：'+uname);
        }
    });
    $("div#footer").load('../data/footer.php');
});
/*功能2*/
$("div.lf_fenglei>ul:first-child>li").on("click",function(){

    $(this).next().toggleClass("in");
    $(this).next().siblings('.fade').removeClass('in');
});

/*功能3*/
function loadProduct(pageNum) {

        $.ajax({
            type: 'GET',
            url: "../data/product_select.php",
            data:{'pageNum': pageNum},
            success: function (list) {
                console.log(list);
                var html = '';
                $.each(list.data, function (i, p) {
                    html += `
                <div class="row1_pic1">
                    <!-- ͼƬ-->
                <a href="shop_detail.html">
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

                //根据分页对象，动态的创建分页条中内容
                var html = "";
                if(list.pageNum==1){
                    html += `<li class="active">${list.pageNum}</li> `;
                    html += `<li><a href="#">${list.pageNum+1}</a></li> `;
                    html += `<li><a href="#">${list.pageNum+2}</a></li> `;
                    html += `<li><a href="#">${list.pageNum+3}</a></li> `;
                    html += `<li><a href="#">${list.pageNum+4}</a></li> `;
                }
                else if(list.pageNum==2){
                    html += `<li><a href="#">${list.pageNum-1}</a></li> `;
                    html += `<li class="active">${list.pageNum}</li> `;
                    html += `<li><a href="#">${list.pageNum+1}</a></li> `;
                    html += `<li><a href="#">${list.pageNum+2}</a></li> `;
                    html += `<li><a href="#">${list.pageNum+3}</a></li> `;
                }else{
                    html += `<li><a href="#">${list.pageNum-2}</a></li> `;
                    html += `<li><a href="#">${list.pageNum-1}</a></li> `;
                    html += `<li class="active">${list.pageNum}</li> `;
                    html += `<li><a href="#">${list.pageNum+1}</a></li> `;
                    html += `<li><a href="#">${list.pageNum+2}</a></li> `;
                }
                $('.pager').html(html);
            }
        });
}

/**功能点4：当页面加载完后，异步请求第1页商品数据**/
loadProduct(1);

/**功能点5：为分页条中的超链接添加事件监听，点击后异步请求指定页中的数据**/
$('.pager').on('click', 'a', function(e){
    e.preventDefault();
    var pageNum = $(this).html(); //要显示的页号
    loadProduct(pageNum);
});
/*功能6：实现点击某一个产品连接php将该商品的信息保存到数据库*/
$('.row1').on('click', 'a img', function(e){
    //e.preventDefault();
    var pid = $(this).attr('alt');
    //$(this).attr('href','shop_detail.html');
    console.log(pid);
    sessionStorage.setItem("bianhao",pid);
});
/*功能7：动画*/
$(".row1").on("mouseenter",'.donghua3',function(e){
    console.log('HEIH');
    var This=$(this);
    This.addClass('animated pulse');
});
$(".row1").on("mouseout",'.donghua3',function(e){
    var This=$(this);
    This.removeClass('animated pulse');
});
/*功能8:搜索*/
$('#header').on('click', '.search button',function () {

    var kw=$(this).prev().val();
    sessionStorage.setItem('kw',kw);
    location.href='search.html';
});


