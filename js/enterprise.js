/**
 * 媒体报道：选项卡
 */
var $tab = $('.tab', '#tab-box');
var $tabCon = $('.media-list', '#media-tab-con');

$tab.click(function() {
	var index = $(this).index();
	$tab.removeClass('tab_active');
	$(this).addClass('tab_active');
	$tabCon.removeClass('media-list_active');
	$tabCon.eq(index).addClass('media-list_active');
});
/**
 * 课程体系
 */
var $curriculum_slider = $('.curriculum-section');
var liWidth = $curriculum_slider.width();
var $Lis = $('.curriculum-section-item');
var cur = 0;

$curriculum_slider.timer = setInterval(curplay,4000);

function curplay(){
  $Lis.eq(cur).animate({
  	'left': -liWidth
  }, 500);
  cur = ++cur > $Lis.length - 1 ? 0 : cur;
  $Lis.eq(cur).css('left', liWidth);
  $Lis.eq(cur).animate({
  	'left': 0
  }, 500);
}
/**
 * 媒体报道：轮播图
 */
var $slider = $('.media-section-swiper');
var imgWidth = $slider.width(); //图片宽度
var $liArr = $('li', '.swiper-list'); //图片所在的li的集合
var num = 0; //记录当前li的索引

//自动播放
$slider.timer = setInterval(autoplay, 3000);


//下一张的方法封装
function autoplay() {
	$liArr.eq(num).animate({
		'left': -imgWidth
	}, 500);
	num = ++num > $liArr.length - 1 ? 0 : num;
	$liArr.eq(num).css('left', imgWidth);
	$liArr.eq(num).animate({
		'left': 0
	}, 500);

}

/**
 * 荣誉资质
 */
var $next = $('.next', '#btn-arrow');
var $prev = $('.prev', '#btn-arrow');
var $aLis = $('.honor-section-item', '.honor-section-list');
var honor = 0;

$next.on('click', function() {
	if (++honor >= $aLis.length - 1) {
		$next.addClass('disabled');
	}
	$aLis.eq(honor).toggleClass('Hsl_active');
	$prev.removeClass('disabled');


});
$prev.on('click', function() {
	$aLis.eq(honor).toggleClass('Hsl_active');
	if (--honor <= 0) {
		$prev.addClass('disabled');
	}
	$next.removeClass('disabled');


});
/**
 * 校区
 */
var map = new BMap.Map("baiduMap"); // 创建地图实例  
var point = new BMap.Point(116.404, 39.915); // 创建点坐标  
map.centerAndZoom(point, 15); // 初始化地图，设置中心点坐标和地图级别  
map.enableScrollWheelZoom(true);
