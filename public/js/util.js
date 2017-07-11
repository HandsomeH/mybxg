define(['jquery'],function($){
    function getId (key,params){
        var obj = {};
        if(params){
            var p = params.substr(1);
            if(p){
                var arr = p.split('&');
                arr.forEach(function(item){
                    var kv = item.split('=');
                    obj[kv[0]] = kv[1];
                })
            }
        }
        return obj[key]
    }
    function setMenu(pathname){
        $('.aside .navs a[href="'+pathname+'"]').addClass('active')
    }
    return {
        getId:getId,
        setMenu:setMenu
    }
})
