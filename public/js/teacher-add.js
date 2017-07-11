
define(['jquery','template','util','datepicker','language','validate','form'],function($,template,util){
    util.setMenu('/teacher/list')
    var tcId = util.getId('tc_id',location.search);
    if(tcId){
        //如果有tcId说明是编辑操作
        $.ajax({
            url:'/api/teacher/edit',
            type:'get',
            data:{
                tc_id:tcId,
            },
            dataType:'json',
            success:function(data){
                data.result.tc_operate = '编辑老师'
                var html = template('teacherTpl',data.result);
                $('#teacherMsg').html(html);
                SubmitForm('/api/teacher/update')

            }
        })
    }else{
        //否则是添加操作
        var html = template('teacherTpl',{tc_operate : '添加老师'});
        $('#teacherMsg').html(html);
        SubmitForm('/api/teacher/add')
    }

    //点击添加按钮
    //$("#addBtn").click(function(){
    //})
    function SubmitForm(url){
        $('#teacherInfo').validate({
            sendForm:false,
            valid:function(){
                $('#teacherInfo').ajaxSubmit({
                    type:'post',
                    url:url,
                    dataType:'json',
                    success:function(data){
                        if(data.code==200){
                            location.href = '/teacher/list'
                        }
                    }
                })
            },
            description:{
                tc_name:{
                    required:'用户名不能为空'
                },
                tc_pass:{
                    required:'密码不能为空老铁',
                    pattern:'密码只能是6位数朋友'
                },
                tc_join_date:{
                    required:'帮忙选下日期啊'
                }


            }
        })
    }

})
