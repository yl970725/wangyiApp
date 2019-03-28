var remenberMima = (function() {
	let oUser, oPswd, oRemember, data,reg,arr;
	return {
		init() {
			$oUser = document.querySelectorAll('input')[0];
			$oPswd = document.querySelectorAll('input')[1];
			$oRemember = document.querySelectorAll('input')[2];	
			this.insertCookie();
			this.event();
		},
		event() {
			const self=this;
			console.log($oUser)
			$oRemember.onchange = function() {
				if(!this.checked) {
					self.delCookie('user');
					self.delCookie('pswd');
				} else {
					self.setCookie('user',$oUser.value,7);
					self.setCookie('pswd',$oPswd.value,7);
				}
			}
		},
			insertCookie() {
				console.log(this.getCookie('pswd'))
			if(this.getCookie('user') && this.getCookie('pswd')) {
				$oUser.value = this.getCookie('user');
				$oPswd.value = this.getCookie('pswd');
				$oRemember.checked = true;
			}
		},
			delCookie(name) {
			this.setCookie(name, null, -1);
		},
			setCookie(name, value, day) {
				date = new Date();
				date.setDate(date.getDate() + day);
				document.cookie = name + '=' + value + ';expires=' + date;
		},
			getCookie(name) {
				reg = RegExp(name + '=([^;]+)');
				arr = document.cookie.match(reg);
				if(arr) {
				return arr[1];
			} else {
				return '';
			}
		}
	}
}());