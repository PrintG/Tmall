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
		
		//活动部分
		(function(){
			var $activity = $main.find(".wrap .activity"),
				$hotBrandWrap = $activity.find(".hotBrand-Wrap");
			//直播部分
			(function(){
				var $live = $hotBrandWrap.find(".live"),
					$topShow = $live.find(".top-show"),	//显示大图的元素
					$msg = $topShow.find(".content h2,.content p"),
					$slideList = $live.find(".slideWrap .slideList"),
					$btn = $live.find(".slideWrap .btn"),
					$slide = $slideList.find("li");
				
				//储存要填入的数据
				var data=[{info:"不会下厨也会做 搞定一桌晚餐No.3",time:"17 : 06 - 18 : 00",},{info:"砸金蛋，赢现金",time:"17 : 05 - 18 : 00",},{info:"翡翠手镯/挂件捡漏",time:"17 : 00 - 21 : 59",},{info:"现场直播 庆菜百电商三周年",time:"17 : 00 - 18 : 30",},{info:"增肌减脂夏令营",time:"17 : 00 - 18 : 00",},{info:"翡翠源头性价比好货",time:"17 : 00 - 20 : 00",},];
				
				//slide移入时的样式
				$slide.hover(function(){
					var This = $(this),
						index = This.index();
					This.addClass("show").siblings().removeClass("show");
					$topShow.css("background-image","url('img/index/activity/hotBrand/banner"+(index+1)+".png')");
					$msg.eq(0).html(data[index].info);
					$msg.eq(1).html("<i></i> "+data[index].time);
				});

				//切换按钮
				$btn.click(function(){
					var $this = $(this);
					$this.addClass("hide").siblings(".btn").eq(0).removeClass("hide");
					$slideList.animate({
						"left" : $this.index(".btn")?-488:0,
					},500);
				});

				//文字切换
				(function(){
					var $MessageWrap = $live.find(".tip .content .tip-Message-Wrap"),
						$length = $MessageWrap.find("p").length,
						$index = 0;	//当前显示的文字的索引

					setInterval(function(){
						$index++;
						$index %= $length;
						$MessageWrap.animate({top : -$index*38},500);
						if($index==2){
							$index = 0;
							$MessageWrap.animate({top : -$index*38},0);
						}
					},2000);
				})();
			})();

			//热门品牌
			(function(){
				var $brand = $hotBrandWrap.find(".brand"),
					$brandList = $brand.find("ul");

				var data = [
					//第一组品牌
					[
						{
							href : 'https://kireido.tmall.hk/shop/view_shop.htm?spm=875.7931836/B.2016073.1.10c849damF2Kso&user_number_id=2811185140&abtest=_AB-LR1315-PR1315&pvid=6a6d0a25-659b-4675-b465-f8c16611e8ad&pos=1&abbucket=_AB-M1315_B9&brandId=99906590&acm=09042.1003.1.1200415&scm=1007.13029.56634.100200300000000',
							msg : '优惠券 ￥30',
						},{
							href : 'https://eveny.tmall.com/shop/view_shop.htm?user_number_id=644692396&abtest=_AB-LR65-PR65&pvid=146df02e-9804-4523-9f89-2d950baf81ef&pos=2&abbucket=_AB-M65_B5&brandId=99822674&acm=03014.1003.1.765824&scm=1007.13143.56636.100200300000000',
							msg : '优惠券 ￥100',
						},{
							href : 'https://store.taobao.com/shop/view_shop.htm?spm=875.7931836/B.2016073.3.10c849damF2Kso&user_number_id=740820069&abtest=_AB-LR1315-PR1315&pvid=6a6d0a25-659b-4675-b465-f8c16611e8ad&pos=3&abbucket=_AB-M1315_B9&brandId=99735694&acm=09042.1003.1.1200415&scm=1007.13029.56634.100200300000000',
							msg : '优惠券 ￥100',
						},{
							href : 'https://store.taobao.com/shop/view_shop.htm?spm=875.7931836/B.2016073.4.10c849damF2Kso&user_number_id=2647194591&abtest=_AB-LR1315-PR1315&pvid=6a6d0a25-659b-4675-b465-f8c16611e8ad&pos=4&abbucket=_AB-M1315_B9&brandId=996908171&acm=09042.1003.1.1200415&scm=1007.13029.56634.100200300000000',
							msg : '关注人数 150',
						},{
							href : 'https://store.taobao.com/shop/view_shop.htm?spm=875.7931836/B.2016073.5.10c849damF2Kso&user_number_id=2536501149&abtest=_AB-LR1315-PR1315&pvid=6a6d0a25-659b-4675-b465-f8c16611e8ad&pos=5&abbucket=_AB-M1315_B9&brandId=995842573&acm=09042.1003.1.1200415&scm=1007.13029.56634.100200300000000',
							msg : '优惠券 ￥50',
						},{
							href : 'https://store.taobao.com/shop/view_shop.htm?spm=875.7931836/B.2016073.6.10c849damF2Kso&user_number_id=2653527491&abtest=_AB-LR1315-PR1315&pvid=6a6d0a25-659b-4675-b465-f8c16611e8ad&pos=6&abbucket=_AB-M1315_B9&brandId=995656201&acm=09042.1003.1.1200415&scm=1007.13029.56634.100200300000000',
							msg : '关注人数 196',
						},{
							href : 'https://store.taobao.com/shop/view_shop.htm?spm=875.7931836/B.2016073.7.10c849damF2Kso&user_number_id=679339632&abtest=_AB-LR1315-PR1315&pvid=6a6d0a25-659b-4675-b465-f8c16611e8ad&pos=7&abbucket=_AB-M1315_B9&brandId=99554580&acm=09042.1003.1.1200415&scm=1007.13029.56634.100200300000000',
							msg : '优惠券 ￥50',
						},{
							href : 'https://store.taobao.com/shop/view_shop.htm?spm=875.7931836/B.2016073.8.10c849damF2Kso&user_number_id=726984974&abtest=_AB-LR1315-PR1315&pvid=6a6d0a25-659b-4675-b465-f8c16611e8ad&pos=8&abbucket=_AB-M1315_B9&brandId=9947804&acm=09042.1003.1.1200415&scm=1007.13029.56634.100200300000000',
							msg : '优惠券 ￥50',
						},{
							href : 'https://store.taobao.com/shop/view_shop.htm?spm=875.7931836/B.2016073.9.10c849damF2Kso&user_number_id=1859057170&abtest=_AB-LR1315-PR1315&pvid=6a6d0a25-659b-4675-b465-f8c16611e8ad&pos=9&abbucket=_AB-M1315_B9&brandId=9944569&acm=09042.1003.1.1200415&scm=1007.13029.56634.100200300000000',
							msg : '优惠券 ￥50',
						},{
							href : 'https://store.taobao.com/shop/view_shop.htm?spm=875.7931836/B.2016073.10.10c849damF2Kso&user_number_id=1770991118&abtest=_AB-LR1315-PR1315&pvid=6a6d0a25-659b-4675-b465-f8c16611e8ad&pos=10&abbucket=_AB-M1315_B9&brandId=99402442&acm=09042.1003.1.1200415&scm=1007.13029.56634.100200300000000',
							msg : '优惠券 ￥10',
						},{
							href : 'https://store.taobao.com/shop/view_shop.htm?spm=875.7931836/B.2016073.11.10c849damF2Kso&user_number_id=1824757794&abtest=_AB-LR1315-PR1315&pvid=6a6d0a25-659b-4675-b465-f8c16611e8ad&pos=11&abbucket=_AB-M1315_B9&brandId=99390451&acm=09042.1003.1.1200415&scm=1007.13029.56634.100200300000000',
							msg : '优惠券 ￥30',
						},{
							href : 'https://store.taobao.com/shop/view_shop.htm?spm=875.7931836/B.2016073.12.10c849damF2Kso&user_number_id=743407139&abtest=_AB-LR1315-PR1315&pvid=6a6d0a25-659b-4675-b465-f8c16611e8ad&pos=12&abbucket=_AB-M1315_B9&brandId=99181556&acm=09042.1003.1.1200415&scm=1007.13029.56634.100200300000000',
							msg : '优惠券 ￥200',
						},{
							href : 'https://store.taobao.com/shop/view_shop.htm?spm=875.7931836/B.2016073.13.10c849damF2Kso&user_number_id=2743173652&abtest=_AB-LR1315-PR1315&pvid=6a6d0a25-659b-4675-b465-f8c16611e8ad&pos=13&abbucket=_AB-M1315_B9&brandId=991778521&acm=09042.1003.1.1200415&scm=1007.13029.56634.100200300000000',
							msg : '优惠券 ￥300',
						},{
							href : 'https://store.taobao.com/shop/view_shop.htm?spm=875.7931836/B.2016073.14.10c849damF2Kso&user_number_id=2188699526&abtest=_AB-LR1315-PR1315&pvid=6a6d0a25-659b-4675-b465-f8c16611e8ad&pos=14&abbucket=_AB-M1315_B9&brandId=9914474&acm=09042.1003.1.1200415&scm=1007.13029.56634.100200300000000',
							msg : '优惠券 ￥100',
						},{
							href : 'https://store.taobao.com/shop/view_shop.htm?spm=875.7931836/B.2016073.15.10c849damF2Kso&user_number_id=678621926&abtest=_AB-LR1315-PR1315&pvid=6a6d0a25-659b-4675-b465-f8c16611e8ad&pos=15&abbucket=_AB-M1315_B9&brandId=99017282&acm=09042.1003.1.1200415&scm=1007.13029.56634.100200300000000',
							msg : '优惠券 ￥3',
						},{
							href : 'https://store.taobao.com/shop/view_shop.htm?spm=875.7931836/B.2016073.16.10c849damF2Kso&user_number_id=1715864217&abtest=_AB-LR1315-PR1315&pvid=6a6d0a25-659b-4675-b465-f8c16611e8ad&pos=16&abbucket=_AB-M1315_B9&brandId=9901114&acm=09042.1003.1.1200415&scm=1007.13029.56634.100200300000000',
							msg : '优惠券 ￥100',
						},{
							href : 'https://store.taobao.com/shop/view_shop.htm?spm=875.7931836/B.2016073.17.10c849damF2Kso&user_number_id=2466315291&abtest=_AB-LR1315-PR1315&pvid=6a6d0a25-659b-4675-b465-f8c16611e8ad&pos=17&abbucket=_AB-M1315_B9&brandId=9901039&acm=09042.1003.1.1200415&scm=1007.13029.56634.100200300000000',
							msg : '优惠券 ￥50',
						},{
							href : 'https://store.taobao.com/shop/view_shop.htm?spm=875.7931836/B.2016073.18.10c849damF2Kso&user_number_id=679331178&abtest=_AB-LR1315-PR1315&pvid=6a6d0a25-659b-4675-b465-f8c16611e8ad&pos=18&abbucket=_AB-M1315_B9&brandId=98942537&acm=09042.1003.1.1200415&scm=1007.13029.56634.100200300000000',
							msg : '优惠券 ￥100',
						},{
							href : 'https://store.taobao.com/shop/view_shop.htm?spm=875.7931836/B.2016073.19.10c849damF2Kso&user_number_id=1728261286&abtest=_AB-LR1315-PR1315&pvid=6a6d0a25-659b-4675-b465-f8c16611e8ad&pos=19&abbucket=_AB-M1315_B9&brandId=98907984&acm=09042.1003.1.1200415&scm=1007.13029.56634.100200300000000',
							msg : '关注人数 9679',
						},{
							href : 'https://store.taobao.com/shop/view_shop.htm?spm=875.7931836/B.2016073.20.10c849damF2Kso&user_number_id=677121412&abtest=_AB-LR1315-PR1315&pvid=6a6d0a25-659b-4675-b465-f8c16611e8ad&pos=20&abbucket=_AB-M1315_B9&brandId=98878698&acm=09042.1003.1.1200415&scm=1007.13029.56634.100200300000000',
							msg : '优惠券 ￥100',
						},{
							href : 'https://store.taobao.com/shop/view_shop.htm?spm=875.7931836/B.2016073.21.10c849damF2Kso&user_number_id=2807713243&abtest=_AB-LR1315-PR1315&pvid=6a6d0a25-659b-4675-b465-f8c16611e8ad&pos=21&abbucket=_AB-M1315_B9&brandId=9886836&acm=09042.1003.1.1200415&scm=1007.13029.56634.100200300000000',
							msg : '关注人数 1477',
						},{
							href : 'https://store.taobao.com/shop/view_shop.htm?spm=875.7931836/B.2016073.22.10c849damF2Kso&user_number_id=696415169&abtest=_AB-LR1315-PR1315&pvid=6a6d0a25-659b-4675-b465-f8c16611e8ad&pos=22&abbucket=_AB-M1315_B9&brandId=98850972&acm=09042.1003.1.1200415&scm=1007.13029.56634.100200300000000',
							msg : '优惠券 ￥200',
						},{
							href : 'https://store.taobao.com/shop/view_shop.htm?spm=875.7931836/B.2016073.23.10c849damF2Kso&user_number_id=2878738660&abtest=_AB-LR1315-PR1315&pvid=6a6d0a25-659b-4675-b465-f8c16611e8ad&pos=23&abbucket=_AB-M1315_B9&brandId=9879840&acm=09042.1003.1.1200415&scm=1007.13029.56634.100200300000000',
							msg : '优惠券 ￥500',
						},	
					],
					//第二组品牌	
					[
						{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},
					],
					//第三组品牌	
					[
						{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},
					],
					//第四组品牌	
					[
						{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},{
							href : '',
							msg : '',
						},
					],
				];
			})();

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
				$length = $items.length;
			
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

			//shopCart单独事件
			var $shopCart = $container.find(".shopCart"),
				$i = $shopCart.find(".icon");

			$shopCart.hover(function(){
				$i.addClass("hover");
			},function(){
				$i.removeClass("hover");
			});
	
			//downloadTmall单独事件
			var $downloadTmall = $container.find(".downloadTmall");
			$downloadTmall.hover(function(){
				$(this).addClass("show");
			},function(){
				$(this).removeClass("show");
			});

			//backTop单独事件
			var $backTop = $container.find(".backTop");
			$(document).scroll(function(e){
				if($(document).scrollTop()){
					$backTop.removeClass("hide");
				}else{
					$backTop.addClass("hide");
				}
			});
			
			//点击事件
			$backTop.click(function(){
				var scrollElement = document.documentElement.scrollTop?document.documentElement:document.body;
				$(scrollElement).animate({
					scrollTop : 0,
				},300);			
			});
		})();
	})();

})();