/**
 * ========================================================
 * ГЛАВНЫЙ ФАЙЛ АНИМАЦИЙ
 * Структурированная версия с улучшениями
 * ========================================================
 */

/**
 * Модуль для работы с бургер-меню
 */
const Menu = (() => {
	const btnBurger = document.querySelector('.button__burger')
	const btnMenu = document.querySelector('.menu')
	const overlay = document.querySelector('.overlay')

	function closeMenu() {
		if (!btnMenu.classList.contains('active')) return

		btnMenu.classList.add('is-animated')
		requestAnimationFrame(() => {
			btnBurger.classList.remove('active')
			btnMenu.classList.remove('active')
			overlay.classList.remove('active')
		})
	}

	function toggleMenu() {
		btnMenu.classList.add('is-animated')
		requestAnimationFrame(() => {
			btnBurger.classList.toggle('active')
			btnMenu.classList.toggle('active')
			overlay.classList.toggle('active')
		})
	}

	function init() {
		if (!btnBurger) return

		btnBurger.addEventListener('click', toggleMenu)
		overlay.addEventListener('click', closeMenu)

		document.addEventListener('keydown', e => {
			if (e.key === 'Escape') closeMenu()
		})
	}

	return { init, closeMenu }
})()

/**
 * Модуль для анимаций при загрузке страницы
 */
const PageAnimations = (() => {
	function initHeaderAnimation() {
		const tl = anime.timeline({
			easing: 'easeOutExpo',
			duration: 1000,
		})

		tl.add({
			targets: '.logo',
			translateY: [-30, 0],
			opacity: [0, 1],
		})
			.add(
				{
					targets: '.menu__item',
					translateY: [-20, 0],
					opacity: [0, 1],
					delay: anime.stagger(100),
				},
				'-=600'
			)
			.add(
				{
					targets: '.header__button',
					translateY: [-40, 0],
					scale: [0.8, 1],
					opacity: [0, 1],
					duration: 800,
				},
				'-=700'
			)
	}

	function initBannerAnimation() {
		const title = document.querySelector('.banner__title')
		if (!title) return

		// Разбиваем заголовок на слова
		const words = title.textContent.trim().split(' ')
		title.innerHTML = words
			.map(
				word => `
        <span class="word">
          <span class="word-inner">${word}</span>
        </span>
      `
			)
			.join(' ')

		// Последовательная анимация элементов баннера
		const bannerTimeline = anime.timeline({
			easing: 'easeOutExpo',
		})

		bannerTimeline
			.add({
				targets: '.banner__subtitle',
				translateY: ['-50%', '0%'],
				opacity: [0, 1],
				duration: 1000,
				delay: 150,
			})
			.add(
				{
					targets: '.banner__title .word-inner',
					translateY: ['100%', '0%'],
					opacity: [0, 1],
					duration: 2000,
					delay: anime.stagger(700, { start: 1100 }),
				},
				'-=500'
			)
			.add(
				{
					targets: '.banner__text',
					translateY: ['-100%', '0%'],
					opacity: [0, 1],
					duration: 1000,
				},
				'-=800'
			)
			.add(
				{
					targets: '.banner__button',
					scale: [0, 1],
					opacity: [0, 1],
					duration: 2000,
				},
				'-=600'
			)
	}

	function init() {
		initHeaderAnimation()
		initBannerAnimation()
	}

	return { init }
})()

/**
 * Модуль для анимаций при скролле (с Intersection Observer)
 */
