/*
    author -> Print
    QQ -> 2662256509
 */

//模块化代码,避免污染全局变量
(function(){

    //headNav部分
    (function(){
        //二级菜单的显示隐藏
        var $header = $(".header-nav"),
            $triangle = $header.find("nav .section_right div .triangle"),
            $parent = $triangle.parent();
            $menu = $header.find("nav .section_right div .menu"),
            $length = $triangle.length;

        for(var i = 0; i < $length; i++){
            (function(i){
                $parent.eq(i).hover(function(){
                    $menu.eq(i).removeClass("hide");
                    $triangle.eq(i).addClass("hover");
                },function(){
                    $menu.eq(i).addClass("hide");
                    $triangle.eq(i).removeClass("hover");
                });
            })(i);
        }

        //<手机版> 部分的移入移出
        var $Phone = $header.find("nav .section_right .sjb"),
            $Contain = $Phone.find(".contain");

        $Phone.hover(function(){
            $Contain.addClass("show");
        },function(){
            $Contain.removeClass("show");
        });



    })();

})();