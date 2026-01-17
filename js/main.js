const btnBurger = document.querySelector('.button__burger')
const btnMenu = document.querySelector('.menu')
const overlay = document.querySelector('.overlay')

function closeMenu() {
	btnMenu.classList.add('is-animated')

	requestAnimationFrame(() => {
		btnBurger.classList.remove('active')
		btnMenu.classList.remove('active')
		overlay.classList.remove('active')
	})
}

btnBurger.addEventListener('click', () => {
	btnMenu.classList.add('is-animated')

	requestAnimationFrame(() => {
		btnBurger.classList.toggle('active')
		btnMenu.classList.toggle('active')
		overlay.classList.toggle('active')
	})
})

// btnBurger.addEventListener('click', closeMenu)
overlay.addEventListener('click', closeMenu)

document.addEventListener('keydown', e => {
	if (e.key === 'Escape') {
		closeMenu()
	}
})

// Ждем, пока весь контент загрузится
document.addEventListener('DOMContentLoaded', () => {
	// Создаем "таймлайн" — цепочку анимаций
	const tl = anime.timeline({
		easing: 'easeOutExpo', // Тип плавности (очень мягкий выезд)
		duration: 1000, // Длительность каждой анимации (1 сек)
	})

	tl
		// 1. Анимируем ЛОГО
		.add({
			targets: '.logo',
			translateY: [-30, 0], // Выезд сверху вниз (с -30px до 0)
			opacity: [0, 1], // Проявление от 0 до 1
		})
		// 2. Анимируем ПУНКТЫ МЕНЮ (по очереди!)
		.add(
			{
				targets: '.menu__item',
				translateY: [-20, 0],
				opacity: [0, 1],
				delay: anime.stagger(100), // Задержка 100мс между каждым пунктом
			},
			'-=600'
		) // Начать эту анимацию на 600мс раньше, чем закончится предыдущая
		// 3. Анимируем КНОПКУ
		.add(
			{
				targets: '.header__button',
				translateY: [-40, 0],
				scale: [0.8, 1], // Увеличение от 0.3 до нормального размера
				opacity: [0, 1],
				duration: 800,
			},
			'-=700'
		) // Начать на 700мс раньше для плавности

	// const bannerPath = document.querySelector('.ball path')

	// if (bannerPath) {
	// 	const length = bannerPath.getTotalLength()

	// 	bannerPath.style.strokeDasharray = length
	// 	bannerPath.style.strokeDashoffset = length

	// 	anime({
	// 		targets: bannerPath,
	// 		strokeDashoffset: 0,
	// 		duration: 5000,
	// 		easing: 'easeInOutSine',
	// 	})
	// }
})

document.addEventListener('DOMContentLoaded', () => {
	const title = document.querySelector('.banner__title', '.about__title')

	if (title) {
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

		anime({
			targets: '.banner__subtitle',
			translateY: ['-50%', '0%'],
			easing: 'easeInOutSine',
			opacity: [0, 1],
			delay: 150,
			duration: 1000,
		})
		anime({
			targets: '.banner__title .word-inner',
			translateY: ['100%', '0%'],
			easing: 'easeOutExpo',
			opacity: [0, 1],
			duration: 2000,
			delay: anime.stagger(700, { start: 1100 }),
		})
		anime({
			targets: '.banner__text',
			translateY: ['-100%', '0%'],
			easing: 'easeInOutSine',
			opacity: [0, 1],
			delay: 3400,
		})

		anime({
			targets: '.banner__button',
			scale: [0, 1],
			duration: 2000,
			opacity: [0, 1],
			easing: 'easeOutExpo',
			delay: 4000,
		})
	}
})

// const slider = document.querySelector('.sliderService')

// if (slider) {
// 	const myService = new Splide(slider, {
// 		perPage: 1,
// 		gap: 37,
// 		classes: {
// 			arrows: 'splide__arrows your-class-arrows',
// 			arrow: 'splide__arrow your-class-arrow',
// 			prev: 'splide__arrow--prev your-class-prev',
// 			next: 'splide__arrow--next your-class-next',
// 		},
// 	})
// 	myService.mount()
// }

var serviceSlider = new Swiper('.serviceSlider', {
	slidesPerView: 3,
	spaceBetween: 37,
	loop: true,

	navigation: {
		nextEl: '.service-next',
		prevEl: '.service-prev',
	},
	breakpoints: {
		50: {
			slidesPerView: 1,
			spaceBetween: 10,
		},
		300: {
			slidesPerView: 1,
			spaceBetween: 10,
		},
		640: {
			slidesPerView: 1,
			spaceBetween: 10,
		},
		800: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		1300: {
			slidesPerView: 3,
			spaceBetween: 37,
		},
	},
})