const ScrollAnimations = (() => {
	// Общие настройки для всех обсерверов
	const observerOptions = {
		root: null,
		rootMargin: '0px',
		threshold: 0.3,
	}

	// Настройки для секций, которые должны анимироваться при центре экрана
	const centerObserverOptions = {
		root: null,
		rootMargin: '-50% 0px -50% 0px', // Секция анимируется, когда по центру экрана
		threshold: 0,
	}

	/**
	 * Анимация для шариков (SVG path)
	 */
	function initBallAnimations() {
		const ballObserver = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (!entry.isIntersecting) return

				const ball = entry.target
				const path = ball.querySelector('path')
				if (!path) return

				const length = path.getTotalLength()
				const delay = Number(ball.dataset.delay) || 0

				path.style.strokeDasharray = length
				path.style.strokeDashoffset = length

				anime({
					targets: path,
					strokeDashoffset: 0,
					duration: 7000,
					delay,
					easing: 'easeInOutSine',
				})

				ballObserver.unobserve(ball)
			})
		}, observerOptions)

		document.querySelectorAll('.ball').forEach(ball => {
			ballObserver.observe(ball)
		})
	}

	/**
	 * Анимация для секции "About"
	 */
	function initAboutAnimations() {
		const aboutObserver = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (!entry.isIntersecting) return

				const item = entry.target
				animateAboutItem(item)
				aboutObserver.unobserve(item)
			})
		}, observerOptions)

		document.querySelectorAll('.about__item').forEach(item => {
			aboutObserver.observe(item)
		})

		function animateAboutItem(item) {
			const elements = {
				subtitle: item.querySelector('.about__subtitle'),
				title: item.querySelector('.about__title'),
				text: item.querySelector('.about__text'),
				number: item.querySelector('.about__number'),
				button: item.querySelector('.about__button'),
			}

			const timeline = anime.timeline({
				easing: 'easeOutExpo',
			})

			if (elements.subtitle) {
				timeline.add({
					targets: elements.subtitle,
					translateY: [30, 0],
					opacity: [0, 1],
					duration: 800,
				})
			}

			if (elements.title) {
				timeline.add(
					{
						targets: elements.title,
						translateY: [30, 0],
						opacity: [0, 1],
						duration: 1000,
					},
					'-=400'
				)
			}

			if (elements.text) {
				timeline.add(
					{
						targets: elements.text,
						translateY: [30, 0],
						opacity: [0, 1],
						duration: 1200,
					},
					'-=500'
				)
			}

			if (elements.button) {
				timeline.add(
					{
						targets: elements.button,
						scale: [0.8, 1],
						opacity: [0, 1],
						duration: 1000,
					},
					'-=600'
				)
			}

			if (elements.number) {
				anime({
					targets: elements.number,
					scale: [0.8, 1],
					opacity: [0, 1],
					duration: 1000,
					delay: 300,
					easing: 'easeOutExpo',
				})
			}
		}
	}

	/**
	 * Анимация для секции "Completed" (анимируется по центру экрана)
	 */
	function initCompletedAnimations() {
		const completedObserver = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (!entry.isIntersecting) return

				const section = entry.target
				animateCompletedSection(section)
				completedObserver.unobserve(section)
			})
		}, centerObserverOptions) // Используем настройки для центра экрана

		const completedSection = document.querySelector('.completed')
		if (completedSection) {
			completedObserver.observe(completedSection)
		}

		function animateCompletedSection(section) {
			const title = section.querySelector('.completed__title')
			const items = section.querySelectorAll('.completed__item')

			const timeline = anime.timeline({
				easing: 'easeOutExpo',
			})

			if (title) {
				timeline.add({
					targets: title,
					translateY: [30, 0],
					opacity: [0, 1],
					duration: 1000,
				})
			}

			if (items.length > 0) {
				timeline.add({
					targets: items,
					translateY: [40, 0],
					opacity: [0, 1],
					delay: anime.stagger(200),
					duration: 800,
				})
			}
		}
	}

	/**
	 * Анимация для секции "Testimonial"
	 */
	function initTestimonialAnimations() {
		const testimonialObserver = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (!entry.isIntersecting) return

				animateTestimonialElements()
				testimonialObserver.unobserve(entry.target)
			})
		}, observerOptions)

		const testimonialSection = document.querySelector('.testimonial')
		if (testimonialSection) {
			testimonialObserver.observe(testimonialSection)

			// Резервный запуск через 5 секунд
			setTimeout(() => {
				if (!testimonialSection.classList.contains('animated')) {
					animateTestimonialElements()
					testimonialSection.classList.add('animated')
				}
			}, 5000)
		}

		function animateTestimonialElements() {
			anime({
				targets: '.testimonial__subtitle',
				translateY: [30, 0],
				opacity: [0, 1],
				duration: 1000,
				easing: 'easeOutExpo',
			})

			anime({
				targets: '.testimonial__titles',
				translateY: [30, 0],
				opacity: [0, 1],
				duration: 2500,
				delay: 200,
				easing: 'easeOutExpo',
			})
		}
	}

	/**
	 * Анимация для секции "Newsletter"
	 */
	function initNewsletterAnimations() {
		const newsletterObserver = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (!entry.isIntersecting) return

				animateNewsletterSection()
				newsletterObserver.unobserve(entry.target)
			})
		}, observerOptions)

		const newsletterSection = document.querySelector('.newsletter')
		if (newsletterSection) {
			newsletterObserver.observe(newsletterSection)
		}

		function animateNewsletterSection() {
			const tl = anime.timeline({
				easing: 'spring(1, 80, 10, 0)',
			})

			tl.add({
				targets: '.newsletter__title',
				translateY: [80, 0],
				opacity: [0, 1],
				duration: 1200,
			})
				.add(
					{
						targets: '.newsletter__line',
						scaleX: [0, 1],
						opacity: [0, 1],
						duration: 800,
					},
					'-=600'
				)
				.add(
					{
						targets: '.newsletter__text',
						translateY: [60, 0],
						opacity: [0, 1],
						duration: 1000,
					},
					'-=400'
				)
				.add(
					{
						targets: '.newsletter__form',
						translateY: [50, 0],
						opacity: [0, 1],
						duration: 1000,
					},
					'-=400'
				)

			// Партиклы для фона
			createNewsletterParticles()
			initNewsletterInputEffects()
		}

		function createNewsletterParticles() {
			const newsletter = document.querySelector('.newsletter')
			if (!newsletter) return

			for (let i = 0; i < 20; i++) {
				const particle = document.createElement('div')
				particle.className = 'newsletter-particle'
				particle.style.cssText = `
          position: absolute;
          width: ${Math.random() * 6 + 2}px;
          height: ${Math.random() * 6 + 2}px;
          background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
          border-radius: 50%;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          pointer-events: none;
          z-index: 1;
        `
				newsletter.appendChild(particle)

				anime({
					targets: particle,
					translateX: () => Math.random() * 100 - 50,
					translateY: () => Math.random() * 100 - 50,
					opacity: [0, 1, 0],
					scale: [0, 1, 0],
					duration: 3000 + Math.random() * 2000,
					delay: Math.random() * 1000,
					loop: true,
					easing: 'easeInOutSine',
				})
			}
		}

		function initNewsletterInputEffects() {
			const input = document.querySelector('.newsletter__input')
			const button = document.querySelector('.newsletter__button')

			if (input && button) {
				// Анимация placeholder
				anime({
					targets: input,
					borderWidth: ['1px', '2px'],
					borderColor: ['#ccc', '#4a90e2'],
					duration: 2000,
					loop: true,
					direction: 'alternate',
					easing: 'easeInOutSine',
				})

				// Пульсация кнопки
				anime({
					targets: button,
					scale: [1, 1.05],
					boxShadow: ['0 4px 6px rgba(0,0,0,0.1)', '0 10px 20px rgba(74, 144, 226, 0.3)'],
					duration: 1500,
					loop: true,
					direction: 'alternate',
					easing: 'easeInOutSine',
				})

				// Интерактивность
				input.addEventListener('focus', () => {
					anime({
						targets: input,
						scale: 1.02,
						borderColor: '#2563eb',
						duration: 300,
					})
				})

				input.addEventListener('blur', () => {
					anime({
						targets: input,
						scale: 1,
						borderColor: '#ccc',
						duration: 300,
					})
				})
			}
		}
	}

	/**
	 * Анимация для футера
	 */
	function initFooterAnimations() {
		// Обновляем год в футере
		const yearElement = document.querySelector('.current-year')
		if (yearElement) {
			yearElement.textContent = new Date().getFullYear()
		}

		const footerObserver = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (!entry.isIntersecting) return

				animateFooterElements()
				footerObserver.unobserve(entry.target)
			})
		}, observerOptions)

		const footerSection = document.querySelector('.footer')
		if (footerSection) {
			footerObserver.observe(footerSection)
			initFooterHoverEffects()
			initScrollToTop()
			createFooterParticles()
		}

		function animateFooterElements() {
			const footerItems = document.querySelectorAll('.footer__item')
			footerItems.forEach((item, index) => {
				anime({
					targets: item,
					translateY: [30, 0],
					opacity: [0, 1],
					duration: 800,
					delay: index * 100,
					easing: 'easeOutExpo',
				})
			})
		}

		function initFooterHoverEffects() {
			// Эффект для лого
			const logoLink = document.querySelector('.footer__logo-link')
			if (logoLink) {
				logoLink.addEventListener('mouseenter', () => {
					anime({
						targets: '.logo-animate',
						scale: [1, 1.1],
						rotate: [0, 5],
						duration: 300,
						easing: 'easeOutBack',
					})
				})

				logoLink.addEventListener('mouseleave', () => {
					anime({
						targets: '.logo-animate',
						scale: 1,
						rotate: 0,
						duration: 300,
					})
				})
			}

			// Эффект для соц. иконок
			document.querySelectorAll('.social-icon').forEach(icon => {
				icon.addEventListener('mouseenter', () => {
					anime({
						targets: icon,
						scale: 1.1,
						rotate: 360,
						duration: 600,
						easing: 'easeOutBack',
					})
				})

				icon.addEventListener('mouseleave', () => {
					anime({
						targets: icon,
						scale: 1,
						rotate: 0,
						duration: 300,
					})
				})
			})
		}

		function initScrollToTop() {
			const scrollBtn = document.querySelector('.footer__scroll-top')
			if (!scrollBtn) return

			window.addEventListener('scroll', () => {
				if (window.pageYOffset > 300) {
					scrollBtn.classList.add('visible')
				} else {
					scrollBtn.classList.remove('visible')
				}
			})

			scrollBtn.addEventListener('click', () => {
				anime({
					targets: scrollBtn,
					scale: 0.8,
					rotate: 360,
					duration: 300,
					easing: 'easeOutBack',
					complete: () => {
						window.scrollTo({ top: 0, behavior: 'smooth' })
						setTimeout(() => {
							anime({
								targets: scrollBtn,
								scale: 1,
								rotate: 0,
								duration: 300,
							})
						}, 500)
					},
				})
			})
		}

		function createFooterParticles() {
			const footer = document.querySelector('.footer')
			if (!footer) return

			for (let i = 0; i < 15; i++) {
				const particle = document.createElement('div')
				particle.style.cssText = `
          position: absolute;
          width: ${Math.random() * 4 + 1}px;
          height: ${Math.random() * 4 + 1}px;
          background: rgba(55, 128, 107, ${Math.random() * 0.3 + 0.1});
          border-radius: 50%;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          pointer-events: none;
          z-index: 1;
        `
				footer.appendChild(particle)

				anime({
					targets: particle,
					translateX: () => Math.random() * 100 - 50,
					translateY: () => Math.random() * 100 - 50,
					opacity: [0, 1, 0],
					scale: [0, 1, 0],
					duration: 4000 + Math.random() * 3000,
					delay: Math.random() * 2000,
					loop: true,
					easing: 'easeInOutSine',
				})
			}
		}
	}

	function init() {
		initBallAnimations()
		initAboutAnimations()
		initCompletedAnimations()
		initTestimonialAnimations()
		initNewsletterAnimations()
		initFooterAnimations()
	}

	return { init }
})()

