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
/**功能点3：为支付方式的选择添加事件监听**/
$('.payment-list').on('click', 'li', function () {
    $(this).addClass('payment-item-selected').siblings('.payment-item-selected').removeClass('payment-item-selected');
    //再修改input[name=payment]值
    $(this).siblings(':hidden').val($(this).data('value'));//把li的data-value属性值赋值给隐藏域
});
/**功能点4：异步请求购物车中的内容，再次给用户呈现出来，同时计算商品总价格，修改name=price隐藏域的值**/
$.ajax({
    url: '../data/cart_detail_select.php',
    data: {uname: sessionStorage['LoginName']},
    success: function (list) {
        //console.log('成功获取到当前用户的购物车列表')
        //console.log(list);
        //修改商品列表
        var html = '';
        var sum = 0;  //购物车总金额
        $.each(list, function (i, p) {
            console.log(p);
            sum += p.price * p.count;
            html += `
        <div class="goods-item">
          <div class="p-img">
            <a target="_blank" href=""><img src="../${p.pic}" class="donghua3" alt=""></a>
          </div>
          <div class="p-name">
            <a href="" target="_blank">${p.pname}</a>
          </div>
          <div class="p-price">
            <strong class="jd-price">￥${p.price}</strong>
            <span class="p-num">x${p.count}</span>
            <span class="p-state">有货</span>
          </div>
        </div>
      `;
        });
        $('.goods-items').html(html);

        //修改计算出来的购物车总金额，修改隐藏域的值
        $('.price-num').html('￥'+sum);
        $('input[name="price"]').val(sum);
    }
});

/**功能点5：点击“提交订单”，异步提交订单信息**/
$('button.checkout-submit').click(function(){
    //获取所有的用户输入
    var str = $('#form-myorder').serialize();
    str += '&uname='+sessionStorage['LoginName'];

    //异步提交用户输入数据
    $.ajax({
        type: 'POST',
        url: '../data/order_add.php',
        data: str,
        success: function(result){
            console.log('异步请求成功');
            console.log(result);
            if(result.code==1){ //服务器端添加成功
                //把生成的订单编号保存给下一个页面使用，页面跳转
                sessionStorage['OrderId'] = result.orderId;
                location.href="addorder_result.html";
            }else { //服务器端添加失败
                alert('订单生成失败！错误消息：'+result.msg);
            }
        },
        error: function(result){
            console.log('异步请求失败');
            console.log(arguments);
        }
    });
});

/*功能6:搜索*/
$('#header').on('click', '.search button',function () {

    var kw=$(this).prev().val();
    sessionStorage.setItem('kw',kw);
    location.href='search.html';
});

/*动画3*/
$(".goods-items").on("mouseenter",'.donghua3',function(e){
    var This=$(this);
    This.addClass('animated rotateIn');
});
$(".goods-items").on("mouseout",'.donghua3',function(e){
    var This=$(this);
    This.removeClass('animated rotateIn');
});
