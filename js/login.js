/*功能1：验证输入是否符合格式*/
$("#login").validate({
    rules:{
        mail:{required:true,email:true},
        upwd:{required:true,rangelength:[6,12]}
    },
    messages:{
        mail:{required:"邮箱不能为空",email:"邮箱格式不正确"},
        upwd:{required:"密码不能为空",rangelength:"密码长度在6-12位之间"}
    }
});
/**功能点2：为“登录”按钮绑定监听函数，实现异步登录验证**/
$('#denglu_btn button').click(function(){
    var uname = $('[name="mail"]').val();
    var upwd = $('[name="upwd"]').val();
    //异步提交给服务器进行验证
    $.ajax({
        type: 'POST',
        url: '../data/login.php',
        data: {"uname":uname, "upwd":upwd},
        success: function(txt, msg, xhr){
            if(txt==='err'){  //用户名或密码错误
                alert('用户名或密码错误！请重试！');
            }else if(txt==='ok'){   //登录成功
                sessionStorage.setItem('LoginName', uname);
                location.href="../shasha.html";
            }else { //其它错误
                alert(txt);
            }
        }
    });
});
