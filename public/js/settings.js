/**
 * Created by 13820 on 2017/7/12.
 */
define(['jquery','template','util','editor','datepicker','language','form','validate','uploadify','region'],function($,template,util,CKEDITOR){
    util.setMenu('/index/index')
    $.ajax({
        url:'/api/teacher/profile',
        type:'get',
        dataType:'json',
        success:function(data){
            if(data.code==200){
                var html = template('settingsTpl',data.result);
                $('#Person').html(html)
                $('#upfile').uploadify({
                    width:120,
                    height:120,
                    buttonText:'',
                    swf:'/public/assets/jquery-uploadify/uploadify.swf',
                    fileObjName:'tc_avatar',
                    uploader:'/api/uploader/avatar',
                    onUploadSuccess:function(a,b,c){
                        $('#img').attr('src', b.result.path)
                    }

                })
                $('#region').region({
                    url:'/public/assets/jquery-region/region.json'
                })
                //处理富文本
                CKEDITOR.replace('editor',{
                    toolbarGroups : [
                        { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
                        { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
                        { name: 'others', groups: [ 'others' ] },
                        { name: 'about', groups: [ 'about' ] }
                    ]
                })
                $('#settingsForm').validate({
                    //处理籍贯信息
                    sendForm:false,
                    valid:function(){
                        //处理富文本
                        for(var instance in CKEDITOR.instances){
                            CKEDITOR.instances[instance].updateElement();
                        }

                        var p = $('#p option:selected').text()
                        var c = $('#c option:selected').text()
                        var d = $('#d option:selected').text()
                        var JG = p + '|' + c + '|' + d;
                        //表单处理提交
                        $(this).ajaxSubmit({
                            type:'post',
                            url:'/api/teacher/modify',
                            dataType:'json',
                            data:{tc_hometown:JG},
                            success:function(data){
                                location.reload();
                            },
                        })
                    }
                })
            }
        }
    })



})