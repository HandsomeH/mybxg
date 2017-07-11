/**
 * Created by 13820 on 2017/7/9.
 */
define(['jquery','template','util','bootstrap'],function($,template,util){
    util.setMenu('/teacher/list')
    $.ajax({
        type:'get',
        url:'/api/teacher',
        dataType:'json',
        success:function(data){
            var html = template('tealist',{list:data.result})
            $('#teacherInfo').html(html);
            seeTeacherInfo();
            //注销和启用老师的方法
            Cancellationandenable();
        }
    });

    //查看老师信息的单机事件
    function seeTeacherInfo (){
        $('#teacherInfo').on('click','#see',function(){
            //console.log(111);
            var teacherID = $(this).parent().attr('data-id');
            $.ajax({
                type:'get',
                url:'/api/teacher/view',
                dataType:'json',
                data:{
                    tc_id:teacherID
                },
                success:function(data){
                    //console.log(data);
                    $('#teacherModal').modal();
                    var html = template('teacherInfoTpl',data.result)
                    $("#teacherInfoModal").html(html)

                }
            })
        })
    };
    //注销和启用讲师
    function Cancellationandenable (){
        $('#teacherInfo').on('click','.CAE',function(){
            var that = this;
            //获取到老师的id和status
            var td = $(this).parent();
            var tc_id = td.attr('data-id');
            //console.log(tc_id);
            var tc_status = td.attr('data-status');
            //console.log(tc_status);
            $.ajax({
                url:'/api/teacher/handle',
                type:'post',
                dataType:'json',
                data:{
                    tc_id:tc_id,
                    tc_status:tc_status
                },
                success:function(data){
                    if(data.code==200){
                        //将返回的状态添加到当前的标签上
                        td.attr('data-status',data.result.tc_status);
                        if(data.result.tc_status==1){
                            $(that).text('启用')
                        }else {
                            $(that).text('注销')

                        }
                    }
                }
            })
        })
    }
})