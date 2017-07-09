<?php
    $path = 'index';
    $filename = 'index';
    if(array_key_exists('PATH_INFO',$_SERVER)){
    //获取url中的路径
    $url = $_SERVER['PATH_INFO'];
    //这里去掉路径中的第一个字符（/）
    $str = substr($url,1);
    $arr = explode('/',$str);
        if(count($arr)==2){
        $path = $arr[0];
        $filename = $arr[1];

        }else{
            $filename = 'login';
        }


    }else{

    $filename = 'login';
    }

    include('./views/'.$path.'/'.$filename.'.html');
?>