/**
 * Модуль для инициализации слайдеров
 */
const Sliders = (() => {
	function init() {
		let serviceSlider = null
		let testimonialSlider = null

		// Service Slider
		const serviceSliderEl = document.querySelector('.serviceSlider')
		if (serviceSliderEl) {
			serviceSlider = new Swiper('.serviceSlider', {
				slidesPerView: 3,
				spaceBetween: 37,
				loop: true,
				navigation: {
					nextEl: '.service-next',
					prevEl: '.service-prev',
				},
				breakpoints: {
					50: { slidesPerView: 1, spaceBetween: 10 },
					300: { slidesPerView: 1, spaceBetween: 10 },
					640: { slidesPerView: 1, spaceBetween: 10 },
					800: { slidesPerView: 2, spaceBetween: 20 },
					1300: { slidesPerView: 3, spaceBetween: 37 },
				},
			})
		}

		// Testimonial Slider
		const testimonialSliderEl = document.querySelector('.testimonialSlider')
		if (testimonialSliderEl) {
			testimonialSlider = new Swiper('.testimonialSlider', {
				slidesPerView: 2,
				spaceBetween: 20,
				navigation: {
					nextEl: '.testimonial__navigation-next',
					prevEl: '.testimonial__navigation-prev',
				},
				breakpoints: {
					50: { slidesPerView: 1, spaceBetween: 20 },
					300: { slidesPerView: 1, spaceBetween: 20 },
					640: { slidesPerView: 1, spaceBetween: 20 },
					800: { slidesPerView: 1, spaceBetween: 20 },
					1300: { slidesPerView: 2, spaceBetween: 37 },
				},
			})
		}

		return { serviceSlider, testimonialSlider }
	}

	return { init }
})()

/**
 * Глобальная инициализация при загрузке страницы
 */
document.addEventListener('DOMContentLoaded', () => {
	// Инициализация всех модулей
	Menu.init()
	PageAnimations.init()
	ScrollAnimations.init()

	// Инициализация слайдеров
	const sliders = Sliders.init()

	// Экспорт слайдеров в глобальную область видимости (если нужно)
	window.appSliders = sliders
})

/**
 * Полифил для requestAnimationFrame
 */
;(function () {
	var lastTime = 0
	var vendors = ['ms', 'moz', 'webkit', 'o']
	for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame']
		window.cancelAnimationFrame =
			window[vendors[x] + 'CancelAnimationFrame'] ||
			window[vendors[x] + 'CancelRequestAnimationFrame']
	}
	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = function (callback, element) {
			var currTime = new Date().getTime()
			var timeToCall = Math.max(0, 16 - (currTime - lastTime))
			var id = window.setTimeout(function () {
				callback(currTime + timeToCall)
			}, timeToCall)
			lastTime = currTime + timeToCall
			return id
		}
	if (!window.cancelAnimationFrame)
		window.cancelAnimationFrame = function (id) {
			clearTimeout(id)
		}
})()
