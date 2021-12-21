

document.addEventListener('DOMContentLoaded', () => {
	// polyfill flat
	if (!Array.prototype.flat) Array.prototype.flat = function () {
		return (function f(arr) {
			return arr.reduce(
				(a, v) =>
					Array.isArray(v)
						? a.concat(f(v))
						: a.concat(v)
				, []
			)
		})(this)
	};


	// Очистка корзины

	function clearBasketWrap() {
		function clearBasket(target, wrap, clearElem, clearBlocks, myCont) {
			const targetBtn = document.querySelector(target);
			const wrapBlock = document.querySelector(wrap);

			if (targetBtn) {
				targetBtn.addEventListener('click', (e) => {
					e.preventDefault();
					wrapBlock.innerHTML = '';
					countItemsBasket(clearElem, clearBlocks, myCont);
				})
			}

		}
		clearBasket('.clearBasket', '.g-card1__wrap-sea-cont', '.g-card2__column', '.basket__elem > span', '.basket__elem > p');
		clearBasket('.clearBasketSM', '.header__basket-prod-wrap', '.products__elem-basket', '.header__basket-body-val', '.header__basket-body-cont');
	}
	clearBasketWrap();


	// Удаление товара корзины 

	function removeElemBasketWrap() {
		function removeElemBasket(target, wrap, clearElem, clearBlocks, myCont) {
			const targetBtns = document.querySelectorAll(target);
			const wrapBlocks = document.querySelectorAll(wrap);
			if (targetBtns.length >= 1) {
				targetBtns.forEach((targetBtn, i) => {
					targetBtn.addEventListener('click', (e) => {
						if (e.target.closest(target) && e.target.closest(wrap)) {
							wrapBlocks[i].remove();
							countItemsBasket(clearElem, clearBlocks, myCont);
						}
					})
				})

			}

		}
		removeElemBasket('.products__body-close', '.products__elem-basket', '.products__elem-basket', '.header__basket-body-val', '.header__basket-body-cont');
		removeElemBasket('.g-card1__set-cansel', '.g-card2__column', '.g-card2__column', '.basket__elem > span', '.basket__elem > p');
	}
	removeElemBasketWrap();

	// клик на корзину

	const basketOpenWrap = () => {
		const basketOpen = (myTarget, myWrap, myClose) => {
			const tar = document.querySelector(myTarget);
			const wrap = document.querySelector(myWrap);

			document.addEventListener('click', (e) => {
				if (e.target.closest(myTarget)) {
					if (wrap.classList.contains('active')) {
						wrap.classList.remove('active')
					} else {
						wrap.classList.add('active')
					}
				}
				if (!e.target.closest(myWrap) && !e.target.closest(myTarget) && !e.target.closest(myClose)) {
					wrap.classList.remove('active');
				}
			})

			document.addEventListener('keydown', (e) => {
				if (e.code == 'Escape') {
					wrap.classList.remove('active')
				}
			})



		}
		basketOpen('.header__basket-wrap', '.header__basket-prod', '.products__body-close');
	}

	basketOpenWrap();

	// Подсчет кол-ва элементов в корзине

	const countItemsBasket = (myElems, myBlock, myCont) => {
		let elems = document.querySelectorAll(myElems);
		let block = document.querySelector(myBlock);
		let cont = document.querySelector(myCont);

		if (elems !== null && block !== null) {
			if (document.querySelectorAll(myElems).length >= 1) {
				block.textContent = elems.length + ' ';
			} else {
				block.textContent = '0' + ' ';
			}

			if (String(elems.length).split('')[String(elems.length).length - 1] == 1) {
				// console.log('Товар')
				cont.innerHTML = 'товар ';
			}
			else if (String(elems.length).split('')[String(elems.length).length - 1] == 2 || String(elems.length).split('')[String(elems.length).length - 1] == 3 || String(elems.length).split('')[String(elems.length).length - 1] == 4) {
				// console.log('Товара')
				cont.innerHTML = 'товара ';
			} else {
				// console.log('Товаров')
				cont.innerHTML = 'товаров ';
			}

		}



	}

	countItemsBasket('.products__elem-basket', '.header__basket-body-val', '.header__basket-body-cont');
	countItemsBasket('.g-card2__column', '.basket__elem > span', '.basket__elem > p');



	// Наращивание кол-ва товаров при клике и подсчет

	const productRampUp = (myWrap, myElems, myFullValue) => {
		let wrap = document.querySelector(myWrap);
		let elems = document.querySelectorAll(myElems);
		let fullValue = document.querySelectorAll(myFullValue);

		let rez;
		let rez2;

		if (wrap) {
			wrap.addEventListener('click', (e) => {
				// e.preventDefault();
				if (e.target.classList.contains('less')) {
					elems.forEach((el, i) => {
						if (el.getAttribute('data-card-inp') == e.target.getAttribute('data-less')) {
							if (el.value > 1) {
								+el.value--;
								if (fullValue.length >= 1 && fullValue[i] !== undefined) {
									rez2 = fullValue[i].getAttribute('data-vvl').replace(/\s/g, '');
									fullValue[i].innerHTML = prettify((+fullValue[i].innerHTML.replace(/\s/g, '') - +rez2 + ' '));
								}

							}
						}
					})
				}
				if (e.target.classList.contains('more')) {
					elems.forEach((el, i) => {
						// if (fullValue.length >= 1) {
						// 	rez = +fullValue[i].getAttribute('data-my-price');
						// }

						if (el.getAttribute('data-card-inp') == e.target.getAttribute('data-more')) {
							+el.value++;
							if (fullValue.length >= 1 && fullValue[i] !== undefined) {
								// console.log(fullValue[i])
								rez2 = fullValue[i].getAttribute('data-vvl').replace(/\s/g, '');
								// let v = fullValue[i].innerHTML.split('')
								// let v2 = v.filter(el => el != ' ').join('')
								// console.log(v)
								// console.log(v2)
								fullValue[i].innerHTML = prettify((+fullValue[i].innerHTML.replace(/\s/g, '') + +rez2 + ' '));
							}

						}
					})
				}
			})

			wrap.addEventListener('input', (e) => {
				elems.forEach((el, i) => {
					if (e.target.getAttribute('data-card-inp-val') == i) {
						// console.log(e.target.value)
						// console.log(fullValue[i])
						if (fullValue.length >= 1 && fullValue[i] !== undefined) {
							rez2 = fullValue[i].getAttribute('data-vvl').replace(/\s/g, '');
							fullValue[i].innerHTML = prettify(+rez2 * +e.target.value + ' ');
						}
					}
				})



			})


		}
	}

	productRampUp('.g-card1__wrap-sea', '.g-product-quantity__inp-s', '.g-card1__set-bottom > span');
	productRampUp('.g-card1__wrap-sea2', '.g-product-quantity__inp-2', '.g-card1__set-bottom > span');
	productRampUp('.g-card1__wrap-sea3', '.g-product-quantity__inp-3', '.g-card1__set-bottom > span');
	productRampUp('.g-card1__wrap-sea4', '.g-product-quantity__inp-4', '.g-card1__set-bottom > span');

	// Конец Наращивания кол-ва товаров при клике и подсчета

	// Функция вставки проблема между цифрами

	function prettify(num) {
		var n = num.toString();
		return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
	}

	// end 

	// клик на поиск

	const inpSearch = () => {
		let headerSearchInpEl = document.querySelector('.header__search-inp-el');
		let headerSearchInp = document.querySelector('.header__search-inp');
		let headerSearch = document.querySelector('.header__search');
		let headerCenter = document.querySelector('.header__center');

		let headerSearchBlock = document.querySelector('.header__search-block');

		function closeSearchBlock() {
			headerSearchBlock.classList.remove('active');
		}

		document.addEventListener('click', (e) => {
			// e.preventDefault();

			if (e.target.closest('.header__search-inp-el')) {
				headerSearchInpEl.classList.add('active');
				headerSearchInp.classList.add('active');
				headerCenter.classList.add('active');
				headerSearch.classList.add('active');
			}

			if (!e.target.closest('.header__search')) {
				headerSearchInpEl.classList.remove('active');
				headerSearchInp.classList.remove('active');
				headerCenter.classList.remove('active');
				headerSearch.classList.remove('active');

				closeSearchBlock()
			}

			document.addEventListener('keydown', (e) => {
				if (e.code == 'Escape') {
					headerSearchInpEl.classList.remove('active');
					headerSearchInp.classList.remove('active');
					headerCenter.classList.remove('active');
					headerSearch.classList.remove('active');

					closeSearchBlock()
				}
			})

		})
	}

	inpSearch();


	const inputSerachBlock = () => {
		let serachInp = document.querySelector('.header__search-inp > input');
		let headerSearchBlock = document.querySelector('.header__search-block');

		serachInp.addEventListener('change', (e) => {
			headerSearchBlock.classList.add('active');
		})

	}

	inputSerachBlock();




	// Перемещение элементов

	const movingElements = (myWrapWhere, myWrapWhereFrom, position, myElem, positionBack) => {
		let wrapWhere = document.querySelector(myWrapWhere);
		let wrapWhereFrom = document.querySelector(myWrapWhereFrom);
		let elem = document.querySelector(myElem);

		if (wrapWhere && elem) {
			if (document.documentElement.clientWidth <= 992) {
				wrapWhere.insertAdjacentElement(position, elem);
			} else {
				wrapWhereFrom.insertAdjacentElement(positionBack, elem);
			}
		}

	}

	movingElements('.header__bottom-wrap', '.header__block-wrap', 'beforeend', '.header__burger', 'afterbegin');
	movingElements('.header__bottom-wrap', '.header__block-wrap', 'beforeend', '.header__catalog', 'afterbegin');
	movingElements('.header__center', '.header__info-wrap', 'beforeend', '.header__info-autoriz', 'afterbegin');

	window.addEventListener('resize', function () {
		movingElements('.header__bottom-wrap', '.header__block-wrap', 'beforeend', '.header__burger', 'afterbegin');
		movingElements('.header__bottom-wrap', '.header__block-wrap', 'beforeend', '.header__catalog', 'afterbegin');
		movingElements('.header__center', '.header__info-wrap', 'beforeend', '.header__info-autoriz', 'afterbegin');
	})

	// end перемещение элементов

	// wrapWhere - куда вставим на мобильных
	// wrapWhereFrom - куда вставим обратно на больших экранах
	// position - позиция вставки на мобильных
	// positionBack - позиция вставки на больших
	// elem - элемент который вырезаем


	// tabs

	const myTabs = () => {

		const tabs = (myTargets, myContents) => {
			let targets = document.querySelectorAll(myTargets);
			let contents = document.querySelectorAll(myContents);

			if (targets.length > 1 && contents.length > 1) {
				targets.forEach((target, i) => {
					target.addEventListener('click', (e) => {
						e.preventDefault();
						targets.forEach(elem => {
							if (e.target == elem || e.target.parentNode == elem) {
								hideElems();
								showElems(i);
							}
						})
					});
				});

				function hideElems() {
					targets.forEach(target => {
						target.classList.remove('active');
					});
					contents.forEach(cont => {
						cont.classList.remove('showS');
						cont.classList.add('hideS');
					});
				}

				function showElems(i = 0) {
					targets[i].classList.add('active');
					contents[i].classList.remove('hideS');
					contents[i].classList.add('showS');
				}

				hideElems();
				showElems();
			}

		};

		tabs('.top-slider__tabs-elem', '.tabs__content-item');

	};

	myTabs();

	//end tabs


	// accordion

	const myProlapse = () => {

		const prolapse = (myTargets, myContents, myClose = false) => {
			let targets = document.querySelectorAll(myTargets);
			let contents = document.querySelectorAll(myContents);
			let close = document.querySelector(myClose);

			// console.log(myTargets)
			// console.log(myContents)

			targets.forEach(target => {
				target.addEventListener('click', (e) => {
					contents.forEach(cont => {
						if (target.getAttribute('data-linkValue') == cont.getAttribute('data-ulValue')) {
							if (cont.style.maxHeight) {
								cont.style.maxHeight = null;
								target.classList.remove('active')
							} else {
								cont.style.maxHeight = cont.scrollHeight + "px";
								target.classList.add('active')
							}
						}
						if (close) {
							close.addEventListener('click', (e) => {
								cont.style.maxHeight = null;
							});
						}
					});
				});
			});

		}

		prolapse('.questions__elem', '.questions__sub');
		prolapse('.nameS__targ', '.nameS__block');

	}

	myProlapse();

	// end accordion


	// Imask на мобильный телефон
	const telInputs = document.querySelectorAll('input[type="tel"]')

	const crateMaskForTel = (inp) => IMask(inp, { mask: '+{7}(000)000-00-00' })

	telInputs?.forEach(crateMaskForTel)


	// Вызовы модалок
	let modalElem;

	document.addEventListener('click', (e) => {
		// console.log(e.target)
		if (e.target.closest('[data-btn-modal]')) {
			e.preventDefault();
			const datTarget = e.target.closest('[data-btn-modal]').dataset.btnModal;

			switch (datTarget) {

				case 'creatingClient':
					modalElem = $plugins.modal({
						title: ' ',
						closable: true,
						width: '530px',
						content: $globalHtmlElements.creatingClient
					})
					setTimeout(() => modalElem.open(), 300);
					countItemsBasket();
					break;

				case 'videoModal':
					modalElem = $plugins.modal({
						title: 'Видео обзор',
						closable: true,
						width: '800px',
						content: $globalHtmlElements.videoModal
					})
					setTimeout(() => modalElem.open(), 300);
					countItemsBasket();
					break;

				case 'getConsultation':
					modalElem = $plugins.modal({
						title: ' ',
						closable: true,
						width: '585px',
						content: $globalHtmlElements.getConsultation
					})
					setTimeout(() => {
						const _parentModalBody = document.querySelector('.vmodal__body')
						const _inputSearch = _parentModalBody.querySelector('input[type="tel"]')
						crateMaskForTel(_inputSearch)

						modalElem.open(), 300
					});
					countItemsBasket();
					break;

				default:
					return;
			}
		}
	})
	let $globalHtmlElements = {};
	window.$globalHtmlElements = $globalHtmlElements;

	// Модальное окно для Развернутого отзыва
	$globalHtmlElements.creatingClient = `
			<div class="basketOK">
				<div class="basketOK__img">
					<img class="img" src="web/images/content/basketOK.png", alt="slide__img">
				</div>
				<div class="basketOK__body">
					<h3 class=".title-6">Товар добавлен в корзину</h3>
				</div>
				<div class="basketOK__elems">
					<a href="#" class="basketOK__elem">продолжить покупки</a>
					<a href="#" class="basketOK__elem">Перейти в корзину</a>
				</div>
			</div>
		`

	// Модальное окно для Видео
	$globalHtmlElements.videoModal = `
	<div class="videoReviews__column"> <a class="videoReviews__elem" href="#">
		<div class="videoReviews__img">
			<iframe width="100%" height="500" src="https://www.youtube.com/embed/MnrJzXM7a6o" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
		</div>
	</div>
		`

	// Модальное окно для получения консультации
	$globalHtmlElements.getConsultation = `
		<div class="getConsult">
			<div class="questions">
				<form class="questions__right"> 
					<h2 class="title-3">Нужна консультация?</h2>
					<p>Подберем оборудование для маркировки на любой бюджет! Доставка по все РФ</p>
					<label class="g-label">
					<input type="text" placeholder="Ваше имя" name="name" required>
					<svg class="svg-sprite-icon icon-men">
						<use xlink:href="web/images/sprite/symbol/sprite.svg#men"></use>
					</svg>
					</label>
					<label class="g-label">
					<input type="tel" placeholder="Номер телефона" name="phone" required>
					<svg class="svg-sprite-icon icon-phone">
						<use xlink:href="web/images/sprite/symbol/sprite.svg#phone"></use>
					</svg>
					</label>
					<div class="questions__check myInp">
					<input type="checkbox" id="check1">
					<label for="check1">Отправляя форму вы принимаете условия обработки <a class="g-link g-link-tdu" href="#">персональных данных</a></label>
					</div>
					<div class="questions__btn"> 
					<button class="button button-blank">Перезвоните мне</button>
					</div>
				</form>
			</div>
		</div>
		`
	// end modal



	// выбор города

	const innerCity = () => {
		let sortEl = document.querySelector('.sort__el > .label > .mySelect');
		let hid = document.querySelector('.hid');

		if (sortEl && hid) {
			sortEl.addEventListener('change', (e) => {
				if (e.target.value == 9999) {
					hid.classList.add('active')
				} else {
					hid.classList.remove('active')
				}
			})
		}

	}

	innerCity();

	// Фиксация шапки

	let headerInfo = document.querySelector('.header__info');
	let headerBlock = document.querySelector('.header__block')

	window.addEventListener('scroll', (e) => {

		if (window.pageYOffset > 50) {
			headerInfo.classList.add('active');
			headerBlock.classList.add('active');
		} else {
			headerInfo.classList.remove('active');
			headerBlock.classList.remove('active');
		}

	});


	// end Фиксации шапки


	// клик на услуги и подбор решения

	const funcAddClass = (myTarg, myWrap, myTargetWrap) => {
		let targ = document.querySelector(myTarg);
		let wrap = document.querySelector(myWrap);
		let targetWraps = document.querySelectorAll(myTargetWrap);

		if (targ !== null && targ !== undefined) {

			targetWraps.forEach(el => {
				el.addEventListener('click', (e) => {
					e.preventDefault();
				})
			})


			document.addEventListener('click', (e) => {
				// e.preventDefault();
				if (e.target.closest(myTarg)) {
					if (wrap.classList.contains('active')) {
						wrap.classList.remove('active');
					} else {
						wrap.classList.add('active');
					}

				}
				// if (e.target.closest(myTarg) && wrap.classList.contains('active')) {
				// 	wrap.classList.remove('active');
				// }
				if (!e.target.closest(myWrap) && !e.target.closest(myTarg)) {
					wrap.classList.remove('active');
				}
			})

			document.addEventListener('keydown', (e) => {
				if (e.code == 'Escape') {
					wrap.classList.remove('active')
				}
			})

		}

	}

	funcAddClass('.topmenu__item-link-services', '.submenu', '.topmenu__item-link-js');
	funcAddClass('.topmenu__item-link-selecting', '.submenu2', '.topmenu__item-link-js');


	// клик на категории

	const funcAddClass2 = (myTarg, myWrap) => {
		let targ = document.querySelector(myTarg);
		let wrap = document.querySelector(myWrap);

		if (targ !== null && targ !== undefined) {

			document.addEventListener('click', (e) => {
				if (e.target.closest(myTarg) && window.innerWidth > 1199) {
					if (wrap.classList.contains('active')) {
						wrap.classList.remove('active');
						targ.classList.remove('active');
					} else {
						wrap.classList.add('active');
						targ.classList.add('active');
					}

				}

				if (!e.target.closest(myWrap) && !e.target.closest(myTarg) && window.innerWidth > 1199) {
					wrap.classList.remove('active');
					targ.classList.remove('active');
				}
			})

			document.addEventListener('keydown', (e) => {
				if (e.code == 'Escape') {
					wrap.classList.remove('active');
					targ.classList.remove('active');
				}
			})

		}

	}

	funcAddClass2('.header__catalog', '.submenu3');

	// tooltips

	let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
	let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
		return new bootstrap.Tooltip(tooltipTriggerEl)
	})


});




