$(function () {
  var $container = document.getElementById('jsSlider');
  var $arrowContainer = document.getElementById('jsArrow');
  var $pointStyle = 'active';
  var $time = 3000;

  carousel($container, $arrowContainer, $pointStyle, $time);

  function carousel(container, arrowContainer, pointStyle, time) {
    var ImgUl = container.children[0];
    var index = 0;
    //在最后一幅图后面添加第一幅图 形成无缝轮播
    var newLi = ImgUl.children[0].cloneNode(true);
    ImgUl.appendChild(newLi);
    var liS = ImgUl.children;
    ImgUl.style.width = liS.length * 100 + '%';

    //动态设置每个item的宽度，且尽量保持其为整数（但能不能达到这取决于业务）
    for (i = 0; i < liS.length; ++i) {
      liS[i].style.width = 1 / liS.length * 100 + '%';
      console.log(liS[i].style.width);
    }

    if (pointStyle != undefined) {
      var pointUl = container.children[1];
      //根据图片数量生成小圆点，初始化轮播圆点状态
      for (var i = 1; i < liS.length; ++i) {
        var li = document.createElement('li');
        li.innerHTML = i;
        pointUl.appendChild(li);
      }
      var points = pointUl.children;
      light();
      // 点击圆点更换图片
      for (var j = 0; j < points.length; ++j) {
        points[j].index = j;
        points[j].onclick = function () {
          index = this.index;
          $(ImgUl).animate({
            "left": -index * container.offsetWidth
          });
          light();
        };
      }

      // 改变圆点样式
      function light() {
        for (var i = 0; i < points.length; ++i) {
          points[i].className = "";
        }
        index > (points.length - 1) ? points[0].className = pointStyle : points[index].className = pointStyle;
      }
    }

    // 向右 or 右播放
    function rightPlay() {
      index++;
      if (index > liS.length - 1) {
        ImgUl.style.left = 0;
        index = 1;
      }

      $(ImgUl).animate({
        "left": -index * container.offsetWidth
      });
      pointStyle == undefined ? '' : light();
    }

    function leftPlay() {
      index--;
      if (index < 0) {
        ImgUl.style.left = -(liS.length - 1) * container.offsetWidth + "px";
        index = liS.length - 2;
      }
      $(ImgUl).animate({
        "left": -index * container.offsetWidth
      });
      light();
    }

    //给左右箭头添加事件
    if (arrowContainer != undefined) {
      var left = arrowContainer.children[0];
      var right = arrowContainer.children[1];
      left.onclick = leftPlay;
      right.onclick = rightPlay;
    }

    //默认向右滚动
    container.timer = setInterval(rightPlay, time);

    //鼠标移入移出事件
    container.onmouseover = function () {
      clearInterval(container.timer);
    };
    container.onmouseout = function () {
      clearInterval(container.timer);
      container.timer = setInterval(rightPlay, time);
    };
  }
});


$(function () {
  var width = 690;
  var height = 500;

  var svg = d3.select("#Map").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(0,0)");

  var projection = d3.geo.mercator()
    .center([105, 38])
    .scale(600)
    .translate([width / 2, height / 2]);

  var path = d3.geo.path()
    .projection(projection);

  // var color = d3.scale.category20();

  d3.json("./plugin/china.json", function (error, root) {

    if (error)
      return console.error(error);
    // console.log(root.features);

    svg.selectAll("path")
      .data(root.features)
      .enter()
      .append("path")
      .attr("stroke", "rgba(255,255,255,1)")
      .attr("stroke-width", 1)
      .attr("fill", function (d, i) {
        // return color(i);
        return '#E2E2E2'
      })
      .attr("d", path)
      .on("mouseover", function (d, i) {
        d3.select(this)
          .attr("fill", "#00CC00");

        var cityName = d.properties.name.slice(0, 2);
        if (cityName == '内蒙') {
          var cityName = '内蒙古';
        } else if (cityName == '黑龙') {
          var cityName = '黑龙江';
        }
        $('#cityName').text(cityName + '校区');
      })
      .on("mouseout", function (d, i) {
        // d3.select(this)
        // .attr("fill", color(i));
        d3.select(this)
          .attr("fill", '#E2E2E2');
      });

    var paths = Array.from(document.querySelectorAll("path"));

    svg.selectAll('.MyText')
      .data(root.features)
      .enter()
      .append('text')
      .attr('class', 'MyText')
      .attr('transform', function (d, i) {
        var centroid = path.centroid(d3.select(paths[i]).datum());
        // return `translate(${centroid[0]} ${centroid[1]})`;
        return 'translate(' + centroid[0] + ' ' + centroid[1] + ')';
      })
      .style("font-size", "12px")
      .text(function (d, i) {
        // console.log(d.properties.name.slice(0,2));
        var cityName = d.properties.name.slice(0, 2);
        if (cityName == '内蒙') {
          var cityName = '内蒙古';
        } else if (cityName == '黑龙') {
          var cityName = '黑龙江';
        }

        return cityName;
      })
      .on("mouseover", function (d, i) {
        d3.select(paths[i]).attr("fill", '#00CC00');
      })
      .on("mouseout", function (d, i) {
        d3.select(paths[i])
          .attr("fill", '#E2E2E2');
      });
  });

  var svg2 = d3.select("#Map").append("svg")
    .attr("width", 60)
    .attr("height", 80)
    .attr("class", "nanhai")
    .append("g");

  d3.xml("./plugin/southchinasea.svg", function (error, xmlDocument) {

    svg2.html(function (d) {
      return d3.select(this).html() + xmlDocument.getElementsByTagName("g")[0].outerHTML;
    });

    var gSouthSea = d3.select("#southsea");

    gSouthSea.attr("transform", "scale(0.4)")
      .attr("class", "southsea");


  });



});

$(function () {
  //当滚动条的位置处于距顶部100像素以下时，跳转符号出现，否则消失
  $(window).scroll(function () {
    if ($(window).scrollTop() > $(window).height() / 2) {
      $("#toTop").fadeIn(500);
    } else {
      $("#toTop").fadeOut(500);
    }
  });

  //当点击跳转链接后，回到页面顶部位置
  $("#toTop").click(function () {
    if ($('html').scrollTop()) {
      $('html').animate({
        scrollTop: 0
      }, 400); //动画效果
      return false;
    }
    $('body').animate({
      scrollTop: 0
    }, 400);
    return false;
  });
});


$(function () {

  var $freelookBtn = $('#freelookBtn');
  var $dialogBg = $('#dialogBg');
  var $close = $('#close');

  $freelookBtn.click(function(){
    $dialogBg.show();
    $dialog.show();
  });

  $close.click(function(){
    $dialogBg.hide();
    $dialog.hide();
  })

  var clientW = $(window).width();
  var clientH = $(window).height();

  var $dialog = $('#freeDialog');
  var loginW = $dialog.outerWidth();
  var loginH = $dialog.outerHeight();

  $dialog.css({
    'left': (clientW - loginW) / 2 + 'px',
    'top': (clientH - loginH) / 2 + 'px'
  });

  $(window).on('resize scroll', function () {

    // 窗口改变时，需要重新获取window宽高；
    clientW = $(window).width();
    clientH = $(window).height();
    $dialog.css({
      'left': (clientW - loginW) / 2 + 'px',
      'top': (clientH - loginH) / 2 + $(window).scrollTop() + 'px'
    });

  });

});