const ballObserver = new IntersectionObserver(
	entries => {
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
				duration: 2000,
				delay,
				easing: 'easeInOutSine',
			})

			ballObserver.unobserve(ball) // ⬅️ ключевая строка
		})
	},
	{ threshold: 0.3 }
)

document.querySelectorAll('.ball').forEach(ball => {
	ballObserver.observe(ball)
})

const aboutObserver = new IntersectionObserver(
	entries => {
		entries.forEach(entry => {
			if (!entry.isIntersecting) return

			const item = entry.target

			const subtitle = item.querySelector('.about__subtitle')
			const title = item.querySelector('.about__title')
			const text = item.querySelector('.about__text')
			const numberTitle = item.querySelector('.about__number')
			const button = item.querySelector('.about__button')

			// Subtitle
			if (subtitle) {
				anime({
					targets: subtitle,
					translateY: [30, 0],
					opacity: [0, 1],
					duration: 800,
					easing: 'easeOutExpo',
				})
			}

			// Title
			if (title) {
				anime({
					targets: title,
					translateY: [30, 0],
					opacity: [0, 1],
					duration: 1000,
					delay: 200,
					easing: 'easeOutExpo',
				})
			}

			// Text
			if (text) {
				anime({
					targets: text,
					translateY: [30, 0],
					opacity: [0, 1],
					duration: 1200,
					delay: 400,
					easing: 'easeOutExpo',
				})
			}

			// Button
			if (button) {
				anime({
					targets: button,
					scale: [0.8, 1],
					opacity: [0, 1],
					duration: 1000,
					delay: 600,
					easing: 'easeOutExpo',
				})
			}

			if (numberTitle) {
				anime({
					targets: numberTitle,
					scale: [0.8, 1],
					opacity: [0, 1],
					duration: 1000,
					delay: 300,
					easing: 'easeOutExpo',
				})
			}

			// Убираем наблюдение, чтобы анимация не повторялась
			aboutObserver.unobserve(item)
		})
	},
	{ threshold: 0.3 }
)

// Наблюдаем все about__item
document.querySelectorAll('.about__item').forEach(item => {
	aboutObserver.observe(item)
})

var testimonialSlider = new Swiper('.testimonialSlider', {
	slidesPerView: 2,
	spaceBetween: 20,
	navigation: {
		nextEl: '.testimonial__navigation-next',
		prevEl: '.testimonial__navigation-prev',
	},
	breakpoints: {
		50: {
			slidesPerView: 1,
			spaceBetween: 20,
		},
		300: {
			slidesPerView: 1,
			spaceBetween: 20,
		},
		640: {
			slidesPerView: 1,
			spaceBetween: 20,
		},
		800: {
			slidesPerView: 1,
			spaceBetween: 20,
		},
		1300: {
			slidesPerView: 2,
			spaceBetween: 37,
		},
	},
})

const completedObserver = new IntersectionObserver(
	entries => {
		entries.forEach(entry => {
			if (!entry.isIntersecting) return

			const section = entry.target
			const title = section.querySelector('.completed__title')
			const items = section.querySelectorAll('.completed__item')

			// Заголовок
			// Заголовок
			anime({
				targets: title,
				translateY: [30, 0],
				opacity: [0, 1],
				duration: 1000,
				easing: 'easeOutExpo',
			})
			anime
				.timeline()
				.add({
					targets: '.completed__item::after',
					opacity: [0, 1],
					duration: 600,
				})
				.add({
					targets: '.completed__item',
					translateY: [40, 0],
					opacity: [0, 1],
					delay: anime.stagger(200),
				})

			completedObserver.unobserve(section)
		})
	},
	{ rootMargin: '-50% 0px -50% 0px' }
)

completedObserver.observe(document.querySelector('.completed'))

function startTestimonialAnimations() {
	anime({
		targets: '.testimonial__subtitle',
		translateY: [30, 0],
		opacity: [0, 1],
		duration: 1000,
		delay: 600,
		easing: 'easeOutExpo',
	})

	anime({
		targets: '.testimonial__titles',
		translateY: [30, 0],
		opacity: [0, 1],
		duration: 2500,
		delay: 800,
		easing: 'easeOutExpo',
	})
}

