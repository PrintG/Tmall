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
			var BannerTimer = setInterval(autoPlay, 3000);	//自动轮播定时器
			//移入暂停轮播,移出播放轮播
			$Banner.hover(function(){
				clearInterval(BannerTimer);
			},function(){
				BannerTimer = setInterval(autoPlay, 3000);
			});
            //自动播放轮播
            function autoPlay(){
                change(function(){
                    $index ++;
                    $index %= 6;
                });
            }
        })();

        //商品列表部分
        (function(){
            var $wrap = $main.find(".Banner .content .wrap"),
                $showListLi = $wrap.find(".showList li"),
                $secondaryMenuLi = $wrap.find(".secondaryMenu li");

            $showListLi.hover(function(){
                var This = $(this);
                This.addClass("active");
                $secondaryMenuLi.eq(This.index()).addClass("show");
            },function(){
                var This = $(this);
                This.removeClass("active");
                $secondaryMenuLi.eq(This.index()).removeClass("show");
            });

            $secondaryMenuLi.hover(function(){
                var This = $(this);
                This.addClass("show");
                $showListLi.eq(This.index()).addClass("active");
            },function(){
                var This = $(this);
                This.removeClass("show");
                $showListLi.eq(This.index()).removeClass("active");
            });

        })();

    })();

	//wrap 部分
	(function(){
		var $wrap = $(".wrap");

		//右侧边栏部分
		(function(){
			var $container = $wrap.find(".slidebar .container"),
				$items = $container.find(".items"),
				$submenu = $items.find(".submenu"),
				$length = $items.length-2;	//排除最后两个Items(需要单独注册事件)
			
			function Hover($items, $submenu){
				this.$item = $items;
				this.$submenu = $submenu;
			}
			//启动程序
			Hover.prototype.exe = function(){
				this.hover();
			};
			//注册一个公用的功能函数
			Hover.prototype.hover = function(){
				var This = this;
				//为Item注册事件
				this.$item.hover(function(){
					//移入
					This.$submenu.stop().show().delay(100).queue(function(){
						This.$submenu.stop();
						This.$submenu.addClass("show");
					});
				},function(){
					//移出
					This.$submenu.stop().removeClass("show").delay(500).queue(function(){
						This.$submenu.stop();
						This.$submenu.hide();
					});
				});
			};
			
			for(var i = 0; i < $length; i ++){
				var items = new Hover($items.eq(i),$submenu.eq(i));
				items.exe();
			}


			
		})();
	})();

})();