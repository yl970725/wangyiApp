var glass=(function(){
    let $ele,$filter,$smallImg;
    return {
        init(ele){
            $ele=$(ele);
            $smallImg=$ele.children()[0];
            this.event();
        },
        event(){
            const self=this;
            $ele.on('mouseenter',function(){
                self.createbox()
                   $filter.css("display","block")
                  $ele.on('mousemove',function(e){
                     e=e||window.event;
                   //console.log($filter.width())
                    let x=e.pageX-$filter.width() / 2-this.offsetLeft;
                    let  y = e.pageY - $filter.height() / 2 - this.offsetTop;
                    let maxX = $ele.width() - $filter.width(),
                    maxY = $(this).height() - $filter.height();
                    if(x<0){
                        x = 0;
                    } else if (x > maxX) {
                      x = maxX;
                    }
                    if (y < 0) {
                        y = 0
                      } else if (y > maxY) {
                        y = maxY;
                      }
                      $filter.css("left",x);
                      $filter.css("top",y);
                      $bigImg.css("left",-3*x);
                      $bigImg.css("top",-3*y)           
                  })
            })
            $ele.on("mouseleave",function(){
                self.clearbox();
            })
        },
        createbox(){
            //创建遮罩
            $filter=$('<span></span>')
            $filter.css({"position":"absolute",
            "left": "0px",
            "top": "0",
            "width":"50px",
            "height":"50px",
            "background": "rgba(0, 0, 0, 0.3)",
            "cursor": "move",
           
        })
            $ele.append($filter);

            //创建装大图片的盒子
            $showImg=$('<div></div>');
            $bigImg=$('<img>');
            $showImg.css({"position":"absolute",
            "left":"115px",
            "top":"0px",
            "width":"150px",
            "height":"150px",
            "overflow": "hidden"
    });
            $bigImg.css({
                "width":"342px",
                "position":"absolute",
                "left": "0",
                "top": "0"
            })
            $ele.append($showImg);
            $showImg.append($bigImg);
            const i=$smallImg.getAttribute("src");
          
            $bigImg.attr("src",i)

        },
        clearbox(){
            $filter.remove();
            $showImg.remove();
        }
    }
}())