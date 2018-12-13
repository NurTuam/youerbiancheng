$(function(){
	face();
	talk();
	
	function face(){
		//点击表情显示与隐藏
		$('.face_btn').click(function(){
			$('.face>ul').toggle();
		})
		
	}
	
	function talk(){
		var time=new Date();
		var year=time.getFullYear();
		var day=time.getDate();
		var moth=time.getMonth()+1;
		var ho=time.getHours();
		
		var min=time.getMinutes();
		if(min<10){
				min='0'+min;
		};
		//2018-10-10 9:16
		var html=''+year+'-'+moth+'-'+day+' '+ho+':'+min+'';
		
		$('#time').html(html);
		
		$(document).ready(function(){
			var timer=setInterval(function(){
				
				$('.talk_other').show();
			},2000);
			
		})
		
//		<div class="talk_us">
//						<p><span>我</span>
//						<span id="time_1"></span></p>
//						<p>好漂亮啊啊啊啊啊啊啊啊啊啊啊啊</p>
//					</div>
		$('#send').click(function(){
			var time=new Date();
			var year=time.getFullYear();
			var day=time.getDate();
			var moth=time.getMonth()+1;
			var ho=time.getHours();
			var min=time.getMinutes();
			if(min<10){
				min='0'+min;
			};
			var html=''+year+'-'+moth+'-'+day+' '+ho+':'+min+'';
			var val=$('#txt').val();
			var div=$('<div class="talk_us"><p><span>我 </span><span >'+html+'</span></p><p>'+val+'</p></div>');
//			console.log(div);
			$('.height').append(div);
			$('#txt').val('');
			var height=$('.height').outerHeight();
			$('.left_talk').scrollTop(height);
		})
		
		$('.face>ul img').on('click',function(){
			var time=new Date();
			var year=time.getFullYear();
			var day=time.getDate();
			var moth=time.getMonth()+1;
			var ho=time.getHours();
			var min=time.getMinutes();
			if(min<10){
				min='0'+min;
			};
			var html=''+year+'-'+moth+'-'+day+' '+ho+':'+min+'';
			var src=this.src;
			var div=$('<div class="talk_us"><p><span>我 </span><span >'+html+'</span></p><p><img src='+src+' /></p></div>');
			$('.height').append(div);
			var height=$('.height').outerHeight();
//			console.log(height);
			$('.left_talk').scrollTop(height);
		})
			
	
		
		
		
	}
	
})