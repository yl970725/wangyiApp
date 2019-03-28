var carShop = (function () {
	let $operation, $shopList, $del
	return {
		init() {
			$operation = document.querySelector(".operation");
			$shopList = document.querySelector(".shopList");
			this.event();
		},
		event() {
		var _this = this;
		var data = localStorage.shopList;
		data = JSON.parse(data);
		data.forEach(x => {
			var shopHtml = `<div class="shopList"><a href=""><img src="${x.img}" alt=""></a>
			<div class="jianjie">
			<h3>${x.title}
				<span>${x.author}</span>
			</h3>
			<div class="description">
				${x.content}
			</div>
			</div>
			<p>数量:${x.count}本</p>
			<p class="price">${x.price}元/本</p>
			<p class="total">总价:${x.count*x.price}元</p>
			<p><button id="shop-del" data-id='${x.id}'>删除</button></p>
			</div>`;
			$operation.innerHTML += shopHtml;
		})
		$operation.onclick = function (e) {
			e = e || event;
			var target = e.target || e.which;
			if(target.getAttribute("id") == "shop-del"){
				data.forEach((x,index) => {
					if(x.id == target.getAttribute("data-id")){
						data.splice(index,1);
						localStorage.shopList = JSON.stringify(data);
						
						location.href = "shopCar.html";
					}
				})
			}
		}
	}
}
}())
var showText = (function () {
	let $el, $search, $btn, $showBox, timer;
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
			$search.on("focus", function () {
				_this.show();
			})
			$search.on("click", function (e) {
				e = e || event;
				let target = e.target || e.srcElement;
				e.stopPropagation();
			})
			$search.on("input", function () {
				clearTimeout(timer);
				timer = setTimeout(_ => {
					_this.getData(this.value);
				}, 500)
			})
			window.onclick = function () {
				_this.hidden();
			}
			$showBox.on("click", function (e) {
				e = e || event;
				let target = e.target || e.srcElement;
				if (target.nodeName == "LI") {
					$search.val(target.innerHTML);
					_this.hidden();
				}
			})
		},
		show() {
			$showBox.css("display", "block");
		},
		hidden() {
			$showBox.css("display", "none");
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

window.onscroll = function (e) {
	var $herdFix = document.querySelector(".headerFix");
	e = e || event;
	const doc = document.documentElement;
	let restScroll = parseInt(doc.scrollTop);
	if (restScroll > 177) {
		$herdFix.style.display = "block";
	} else {
		$herdFix.style.display = "none";
	}
}