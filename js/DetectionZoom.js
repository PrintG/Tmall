//阻止浏览器缩放
(function(){

    addEvent(document, "keydown", function(e){
        e = e || window.e;
        var key = e.keyCode;
        if(e.ctrlKey){
            if(key===65||key===109||key===107||key===189||key===187){
                e.preventDefault && e.preventDefault();
                return false;
            }
            addEvent(document, "mousewheel", function(e){
                e.preventDefault && e.preventDefault();
                return false;
            });
        }
    });

    addEvent(document, "keyup", function(){
        document.onmousewheel = null;
    });




    function removeEve(obj, click, fn){
        obj.attachEvent?obj.detachEvent('on'+click, fn):obj.removeEventListener(click, fn, false);
    }
    function addEvent(obj, click, fn){
        //添加滚轮事件
        if(click === 'mousewheel'){
            obj.onmousewheel = Fn2;
            function Fn2(eve){
                eve = eve || window.event;
                var num = eve.wheelDelta/120 || -eve.detail/3;
                fn.call(this, eve, num);
            };
        }else{
            obj.attachEvent?obj.attachEvent('on'+click, fn):obj.addEventListener(click, fn, false);
        }
    }
})();