// Пробуем Intersection Observer
if ('IntersectionObserver' in window) {
	const observer = new IntersectionObserver(
		entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					startTestimonialAnimations()
					observer.unobserve(entry.target)
				}
			})
		},
		{ threshold: 0.1 }
	)

	const testimonialSection = document.querySelector('.testimonial')
	if (testimonialSection) {
		observer.observe(testimonialSection)

		// Резервный запуск через 5 секунд на случай, если пользователь не проскроллит
		setTimeout(() => {
			if (!testimonialSection.classList.contains('animated')) {
				startTestimonialAnimations()
				testimonialSection.classList.add('animated')
			}
		}, 5000)
	}
} else {
	// Fallback для старых браузеров
	window.addEventListener('scroll', function () {
		const testimonialSection = document.querySelector('.testimonial')
		const rect = testimonialSection.getBoundingClientRect()

		if (rect.top < window.innerHeight && !testimonialSection.classList.contains('animated')) {
			startTestimonialAnimations()
			testimonialSection.classList.add('animated')
		}
	})
}

// ==================== ОСНОВНАЯ ИНИЦИАЛИЗАЦИЯ ====================
document.addEventListener('DOMContentLoaded', () => {
	Menu.init()
	PageAnimations.init()
	ScrollAnimations.init()
	const sliders = Sliders.init()

	// Экспорт слайдеров в глобальную область видимости при необходимости
	window.appSliders = sliders
})

// В JavaScript
const NewsletterAnimation = (() => {
	function initWaveParticles() {
		const newsletter = document.querySelector('.newsletter')
		if (!newsletter) return

		// Создаем частицы
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
      `
			newsletter.appendChild(particle)

			// Анимация частицы
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

		// Анимация появления контента
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
					targets: '.line',
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
					complete: () => {
						initInputAnimation()
					},
				},
				'-=400'
			)
	}

	function initInputAnimation() {
		const input = document.querySelector('.newsletter__input')
		const button = document.querySelector('.newsletter__button')

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

		// Эффект пульсации кнопки
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
				easing: 'easeOutBack',
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

	return { init: initWaveParticles }
})()

// В DOMContentLoaded
NewsletterAnimation.init()

// JavaScript для анимаций футера
const FooterAnimation = (() => {
	function init() {
		// Обновляем год
		updateCurrentYear()

		// Инициализируем анимации
		initScrollAnimations()
		initHoverEffects()
		initScrollToTop()

		// Создаем частицы в футере
		createFooterParticles()
	}

	function updateCurrentYear() {
		const yearElement = document.querySelector('.current-year')
		if (yearElement) {
			yearElement.textContent = new Date().getFullYear()
		}
	}

	function initScrollAnimations() {
		const observerOptions = {
			threshold: 0.1,
			rootMargin: '0px 0px -50px 0px',
		}

		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const element = entry.target

					// Добавляем задержку для каждого элемента
					const delay = element.dataset.delay || 0

					setTimeout(() => {
						element.classList.add('visible')

						// Особые анимации для разных типов элементов
						if (element.classList.contains('footer__item')) {
							animateLinks(element)
						}
					}, delay)
				}
			})
		}, observerOptions)

		// Наблюдаем все элементы с анимацией
		document.querySelectorAll('[data-animate]').forEach(element => {
			observer.observe(element)
		})
	}

	function animateLinks(container) {
		const links = container.querySelectorAll('.footer__link')
		links.forEach((link, index) => {
			anime({
				targets: link,
				opacity: [0, 1],
				translateX: [-20, 0],
				delay: index * 100,
				duration: 500,
				easing: 'easeOutExpo',
			})
		})
	}

	function initHoverEffects() {
		// Эффект при наведении на лого
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
					easing: 'easeOutBack',
				})
			})
		}

		// Эффект для соц. иконок
		document.querySelectorAll('.social-icon').forEach(icon => {
			icon.addEventListener('mouseenter', () => {
				anime({
					targets: icon,
					scale: 1.1,
					rotate: [0, 360],
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

		if (scrollBtn) {
			// Показываем кнопку при скролле
			window.addEventListener('scroll', () => {
				if (window.pageYOffset > 300) {
					scrollBtn.classList.add('visible')
				} else {
					scrollBtn.classList.remove('visible')
				}
			})

			// Скролл наверх при клике
			scrollBtn.addEventListener('click', () => {
				anime({
					targets: scrollBtn,
					scale: 0.8,
					rotate: 360,
					duration: 300,
					easing: 'easeOutBack',
					complete: () => {
						window.scrollTo({
							top: 0,
							behavior: 'smooth',
						})
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
	}

	function createFooterParticles() {
		const footer = document.querySelector('.footer')
		if (!footer) return

		// Создаем контейнер для частиц
		const particlesContainer = document.createElement('div')
		particlesContainer.className = 'footer-particles'
		particlesContainer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    `
		footer.appendChild(particlesContainer)

		// Создаем частицы
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
      `
			particlesContainer.appendChild(particle)

			// Анимация частицы
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

	return { init }
})()

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
	FooterAnimation.init()
})