// скрыть куки

let coocie = document.querySelector('.coocie');
let coocieTarg = document.querySelector('.coocieTarg');

if (coocie) {
	coocieTarg.addEventListener('click', (e) => {
		e.preventDefault();

		coocie.classList.add('active');
	})
}


// Условие с кнопкой-видео

let gCardLine = document.querySelector('.g-card__line');
let slid = document.querySelector('.slid');

if (gCardLine == null && slid) {
	slid.classList.add('full')
}


// Скрыть слайдер если нет картинок

let galleryThumbs2WrapElems = document.querySelectorAll('.gallery-thumbs2-wrap > .swiper-slide');

if (slid !== null) {
	if (galleryThumbs2WrapElems.length == 0) {
		slid.classList.add('slideNone')
	} else {
		slid.classList.remove('slideNone')
	}
}




// Заглушка в слайдере если нет картинки

let galleryTop2WrElems = document.querySelectorAll('.gallery-top2-wr > .swiper-slide > .slider-img > .img');
let galleryTop2OpenMagn = document.querySelectorAll('.gallery-top2-wr > .open-magn');


if (galleryTop2WrElems && galleryTop2OpenMagn) {
	galleryTop2WrElems.forEach((el, i) => {

		if (el.src.length <= 34) {
			// el.style.cssText = "background-image: url(\"./web/images/content/articles-1.png\");"
			el.src = 'web/images/content/articles-1.png';
			galleryTop2OpenMagn[i].setAttribute('href', 'web/images/content/articles-1.png')
		}

	})
}

