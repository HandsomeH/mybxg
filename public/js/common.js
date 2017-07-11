define(['jquery','template','cookie'],function($,template){
	$('.navs ul').prev('a').on('click', function () {
		$(this).next().slideToggle();
	});

	//实现退出功能
	$('#logout').click(function(){
		$.ajax({
			type : 'post',
			url : '/api/logout',
			dataType : 'json',
			success : function(data){
				if(data.code == 200){
					location.href = '/login';
				}
			}
		});
	});


	//获取到登陆用户的信息
	var loginInfo = $.cookie('loginInfo') && JSON.parse($.cookie('loginInfo'));
	if(loginInfo){
		var loginTpl = '<div class="avatar img-circle">'
			+'<img src="{{tc_avatar}}">'
			+'</div>'
			+'<h4>{{tc_name}}</h4>';
		var html = template.render(loginTpl,loginInfo);
		$('#loginInfoTpl').html(html);
	}
})
