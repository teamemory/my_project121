/*功能1：若登陆，则显示账号*/
var uname = sessionStorage['LoginName'];
if(uname){
    $('#top p').html('欢迎回来：'+uname);
}
/*功能2：动态显示商品*/

var pid=sessionStorage['bianhao'];
$.ajax({
    url:"../data/cart_detail_select.php",
    data:{'uname':uname},
    success:function(list){

		var k=list.length;
		var totalprice=0;
		for(var i=0;i<list.length;i++){
			var m=list[i].price*list[i].count;
			totalprice+=parseInt(m);
		}
		$('.t_price').html('¥'+totalprice);
		$('.msk').html(k);
        html='';
        $.each(list,function(i,p){
            html+=`
				<tr id="r2">
                    <td>
						<img class="donghua3" src="../${p.pic}" alt="">
					</td>
					<td class="d2">
						<a href="#">SNP ${p.pname}</a><br>10片
					</td>
					<td>¥${p.price}</td>
					<td>
						<button class="reduce_count">-</button>
					    <span>${p.count}</span>
					    <button class="add_count">+</button>
				    </td>
					<td>
						<b class="total_price">¥${p.count*p.price}</b>
					</td>
					<td>
						<a href="${p.did}" class="d1">删除</a>
					</td>
					</tr>
        `;
        });
        $('.gouwujiesuan').html(html);
    }
});


/*功能3：计算产品数量及总价格*/
/*减*/
$('.gouwujiesuan').on('click','.reduce_count', function () {
	var m=parseInt($(this).next().html());
	m--;
	if(m<=1){
		m=1;
	}
	$(this).next().html(m);
	var dp=parseInt($(this).parent().prev().html().slice(1));

	$(this).parent().next().children('.total_price').html("¥"+m*dp+'');
	var did=$(this).parent().parent().find('.d1').attr('href');

	var sum=parseInt($('.t_price').html().slice(1))-dp;
	console.log(sum);

	$('.t_price').html('¥'+sum);
	$.ajax({
		type:'POST',
		url:'../data/cart_detail_update.php',
		data:{'did':did,'count':m},
		success:function(){

		}
	});

});
/*加*/
$('.gouwujiesuan').on('click','.add_count', function () {
	var n=parseInt($(this).prev().html());
	n++;
	$(this).prev().html(n);
	var dp=parseInt($(this).parent().prev().html().slice(1));
	$(this).parent().next().children('.total_price').html("¥"+n*dp+'');
	var did=$(this).parent().parent().find('.d1').attr('href');
	var sum=parseInt($('.t_price').html().slice(1))+dp;
	console.log(sum);
	$('.t_price').html('¥'+sum);
	$.ajax({
		type:'POST',
		url:'../data/cart_detail_update.php',
		data:{'did':did,'count':n},
		success:function(){

		}
	})
});
/*
* 功能4：删除购物车功能*/
$('.gouwujiesuan').on('click','.d1',function(e){
	alert('确定要删除此条购物车记录吗？');
	e.preventDefault();
	$(this).parent().parent().remove();
	var did=$(this).attr('href');
	$.ajax({
		type:'POST',
		url:'../data/cart_detail_delete.php',
		data:{'did':did},
		success:function(){

		}
	})
});
/*动画*/
$(".gouwujiesuan").on("mouseenter",'.donghua3',function(e){
	var This=$(this);
	This.addClass('animated pulse');
});
$(".gouwujiesuan").on("mouseout",'.donghua3',function(e){
	var This=$(this);
	This.removeClass('animated pulse');
});
/**功能点5： 点击“去结算”跳转到结算页面**/
$('#bt-gotobuy').click(function(){
	location.href = 'addorder.html';
});

/*功能6：总价计算*/