const inpBorder = (myWrap) => {
	let wrap = document.querySelector(myWrap);

	if (wrap) {
		let myInp3 = wrap.querySelectorAll('.myInp3');
		myInp3.forEach((el, i) => {

			el.addEventListener('change', (e) => {

				myInp3.forEach(elem => {
					elem.classList.remove('act')
				})

				myInp3[i].classList.add('act')
			})
		})
	}
}

inpBorder('.formation__delivery-wrap-1');
inpBorder('.formation__delivery-wrap-2');
inpBorder('.formation__delivery-wrap-3');

// hover catalog__item

let catalogBlock = document.querySelectorAll('.catalog__block');
let catalogItem = document.querySelectorAll('.catalog__item');

if (catalogBlock) {
	catalogBlock.forEach((el, i) => {
		el.addEventListener('mouseover', (e) => {
			catalogItem[i].classList.add('active');
		})
		el.addEventListener('mouseout', (e) => {
			catalogItem[i].classList.remove('active');
		})
	})
}

// Клик на "Раскрыть все"

let nameSBubs = document.querySelector('.nameS__subs');
let nameSTarg = document.querySelector('.nameS__targ');

if (nameSBubs) {
	nameSBubs.addEventListener('click', (e) => {
		// console.log(e.target)
		if (e.target.closest('.nameS__targ') && nameSTarg.classList.contains('active')) {
			nameSTarg.innerHTML = `
			<span>Скрыть<br>все</span>
		      <svg class="svg-sprite-icon icon-d">
		        <use xlink:href="web/images/sprite/symbol/sprite.svg#d"></use>
		      </svg>
			`;
		}
		else if (e.target.closest('.nameS__targ') && !nameSTarg.classList.contains('active')) {
			nameSTarg.innerHTML = `
			<span>Раскрыть<br>все</span>
		      <svg class="svg-sprite-icon icon-d">
		        <use xlink:href="web/images/sprite/symbol/sprite.svg#d"></use>
		      </svg>
			`;
		}

	})
}



