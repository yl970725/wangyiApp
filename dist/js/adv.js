//倒计时广告
var dtime=(function(){
	let  $el,
		$btn,
		$time,
		nowTime=Date.now();
	return{
		
		init($ele){
			$el=$($ele);
			$btn=$el.children('.closed');
			$time=$el.children('p').children('i')
			console.log($time)
			this.event();
			this.autoPlay(4);
		},
		event(){
			$el.on('click','.closed',function(){
				$el.addClass('hidden')
			})
		},
		//倒计时
		autoPlay(num){
			let a=num;
			setInterval( x =>{
				let s=parseInt((nowTime+a*1000-Date.now())/1000);
				$time.text(s);
				if(s==-1){
					$el.addClass('hidden')
				}
			},1000)
		}
	}
}())
