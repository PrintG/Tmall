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
					$brandList = $brand.find("ul"),
					$length = hot_brand_data.length;
				
				//生成li,填入第一组数据
				var $sublength = hot_brand_data[0].length;
				for(var j = $sublength-1; j >= 0; j--){
					var $li = $('<li class="brandLogo"><div class="brand-img"><img src="img/index/activity/hotBrand/Brand'+1+'/b'+(j+1)+'.png" width="100" height="50"></div><div class="brand-mask"><i class="iconfont icon-xiai1"></i><div class="content"><p>'+hot_brand_data[0][j].msg+'</p><a href='+hot_brand_data[0][j].href+' target="_blank">点击进入</a></div></div></li>');
					if(j>17)
						$li.addClass("noBorder");
					$brandList.prepend($li);
				};

				var $BrandImg = $brandList.find('li .brand-img'),
					$BrandImgPic = $BrandImg.find("img");
					$BrandContent = $brandList.find("li .brand-mask .content"),
					$BrandMsgHref = $BrandContent.find("a");

				//换一批
				var $next = $brandList.find('.next'),
					$index = 0;	//当前是第几批

				var isClick = false;	//用于延时

				$next.click(function(){
					if(!isClick){
						var $brandImg = $brandList.find(".brandLogo .brand-img"),
							$length = $brandImg.length;
						$index++;
						$index = $index%4;
						
						for(var i = 0; i < $length; i++){
							(function(i){
								setTimeout(function(){
									$brandImg.eq(i).animate({
										"width" : 0,
									},200);
									setTimeout(function(){
										$BrandImgPic.eq(i).prop("src", "img/index/activity/hotBrand/Brand"+($index+1)+"/b"+(i+1)+".png");
										$BrandMsgHref.eq(i).prop("href", hot_brand_data[$index][i].href).
										siblings("p").eq(i).html(hot_brand_data[$index][i].msg);
										$brandImg.eq(i).animate({
											"width" : 121,
										},200);
									},200);
								},(i+1)*30);
							})(i);
						}
						isClick = true;
						setTimeout(function(){
							isClick = false;
						},890);
					}
						/*
							0
							1 6
							2 7 12
							3 8 13 18
							4 9 14 19
							5 10 15 20
							11 16 21
							17 22
						*/
				});
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
			$(document).scroll(function(){
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

		//顶部搜索框
		(function(){
			var $TopSearch = $wrap.find(".topSearch"),
				$element = $TopSearch.find(".top-search-wrap .topSearch-wrap-search *");
			
			//搜索按钮点击事件
			$element.eq(1).click(function(){
				var value = $element.eq(0).val(),
					reg = /^\s{1,}$/.test(value);	//正则匹配是否不符合规则

				if(!reg&&value!==''){
					window.open("https://list.tmall.com/search_product.htm?q="+value, "_blank");
				}
			});

			//显示隐藏顶部导航
			$(document).scroll(function(){
				$(document).scrollTop()>=736?$TopSearch.css("top",0):$TopSearch.css("top",-50);
			});
		})();

		//左侧导航
		(function(){
			var Sidenav = $wrap.find(".Sidenav");
			//初始化隐藏
			Sidenav.hide();	
			$(document).scroll(function(){
				//到达指定位置后显示导航
				$(document).scrollTop()>=602?Sidenav.show(300):Sidenav.hide(300);
			});
		})();
	})();

})();