$(document).ready(function () {


	var swiper = new Swiper(".mySwiper", {
		direction: "vertical",
		slidesPerView: 1,
		spaceBetween: 30,
		mousewheel: true,
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
		autoplay: {
			delay: 4000,
		},
	});


	var swiper2 = new Swiper('.top-slider__swiper', {
		// autoHeight: true,
		slidesPerView: 5,
		spaceBetween: 10,
		// loop: true,
		observer: true,
		observeParents: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
				spaceBetween: 10,
			},
			576: {
				slidesPerView: 2,
				spaceBetween: 10,
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 10,
			},
			1200: {
				slidesPerView: 4,
				spaceBetween: 10,
			},
			1601: {
				slidesPerView: 5,
				spaceBetween: 10,
			},
		}
		// autoplay: {
		// 	delay: 5000,
		// },
	});


	var swiper4 = new Swiper(".clients-slider", {
		slidesPerView: 6,
		spaceBetween: 10,
		// loop: true,
		observer: true,
		observeParents: true,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
				spaceBetween: 10,
			},
			576: {
				slidesPerView: 2,
				spaceBetween: 10,
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 10,
			},
			1200: {
				slidesPerView: 4,
				spaceBetween: 10,
			},
			1601: {
				slidesPerView: 6,
				spaceBetween: 10,
			},
		}
	});

	var swiper5 = new Swiper('.g-card-slider', {
		// autoHeight: true,
		slidesPerView: 3,
		spaceBetween: 10,
		// loop: true,
		observer: true,
		observeParents: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		// breakpoints: {
		// 	320: {
		// 		slidesPerView: 1,
		// 		spaceBetween: 10,
		// 	},
		// 	576: {
		// 		slidesPerView: 2,
		// 		spaceBetween: 10,
		// 	},
		// 	992: {
		// 		slidesPerView: 3,
		// 		spaceBetween: 10,
		// 	},
		// 	1200: {
		// 		slidesPerView: 4,
		// 		spaceBetween: 10,
		// 	},
		// 	1601: {
		// 		slidesPerView: 5,
		// 		spaceBetween: 10,
		// 	},
		// }
		// autoplay: {
		// 	delay: 5000,
		// },
	});

	var galleryThumbs2 = new Swiper('.gallery-thumbs2', {
		spaceBetween: 10,
		slidesPerView: 3,
		freeMode: true,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		breakpoints: {
			320: {
				slidesPerView: 2,
				spaceBetween: 10,
			},
			576: {
				slidesPerView: 3,
				spaceBetween: 10,
			},
			768: {
				slidesPerView: 3,
				spaceBetween: 10,
			},
			1200: {
				slidesPerView: 3,
				spaceBetween: 10,
			},
			1601: {
				slidesPerView: 3,
				spaceBetween: 10,
			},
		}
	});

	var galleryTop2 = new Swiper('.gallery-top2', {
		autoHeight: true,
		loop: true,
		observer: true,
		observeParents: true,
		spaceBetween: 10,
		thumbs: {
			swiper: galleryThumbs2
		}
	});

	$('.open-magn').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		closeBtnInside: false,
		fixedContentPos: true,
		mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
		image: {
			verticalFit: true
		},
		zoom: {
			enabled: true,
			duration: 300 // don't foget to change the duration also in CSS
		}
	});


});

