$(function(){
	$(".menu nav > ul > li").hover(
		function(){
			$(".menu").addClass("active");
		},
		function(){
			$(".menu").removeClass("active");
		}
	);
		var swiper1 = new Swiper(".slider .mySwiper", {
		navigation: {
		  nextEl: ".slider .swiper-button-next",
		  prevEl: ".slider .swiper-button-prev",
		},
	});
});