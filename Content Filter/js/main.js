"use strict";

let buttons = document.querySelectorAll(".button"),
	cards = document.querySelectorAll(".card");

function application() {
	function filter(category, items) {
		items.forEach((item) => {
			let isItemFiltered = !item.classList.contains(category);
			let isShowAll = category.toLowerCase() === "all";
			if (isItemFiltered && !isShowAll) {
				//Скрытие элементов, не соответствующих выбранной категории
				item.classList.add("animate");
			} else {
				item.classList.remove("hide");
				item.classList.remove("animate");
			}
		});
	}

	buttons.forEach((button) => {
		button.addEventListener("click", () => {
			let currentCategory = button.dataset.filter;
			filter(currentCategory, cards);
		});
	});

	cards.forEach((card) => {
		card.ontransitionend = function () {
			if (card.classList.contains("animate")) {
				card.classList.add("hide");
			}
		}
	});
}

application();