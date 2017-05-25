/*import Vue from 'vue'
import App from './App.vue'

new Vue({
  el: '#app',
  render: h => h(App)
})*/
import '../scss/index.scss';
$(function () {
	var item1Timer, timer,

//			加动画的每个元素
		$item2_title = $('.item2 .head>div'),
		$item2_left = $('.item2 .item2_left'),
		$item2_right = $('.item2 .item2_right'),
		$item3_title = $('.item3 .head>div'),
		$item3_serverItem = $('.item3 .serverItem'),
		$item4_contentDiv = $('.item4 .content_body>div:not(:last-child)'),
		$item4_foot = $('.content_foot'),
		//			动画函数集合
		animation = {
			item1: function () {
				console.log('第一页动画触发22222222');
			},
			item2: function (toggle) {
				console.log('第2页动画触发');
				$item2_title[toggle]('animated zoomIn');
				$item2_left[toggle]('animated fadeInLeft');
				$item2_right[toggle]('animated fadeInRight');
			},
			item3: function (toggle) {
				console.log('第3页动画触发');
				$item3_title[toggle]('animated bounceInLeft');
				$item3_serverItem[toggle]('animated jello');
			},
			item4: function (toggle) {
				console.log('第4页动画触发');
				$item4_foot[toggle]('animated swing infinite').css('animationDuration', '2s');
				$item4_contentDiv[toggle]('animated zoomIn');
				toggle === 'addClass' && this.time();
			},
			item5: function (toggle) {
				console.log('第5页动画触发');
			},
			time: function () {
				var i = 0, divList = $('.course_content>div');
				divList.removeClass('zoomIn block');
				timer = setInterval(function () {
					var left = 74 + 78 * (i + 1), now = divList[i], randomColor = timeColor[random()];
					console.log(i);
					if (now) {
						$(now).css({
							left: left + 'px',
							background: randomColor,
						}).addClass('zoomIn block animated');
						$(now).children('b').css(i % 2 === 0 ? 'borderTopColor' : 'borderBottomColor', randomColor);
						i++;
					} else {
						clearInterval(timer);
					}
				}, 500);
			}
		},
//			时间轴 颜色集合
		timeColor = ['rgb(142,198,63)', 'rgb(242,90,41)', 'rgb(39,170,226)', 'rgb(132,201,183)'];

	//生成随机数
	function random() {
		return parseInt(Math.random() * 4);
	}

	//首屏轮播自动移动
	function autoMove() {
		item1Timer = setInterval(function () {
			$.fn.fullpage.moveSlideRight();
		}, 5000);
	}

	autoMove();


//		fullpage 基本配置
	$('#fullpage').fullpage({
		slidesNavigation: true,//左右导航
		slidesNavPosition: 'bottom',
		anchors: ['page1', 'page2', 'page3', 'page4', 'page5'],
		navigation: true,
		navigationPosition: 'right',
		menu: '#menu',
		'afterLoad': function (anchorLink, index) {
			//console.log(anchorLink, index);
		},
		'onLeave': function (index, nextIndex, direction) {
			console.log(nextIndex);
			animation['item' + nextIndex]('addClass');
			animation['item' + index]('removeClass');
			console.log(timer);
			index === 4 && clearInterval(timer);
		}
	});

	$('.fp-slidesNav.bottom').on('mouseenter', function () {
		clearInterval(item1Timer);
	})
		.on('mouseleave', function () {
			autoMove();
		});
	/*第四屏导航*/
	$('.content_nav').on('click', 'li', function () {
		$(this).addClass('active').siblings('li').removeClass('active');

		var index = $(this).data('index'),
			divList = $('.content_body>div').removeClass('zoomIn block');

		if (index === 3) {
			$(divList[index - 1]).addClass('block');
			animation.time();
		} else {
			clearInterval(timer);
			$(divList[index - 1]).addClass('zoomIn block animated');
		}
	});
});