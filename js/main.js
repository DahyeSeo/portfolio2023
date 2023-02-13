$(function(){
	/* 
		-------	email --------
	*/
	$(".mail").click(function(e){
		e.preventDefault();
		$(".send-email").addClass("active");
	});
	$(".btn-email--close, .dim").click(function(){
		$(".send-email").removeClass("active");
	});

	emailjs.init("gkpRW7D5CKQaWxhgo");
	$("input[name=submit]").click(function(e){
		const exptest = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
		e.preventDefault();
		var data = {
			from_name : $("input[name = name]").val(),
			from_email : $("input[name = email]").val(),
			message : $("textarea[name = message]").val()
		};
		if(exptest.test($("input[name = email]").val()) == false){
			$("input[name = email]").addClass("invalid");
		}
		else{
			emailjs.send('service_6uxxmlp', 'template_70nxt9u', data)
			.then(function(response) {
				alert('email sent successfully');
				console.log('email sent successfully', response.status, response.text);
			}, function(error) {
				alert('Please resend');
				console.log('FAILED...', error);
			});		
		}
	});
	$("textarea, input[name = email]").click(function(){
		$(this).removeClass("invalid");
	});

	/* 
		-------	global nav --------
	*/

	$(".tab").click(function(e){
		e.preventDefault();

		if($("#header").hasClass("dark")){
			$("body").css("overflow", "auto")
			for(let i=0; i<list.length; i++){
				list.eq(i).css("transition-delay", "0s");
			}
		}
		else{
			$("body").css("overflow", "hidden")
			for(let i=0; i<list.length; i++){
				list.eq(i).css("transition-delay", `${i * 0.5}s`);
			}
		}
		$("#header").toggleClass("dark");
		$("a.mail").toggleClass("dark");
		$("a.tab").text($("a.tab").text() == "Menu" ? "Close" : "Menu");
	}); // floating menu open-close


	const list = $("#gnb li");
	let currentSection = 0;
	let yOffset = 0;
	let position = 0;

	list.eq(0).find("a").addClass("active");

	list.click(function(e){
		e.preventDefault();
		$(".tab").trigger("click");
		position = $(this).find("a").attr("href");
		if($(window).width() < 768){
			position = $(position).offset().top;
			$("html").delay(300).animate({scrollTop : position}, 500);
		}
		else{
			position = $(position).offset().left - $("#keyvisual").offset().left;
			gsap.to(
				window, 0.5,
				{
					scrollTo: position,
					delay: 0.3,
				}
			);
		};
	}); // gnb page move

	$(window).scroll(function(){
		yOffset = $(window).scrollTop();

		if($(window).width() < 768){
			if(yOffset < $("#introduce").offset().top){
				currentSection = 0;
			}
			else if(yOffset < $("#project").offset().top){
				currentSection = 1;
			}
			else{
				currentSection = 2;
			}
		}
		else{
			if(0 < Math.floor($("#introduce").offset().left)){
				currentSection = 0;
			}
			else if(0 < Math.floor($("#project").offset().left)){
				currentSection = 1;
			}
			else{
				currentSection = 2;
			}
			
		}
		list.find("a").removeClass("active");
		list.eq(currentSection).find("a").addClass("active");
	});  // gnb list active


	/*
		-------	keyvisual btn --------
	*/

	$(".scroll-arr button").click(() => {
		if($(window).width() < 768){
			$("html").delay(300).animate({scrollTop : $("#introduce").offset().top}, 500);
		}
		else{
			gsap.to(
				window, 0.5,
				{
					scrollTo: $("#introduce").offset().left - $("#keyvisual").offset().left,
					delay: 0.3,
				}
			);
		}
	});


	/*
		-------	project link --------
	*/
	function projectLink(){
		if(isMobile){
			$(".project-0 a").attr({href: "project1/index.html"});
			$(".project-1 a").attr({href: "project2/index.html"});
			$(".project-2 a").attr({href: "project3/mobile/index.html"});
		}
		else{
			$(".project-0 a").attr({href: "project1/index.html"});
			$(".project-1 a").attr({href: "project2/index.html"});
			$(".project-2 a").attr({href: "project3/pc/index.html"});
		}
	}

	/*
		-------	horizontal scroll --------
	*/

	function horizontalScroll (){
		const section = gsap.utils.toArray("section, footer");
		getTotalWidth = () => {
			let width = 0;
			section.forEach(el => width += el.offsetWidth);
			return width;
		} // scrollContainer total width

		const t = gsap.to(section, {
			x: () => - getTotalWidth() + window.innerWidth,
			ease: "none",
			scrollTrigger: {
				trigger: '.scroll-container',
				end: () => "+=" + (document.querySelector('.scroll-container').scrollWidth - window.innerWidth),
				pin: true,
				start: 0,
				scrub: true,
			}
		}); // horizontal scroll

		function introduceImg(num, x, y){
			gsap.set($(`.introduce-${num}`),{
				y: window.innerHeight * y - $(`.introduce-${num}`).height() * y})
			gsap.to(
				$(`.introduce-${num}`),0.75,{
					x: -(window.innerWidth * x - $(`.introduce-${num}`).width() * x),
					ease: 'Power3.inOut',
					scrollTrigger: {
						trigger: `.introduce-${num}`,
						containerAnimation: t,
					}
				},
			);
		} // introduce image set

		const imageContainer = gsap.utils.toArray(".project-images, footer");
		const imgS = gsap.utils.toArray(".project-image-S");
		const anchor = $(".project-text a");
		const infoTitle =  $(".project-text .title p");
		const infosummary =  $(".project-text .summary li span");

		anchor.attr({href: "project1/index.html"});
		$('.project-count .current').text(1);
		$('.project-count .total').text(imgS.length);

		gsap.to('.project-count', {
			x: ($('#project').width()),
			ease: "none",
			scrollTrigger: {
				trigger: '#project',
				containerAnimation: t,
				start: "left 0%",
				scrub: true,
			},
		}); // project count sticky

		gsap.to('.project-text', {
			x: $("#project").innerWidth(),
			ease: "none",
			scrollTrigger: {
				trigger: '.project-text',
				start: $(".project-text").offset().left - 50,
				end : '+=' + $("#project").innerWidth(),
				scrub: true,
			}
		}); // project text sticky

		imgS.forEach((img, index) => {
			gsap.to(img, {
				x: -($(window).innerWidth()),
				ease: "none",
				scrollTrigger: {
					trigger: imageContainer[index + 1],
					containerAnimation: t,
					start: "left 100%",
					end: "left 0%",
					scrub: true,
				},
				onComplete: () => {
					if(index < 2){
						infoTitle.text($(`.project-${index+1} .title p`).html());
						if(index === 1 && isMobile){
							anchor.attr({href: `project3/mobile/index.html`});
						}
						else if(index === 1 && !isMobile){
							anchor.attr({href: `project3/pc/index.html`});
						}
						else{
							anchor.attr({href: `project${index+2}/index.html`});
						}
						for(i=0; i<infosummary.length; i++){
							infosummary.eq(i).text($(`.project-${index+1} .list li`).eq(i).find("span").html());
							$('.project-count .current').text(index+2);
						}
						gsap.fromTo(anchor, {x: 100, opacity: 0}, {x: 0, opacity: 1, ease: 'Power2.inOut', delay: 0.1});
					}
				},
				onReverseComplete: () => {
					if(index > 0){
						infoTitle.text($(`.project-${index-1} .title p`).html());
						anchor.attr({href: `project${index}/index.html`});
						for(i=0; i<infosummary.length; i++){
							infosummary.eq(i).text($(`.project-${index-1} .list li`).eq(i).find("span").html());
							$('.project-count .current').text(index);
						}
						gsap.fromTo(anchor, {x: 100, opacity: 0}, {x: 0, opacity: 1, ease: 'Power2.inOut', delay: 0.1});
					}	
				},
			})
		}); // project detail event

		introduceImg(0, 0.7, 0.1);
		introduceImg(1, 0.85, 0);
		introduceImg(2, 0.75, 0.9);
		introduceImg(3, 0.4, 0.5);
		introduceImg(4, 0, 0.1);
		introduceImg(5, 0, 1);
		introduceImg(6, 0.15, 0.9);
	}


	/*
		-------	after-load	-------
	*/
	$(document).ready(function(){
		$(".container").css("display", "block");
		$("body").removeClass("before-load");
		projectLink();
		if($(window).width() >= 768){	
			gsap.registerPlugin(ScrollTrigger);
			horizontalScroll();
			const keytext = $(".keytext p");
			const keytextR = keytext.get().reverse();
			for(i=0; i<keytextR.length-2; i++){
				keytextR[i].style.opacity = `${(i+1) * 15}%`;
			}
		}
		$(window).resize(() => {
			if($(window).width() >= 768){
				window.location.reload();
			}
		});
		$(window).on("orientationchange", () => {
			window.location.reload();
		})
		$(".loading").on("transitionend webkitTransitionEnd oTransitionEnd otransitionend", (e) => {
			document.body.removeChild(e.currentTarget);
		})
	});
});