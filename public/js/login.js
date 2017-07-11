/**
 * Created by 13820 on 2017/7/9.
 */
define(['jquery','cookie'],function($){
    // 实现登录功能
    $('#btn').click(function(){
        $.ajax({
            type : 'post',
            url : '/api/login',
            data : $('#loginForm').serialize(),
            dataType : 'json',
            success : function(data){
                if(data.code == 200){
                    // 应该把data中用户登录信息保存到cookie中即可实现页面数据共享
                    $.cookie('loginInfo',JSON.stringify(data.result),{path:'/'})
                    location.href = '/index/index';
                }
            }
        });

        return false;
    });
})