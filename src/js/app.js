function App() {
	/// header burger
	const burger = document.querySelector('.burger');
	const header = document.querySelector('.header');
	const navItems = document.querySelectorAll('.nav__item');
	const body = document.body;

	function closeMenu() {
		burger.classList.remove('active');
		header.classList.remove('open-menu');
		body.style.overflow = 'visible';
	}
	function toggleMenu() {
		const isActive = burger.classList.toggle('active');
		header.classList.toggle('open-menu', isActive);
		body.style.overflow = isActive ? 'hidden' : 'visible';
	}
	burger.addEventListener('click', toggleMenu);

	navItems.forEach(item => {
		item.addEventListener('click', closeMenu);
	});
	window.addEventListener('resize', () => {
		if (window.innerWidth > 768) {
			closeMenu();
		}
	});
	// scroll header
	const headerFixed = document.querySelector('.header');
	const setFixedHeader = () => {
		headerFixed.classList.toggle('scroll-active', window.scrollY >= 60);
	};
	window.addEventListener('scroll', setFixedHeader);

	///switch center, expert/////
	document.querySelectorAll('.btn-slide').forEach(button => {
		button.addEventListener('click', () => {
			const section = button.closest('.section__center, .section__expert');
			if (!section) return;
			const blocks = section.querySelectorAll('.center__wrap, .expert__wrap');
			const currentBlock = section.querySelector(
				'.center__wrap.active, .expert__wrap.active'
			);
			let nextBlock;
			if (currentBlock) {
				currentBlock.classList.remove('active');
				nextBlock = currentBlock.nextElementSibling;
			}
			if (
				!nextBlock ||
				!(
					nextBlock.classList.contains('center__wrap') ||
					nextBlock.classList.contains('expert__wrap')
				)
			) {
				nextBlock = blocks[0];
			}
			nextBlock.classList.add('active');
			section
				.querySelectorAll('.btn-slide')
				.forEach(btn => (btn.disabled = false));

			const targetButton = Array.from(
				nextBlock.querySelectorAll('.btn-slide')
			).find(btn => btn.textContent.trim() === button.textContent.trim());

			if (targetButton) {
				targetButton.disabled = true;
			}
		});
	});

	///slider Course/////
	let sliderCourse = new Swiper('.course__slider', {
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		effect: 'coverflow',
		coverflowEffect: {
			rotate: 50,
			stretch: 0,
			depth: 100,
			modifier: 1,
			slideShadows: false,
		},
		slidesPerView: 1,
		speed: 800,
		pagination: {
			el: '.swiper-pagination',
			type: 'fraction',
		},
		spaceBetween: 10,
	});

	///slider Teaching/////
	let sliderTeaching = new Swiper('.teaching__slider', {
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		effect: 'fade',
		slidesPerView: 1,
		speed: 800,
		pagination: {
			el: '.swiper-pagination',
			type: 'fraction',
		},
		spaceBetween: 10,
	});

	///slider Program /////
	let sliderProgram = new Swiper('.program__slider', {
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		effect: 'coverflow',
		coverflowEffect: {
			rotate: 50,
			stretch: 0,
			depth: 100,
			modifier: 1,
			slideShadows: false,
		},
		slidesPerView: 1,
		speed: 800,
		pagination: {
			el: '.swiper-pagination',
			type: 'fraction',
			renderFraction: function (currentClass, totalClass) {
				return (
					'<span class="' +
					currentClass +
					'"></span> <span class="' +
					totalClass +
					'"></span>'
				);
			},
		},
		spaceBetween: 10,
	});

	///slider Tariffs /////
	let sliderTariffs = new Swiper('.tariffs__slider', {
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		spaceBetween: 10,
		slidesPerView: 1,
		breakpoints: {
			1200: {
				spaceBetween: 10,
				slidesPerView: 3,
			},
			600: {
				spaceBetween: 10,
				slidesPerView: 2,
			},
			400: {
				spaceBetween: 10,
				slidesPerView: 1,
			},
		},
	});

	///slider Reviews /////
	let sliderReviews = new Swiper('.reviews__slider', {
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		centeredSlides: false,
		loop: true,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		spaceBetween: 20,
		slidesPerView: 1,

		breakpoints: {
			900: {
				spaceBetween: 20,
				slidesPerView: 3,
			},
			768: {
				spaceBetween: 10,
				slidesPerView: 2,
			},
			600: {
				spaceBetween: 10,
				slidesPerView: 2,
			},
		},
	});

	/// tabs  course//////

	const buttons = document.querySelectorAll('.course__tab-btn');
	buttons.forEach(button => {
		button.addEventListener('click', () => {
			const slide = button.closest('.swiper-slide');
			const tabs = slide.querySelectorAll('.course__info-text');
			const buttonsInSlide = slide.querySelectorAll('.course__tab-btn');
			buttonsInSlide.forEach(btn => btn.classList.remove('tab__active'));
			tabs.forEach(tab => tab.classList.remove('text-active'));
			button.classList.add('tab__active');
			slide
				.querySelector(`.course__info-text[data-tab="${button.dataset.tab}"]`)
				.classList.add('text-active');
		});
	});

	document.addEventListener('DOMContentLoaded', function () {
		const plusBtn = document.querySelector('.program__button-plus');
		const modulesBlock = document.querySelector('.program__modules');
		const closeBtn = document.querySelector(
			'.program__modules .program__close-btn'
		); // Знаходимо кнопку "Згорнути"

		plusBtn.addEventListener('click', function (event) {
			event.stopPropagation(); // Запобігаємо миттєвому закриттю при кліку на кнопку
			toggleModules();
		});

		document.addEventListener('click', function (event) {
			if (
				!modulesBlock.contains(event.target) &&
				!plusBtn.contains(event.target)
			) {
				closeModules();
			}
		});

		if (closeBtn) {
			closeBtn.addEventListener('click', function () {
				closeModules();
			});
		}

		function toggleModules() {
			if (modulesBlock.classList.contains('active')) {
				closeModules();
			} else {
				modulesBlock.style.maxHeight = modulesBlock.scrollHeight + 'px';
				modulesBlock.classList.add('active');
			}
		}

		function closeModules() {
			modulesBlock.style.maxHeight = '0';
			modulesBlock.classList.remove('active');
		}
	});
}
App();
