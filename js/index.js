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

    //主体部分
    (function(){

        var $main = $(".main");

        //轮播部分
        (function(){
            var $Banner = $main.find(".Banner .content .banner"),
                $pic = $Banner.find("ul li"),
                $tab = $Banner.find(".tabList i"),
                $index = 0; //当前显示的轮播的索引

            var timer =  null;

            //tab移入的时候切换
            $tab.hover(function(){
                clearTimeout(timer);
                //利用闭包储存this
                (function(t){
                    var t = $(t);
                    timer = setTimeout(function(){
                        change(function(){$index = t.index();});
                    },200);
                })(this);
            });

            //定义函数,用来改变轮播
            function change(fn){
                $pic.eq($index).removeClass("show");
                $tab.eq($index).removeClass("cur");
                fn();
                $pic.eq($index).addClass("show");
                $tab.eq($index).addClass("cur");
            }
            autoPlay();
            //自动播放轮播
            function autoPlay(){
                change(function(){
                    $index ++;
                    $index %= 6;
                });
            }

        })();

    })();

})();