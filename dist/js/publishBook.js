var showText = (function() {
	let $el,$search,$btn,$showBox,timer;
	return {
		init($ele) {
			$el = $($ele);
			$search = $el.children(".search");
			$showBox = $el.children(".showBox");
			$btn = $el.children(".btn-seach");
			this.event()
		},
		event() {
			let _this = this;
			$search.on("focus",function(){				
				_this.show();
			})
			$search.on("click",function(e){				
				e = e || event;
				let target = e.target || e.srcElement;
				e.stopPropagation();
			})
			$search.on("input",function(){
				clearTimeout(timer);
				timer = setTimeout(_ => {
					_this.getData(this.value);
				}, 500)
			})
			window.onclick = function(){
				_this.hidden();
			}
			$showBox.on("click",function(e){
				e = e || event;
				let target = e.target || e.srcElement;
				if(target.nodeName == "LI") {
					$search.val(target.innerHTML);
					_this.hidden();
				}
			})
		},
		show() {
			$showBox.css("display","block");
		},
		hidden(){
			$showBox.css("display","none");
		},
		getData(val) {
			const url = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su'
			const data = {
				wd: val,
				cb: 'showText.insertData'
			}
			sendJsonp(url, data);
		},
		insertData(data) {
			$showBox.html('');
			data.s.forEach(x => {
				const $li = document.createElement('li');
				$li.innerHTML = x;
				$showBox.append($li);
			})
		}
	}
}())

//手风琴移动
var shufflingIneu = (function() {
	let $el
	return {
		init($ele) {
			$el = $($ele);
			this.event()
		},
		event() {
			var _this = this;
			$el.on("mouseenter", "li", function() {
				
				_this.hidden();
				$(this).children("p").addClass("hidden");
				$(this).children("div").addClass("show");
				console.log($(this).children("div"))
			})
		},
		hidden() {
			var $liAll = $el.children("li");
			for(let i = 0; i < $liAll.length; i++) {
				$liAll[i].children[0].className = "";
				$liAll[i].children[1].className = "hidden";
				
			}
		}
	}

}())
var changxiaobang = (function() {
	let $el
	return {
		init($ele) {
			$el = $($ele);
			this.event()
		},
		event() {
			var _this = this;
			$el.on("mouseenter", "li", function() {
				
				_this.hidden();
				$(this).children("p").addClass("hidden");
				$(this).children("div").addClass("show");
			
			})
		},
		hidden() {
			var $liAll = $el.children("li");
			for(let i = 0; i < $liAll.length; i++) {
				$liAll[i].children[0].className = "";
				$liAll[i].children[1].className = "hidden";
				
			}
		}
	}

}())
var fenleiyuedu = (function() {
	let $el
	return {
		init($ele) {
			$el = $($ele);
			this.event()
		},
		event() {
			var _this = this;
			$el.on("mouseenter", "li", function() {
				
				_this.hidden();
				$(this).children("p").addClass("hidden");
				$(this).children("div").addClass("show");
				console.log($(this).children("div"))
			})
		},
		hidden() {
			var $liAll = $el.children("li");
			for(let i = 0; i < $liAll.length; i++) {
				$liAll[i].children[0].className = "";
				$liAll[i].children[1].className = "hidden";
				
			}
		}
	}

}())

//侧边导航栏
var toTop = (function() {
	let $tot;
	return {

		init() {
			$tot = document.querySelector(".to-top");
			this.event()
		},
		event() {
			var _this = this;
			window.onscroll = function(e) {
				e = e || event;
				var doc = document.documentElement;
				var scroll = parseInt(doc.scrollTop);
				var $herdFix = document.querySelector("#hiddenNav");
				if(scroll > 50) {
					$tot.style.visibility = "initial";
				} else {
					$tot.style.visibility = "hidden";
				}
				if(scroll > 177) {
					$herdFix.style.display = "block";
				} else {
					$herdFix.style.display = "none";
				}
			}
			$tot.onclick = function() {
				var doc = document.documentElement;
				var scroll = parseInt(doc.scrollTop);
				var timer = setInterval(function() {
					console.log(scroll)
					scroll -= 50
					doc.scrollTop = scroll;
					if(scroll < 0) {
						clearInterval(timer);
					}
				}, 10);
			}
		}
	}

}())

//合作伙伴swiper
var partner=(function(){
	let $el,
	$ulDad,
	$liAll,
	$boxAll,
	$boxDad;
	return {
		init($ele){
			$el=$($ele);
			$ulDad=$el.children()[0];
			$boxDad=$($el).children()[1];
			$liAll=$($ulDad).children().children();
			$boxAll=$($boxDad).children();
			this.event();
			this.getIndex();
			this.getLiIndex();
		},
		event(){
			var self=this;
			$($el).on('mouseenter','li',function(){
				$($boxAll[0]).addClass('hidden');
				$($boxAll[this.index]).addClass('show').siblings().removeClass("show")
				$($liAll[this.index]).addClass('cart').siblings().removeClass("cart")
				console.log($($boxAll[this.index]).siblings())
			})

		},
		getIndex(num=0){
			$boxAll.each(function(i){
				$boxAll[i].index=num;
				num++;
			
			})
		},
		getLiIndex(number=0){
			$liAll.each(function(i){
				$liAll[i].index=number;
				number++;
		
			})
		}
	}
}())

//点击其他出现隐藏文字
var hiddenOther=(function(){
	let $el,
	$otherLi,
	$liAll,
	$search;
	return {
		init($ele){
			$el=$($ele);
			$otherLi=$el.children('.hv-ul').children('.other');
			$liAll=$el.children('.hv-ul').children('.otherLi');
			$search=$el	.children('.hv-search')
			console.log($search)
			this.event();
		},
		event(){
			var self=this;
			$el.on('mouseenter','.other',function(){
				
				self.getShow()
			});
			$el.on('mouseleave',$otherLi,function(){
				self.getHidden()
			})
		},
		getShow(){
			$liAll.each(function(i){
				$($liAll[i]).removeClass('hidden').addClass('show')
			});
			$otherLi.removeClass('show').addClass('hidden');
			$search.addClass('hidden').removeClass('show');
			
		},
		getHidden(){
			$liAll.each(function(i){
				$($liAll[i]).removeClass('show').addClass('hidden')
			});
			$otherLi.removeClass('hidden').addClass('show');
			$search.addClass('show').removeClass('hidden')
			
		},
	}
}())