/* Прокручивает страницу вверх при нажатии на кнопку */
// $(window).scroll(function () {
// 	var height = $(window).scrollTop();
// 	if (height > 100) {
// 		$('#back2Top').fadeIn();
// 	} else {
// 		$('#back2Top').fadeOut();
// 	}
// });
// $(document).ready(function () {
// 	$("#back2Top").click(function (event) {
// 		event.preventDefault();
// 		$("html, body").animate({ scrollTop: 0 }, "slow");
// 		return false;
// 	});

// });

function scrollTo(to, duration = 700) {
	const
		element = document.scrollingElement || document.documentElement,
		start = element.scrollTop,
		change = to - start,
		startDate = +new Date(),
		// t = current time
		// b = start value
		// c = change in value
		// d = duration
		easeInOutQuad = function (t, b, c, d) {
			t /= d / 2;
			if (t < 1) return c / 2 * t * t + b;
			t--;
			return -c / 2 * (t * (t - 2) - 1) + b;
		},
		animateScroll = function () {
			const currentDate = +new Date();
			const currentTime = currentDate - startDate;
			element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration));
			if (currentTime < duration) {
				requestAnimationFrame(animateScroll);
			}
			else {
				element.scrollTop = to;
			}
		};
	animateScroll();
}

document.addEventListener('DOMContentLoaded', function () {
	let btn = document.querySelector('#back2Top');
	window.addEventListener('scroll', function () {
		// Если прокрутили дальше 599px, показываем кнопку
		if (pageYOffset > 700) {
			btn.classList.add('showS');
			// Иначе прячем
		} else {
			btn.classList.remove('showS');
		}
	});

	// При клике прокручиываем на самый верх
	btn.onclick = function (click) {
		click.preventDefault();
		scrollTo(0, 400);
	}
});