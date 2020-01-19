//slick slider

// $(document).ready(function () {
//     $('.carousel_inner').slick({
//         speed: 1200,
//         // adaptiveHeight: true,
//         autoplay: true,
//         autoplaySpeed: 2000,
//         prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
//         nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
//         responsive: [
//             {
//               breakpoint: 992,
//               settings: {
//                 dots: true,
//                 arrows: false
//               }
//             }
//         ]  
//     });
// });





// tiny-slider

const slider = tns({
	container: '.carousel_inner',
	items: 1,
	slideBy: 'page',
	controls: false,
	nav: false,
	autoplay: true,
	autoplayTimeout: 6000,
	autoplayButtonOutput: false,
	speed: 1200
});

document.querySelector('.prev').addEventListener('click', function () {
	slider.goTo('prev');
});

document.querySelector('.next').addEventListener('click', function () {
	slider.goTo('next');
});


$(document).ready(function () {

	$('ul.catalog_tabs').on('click', 'li:not(.catalog_tab_active)', function () {
		$(this)
			.addClass('catalog_tab_active').siblings().removeClass('catalog_tab_active')
			.closest('div.container').find('div.catalog_content').removeClass('catalog_content_active').eq($(this).index()).addClass('catalog_content_active');
	});


	function toggleSlide(item) {
		$(item).each(function (i) {
			$(this).on('click', function (e) {
				e.preventDefault();
				$('.catalog-item_content').eq(i).toggleClass('catalog-item_content_active');
				$('.catalog-item_list').eq(i).toggleClass('catalog-item_list_active');
			});
		});
	}

	toggleSlide('.catalog-item_link');
	toggleSlide('.catalog-item_back');


	// Modal

	$('[data-modal=consultation]').on('click', function () {
		$('.overlay, #consultation').fadeIn(1000);
	});

	$('.modal_close').on('click', function () {
		$('.overlay, #consultation, #order, #thanks').fadeOut('slow');
	});

	$('.catalog-item_btn').each(function (i) {
		$(this).on('click', function () {
			$('#order .modal_descr').text($('.catalog-item_subtitle').eq(i).text());
			$('.overlay, #order').fadeIn(1000);
		});
	});


	function validateForms(item) {
		$(item).validate({
			rules: {
				name: {
					required: true,
					minlength: 2
				},
				phone: "required",
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				name: {
					required: "Խնդրում ենք մուտքագրել Ձեր անունը",
					minlength: jQuery.validator.format("Մուտքագրեք առնվազն {0} տառ/թիվ")
				},
				phone: "Խնդրում ենք մուտքագրել Ձեր հեռ. համարը",
				email: {
					required: "Խնդրում ենք մուտքագրել Ձեր էլ. հասցեն",
					email: "Էլ. հասցեն սխալ է մուտքագրված"
				}
			}
		});
	}

	validateForms('#consultation-form');
	validateForms('#consultation form');
	validateForms('#order form');



	// phone number styles
	$("input[name=phone]").mask("+(374) 99 99-99-99");

	//submit
	$('form').submit(function (e) {
		e.preventDefault();
		$.ajax({
			type: 'POST',
			url: '../mailer/smart.php',
			data: $(this).serialize()
		}).done(function() {
			$(this).find('input').val("");
			$('#consultation, #order').fadeOut();
			$('.overlay, #thanks').fadeIn('slow');

			$("form").trigger("reset");
		});
		return false;
	});


	// Smooth scroll and pageup 
	$(window).scroll(function() {
		if($(this).scrollTop() > 1600) {
			$('.pageup').fadeIn();
		} else {
			$('.pageup').fadeOut();
		}
	});

	$("a[href='#up']").click(function(){  // "a[href^='#']"
		var _href = $(this).attr("href");
		$("html, body").animate({scrollTop: $(_href).offset().top+"px"});
		return false;
	});


	new WOW().init();

});
