document.addEventListener("DOMContentLoaded", function () {

	// АНИМАЦИЯ ПРИ ПРОКРУТКЕ СТРАНИЦЫ
	let isScrolling = false;

	window.addEventListener("scroll", throttleScroll, false);

	function throttleScroll(e) {
		if (isScrolling == false) {
			window.requestAnimationFrame(function () {
				scrolling(e);
				isScrolling = false;
			});
		}
		isScrolling = true;
	}

	document.addEventListener("DOMContentLoaded", scrolling, false);

	const oneItem = document.querySelectorAll(".oneItem");

	// первая область видимости (при перезагрузке страницы)
	oneItem.forEach(item => {
		if (isPartiallyVisible(item)) {
			item.classList.add("active");
		}
	})

	function scrolling(e) {

		// oneItem. появляется один элемент
		oneItem.forEach(item => {
			if (isPartiallyVisible(item)) {
				item.classList.add("active");
			}
		})
	}

	// вычислим частично видимые элементы бокса
	function isPartiallyVisible(el) {
		const elementBoundary = el.getBoundingClientRect(),

			top = elementBoundary.top,
			bottom = elementBoundary.bottom,
			height = elementBoundary.height;

		return ((top + height >= 0) && (height + window.innerHeight >= bottom));
	}
});
