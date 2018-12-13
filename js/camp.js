$(function() {

	/*
	 原理：核心：轮播的时候，出去的图片，剪切放到最后，首尾拼接
	 
	 1.ul：设置宽度
	 2.开定时器：轮播（出去一张，就减掉马上放回后面）
	 3.鼠标经过停下来，鼠标离开就启动
	 4.上下按钮点击能够切换
	 5.点击焦点能切换图片
	 */

	//1.给ul设置宽度：li个数*单个图片的宽度
	var iWidth = $("#imglist li").length * $("#imglist li:first").outerWidth();
	$("#imglist ul").width(iWidth);
	//console.log(iWidth);

	//2.开定时器：轮播（出去一张，就减掉马上放回后面）
	var now = 0; //当前的
	var timer = null;
	var moveWidth = $("#imglist li:first").outerWidth();

	clearInterval(timer);
	timer = setInterval(next, 4000);

	function next() {
		//设置临界值
		now = ++now > $("#imglist li").length - 1 ? 0 : now;
		//往左边走：负数，-moveWidth
		$("#imglist ul").animate({
			"left": -moveWidth
		}, 1000, "linear", function() {
			$("#imglist ul li:first").insertAfter($("#imglist ul li:last"));
			$("#imglist ul").css({
				"left": 0
			});
		});

		light();
	}

	//焦点跟随
	function light() {
		$("#light span").eq(now).addClass("active").siblings().removeClass("active");
	}

	//3.鼠标经过停下来，鼠标离开就启动

	$("#box").hover(function() {
		clearInterval(timer);
	}, function() {
		clearInterval(timer);
		timer = setInterval(next, 4000);
	});

	//4.上下按钮点击能够切换
	var oldtime = new Date();
	$("#prev").click(function() {
		if(new Date() - oldtime > 500) {
			oldtime = new Date(); //点击间隔时间太短则作为无效点击
			//上一张，往右走
			now = --now < 0 ? $("#imglist ul li").length - 1 : now;
			$("#imglist ul li:last").insertBefore($("#imglist li:first"));
			$("#imglist ul").css({
				"left": -moveWidth
			});
			$("#imglist ul").animate({
				"left": 0
			}, 1000, "linear");
			light();
		} else {}

	});

	$("#next").click(function() {
		if(new Date() - oldtime > 500) {
			oldtime = new Date();
			next();
		} else {

		}

	});

	//5.点击焦点，能够切换图片
	$("#light span").click(function() {
		if(new Date() - oldtime > 500) {
			oldtime = new Date();
			$(this).addClass("active").siblings().removeClass("active");

			if($(this).index() > now) {
				//往左运动  5  3  2
				var dis = $(this).index() - now; //要运动的张数
				$("#imglist ul").animate({
					"left": -moveWidth * dis
				}, 1000, "linear", function() {
					for(var i = 0; i < dis; i++) {
						$("#imglist ul").css({
							"left": 0
						});
						$("#imglist ul li:first").insertAfter($("#imglist ul li:last"));
					}
				});
				now = $(this).index();
			}

			if($(this).index() < now) {
				//往右运动
				var dis = now - $(this).index(); //要运动的张数
				$("#imglist ul").css({
					"left": -moveWidth * dis
				});
				for(var i = 0; i < dis; i++) {
					$("#imglist ul li:last").insertBefore($("#imglist ul li:first"));
					$("#imglist ul").animate({
						"left": 0
					}, 4000, "linear");
				}

				now = $(this).index();
			}
		} else {

		}
	});

	//	$("#light").delegate("span","click",function(){
	//		//创建出来的span用这种方式最好。
	//	});

});