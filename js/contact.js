$(function(){
	run();
	function run(){
		//轮播图
		//自动生成焦点
		var runbox=$('.contact_run');
		var liarr=$('.contact_run .img_box ul li');
		var imgW=liarr.eq(0).width();
		var runLight=$('.contact_run .run_light');
		var num=0;
		
		//生成小圆点
		liarr.each(function(index,dom){
			var spans=$('<span>'+index+'</span>');
			runLight.append(spans);
		});
		var span=$('.run_light span');
		span.eq(0).addClass('now');
		liarr.css('left',imgW);
		liarr.eq(0).css('left',0);
		//鼠标进入按钮显示
		
		
		//自动轮播
		
		var timer=null;
		
		timer=setInterval(autoplay,2000);
		
		function autoplay(){
			liarr.eq(num).stop().animate({'left':-imgW},500);
			num=++num>liarr.length-1?0:num;
			liarr.eq(num).css('left',imgW);
			liarr.eq(num).stop().animate({'left':0},500);
			
			span.removeClass('now');
			span.eq(num).addClass('now');
		}
		
		runbox.mouseenter(function(){
			clearInterval(timer);
			$('.contact_run .prev').show();
			$('.contact_run .next').show();
		})
		runbox.mouseleave(function(){
			clearInterval(timer);
			timer=setInterval(autoplay,2000);
			$('.contact_run .prev').hide();
			$('.contact_run .next').hide();
		})
		
		//点击下一张
		
		$('.next').click(function(){
			autoplay();
		})
		
		//点击上一张
		$('.prev').click(function(){
			liarr.eq(num).stop().animate({'left':imgW},500);
			num=--num<0?liarr.length-1:num;
			liarr.eq(num).css('left',-imgW);
			liarr.eq(num).stop().animate({'left':0},500);
			
			span.removeClass('now');
			span.eq(num).addClass('now');
			
		})
		
		span.click(function(){
			var index=$(this).html();
			if(index>num){
				liarr.eq(num).stop().animate({'left':-imgW},500);
				liarr.eq(index).css('left',imgW);
				liarr.eq(index).stop().animate({'left':0},500);
				
				span.removeClass('now');
				span.eq(index).addClass('now');
				num=index;
			}
			else if(index<num){
				liarr.eq(num).stop().animate({'left':imgW},500);
				liarr.eq(index).css('left',-imgW);
				liarr.eq(index).stop().animate({'left':0},500);
				
				span.removeClass('now');
				span.eq(index).addClass('now');
				num=index;
			}
			
			
		})
	}
	//轮播图结束
	
})