"use sttrict";

const formatNumber = (x) => {//Форматирование числа(добавление рязрядности)
	return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, " ");
};

const totalPriceWrapper = document.querySelector("#total-price");
const basket = document.querySelector("#basket");
const ACTION = {
	PLUS: "plus",
	MINUS: "minus"
};

const getItemSubTotalPrice = (input) =>
	Number(input.value) * Number(input.dataset.price);

const setTotalPriceValue = (value) => {//Запись значения Итого
	totalPriceWrapper.textContent = formatNumber(value);
	totalPriceWrapper.dataset.value = value;
};

const init = () => {//Главная функция
	let totalCost = 0;
	[...document.querySelectorAll(".basket-item")].forEach(basketItem => {
		totalCost += getItemSubTotalPrice(basketItem.querySelector(".input"));
		//Значение из инпута, умноженное на значение из атрибута data
	});

	setTotalPriceValue(totalCost);
};

const calculateSeparateItem = (basketItem, action) => {
	const input = basketItem.querySelector(".input");

	switch (action) {
		case ACTION.PLUS:
			input.value++;

			setTotalPriceValue(Number(totalPriceWrapper.dataset.value) +
				Number(input.dataset.price));

			break;
		case ACTION.MINUS:
			input.value--;

			setTotalPriceValue(Number(totalPriceWrapper.dataset.value) -
				Number(input.dataset.price));
			break;
	}

	basketItem.querySelector(".subtotal").textContent =
		`${formatNumber(getItemSubTotalPrice(input))} руб`;
};

basket.addEventListener("click", (event) => {
	if (event.target.classList.contains("btn-minus")) {
		const input = event.target.closest(".basket-item").querySelector('.input');
		if (Number(input.value) >= 1) {
			calculateSeparateItem(
				event.target.closest(".basket-item"),
				ACTION.MINUS);
		}
	}

	if (event.target.classList.contains("btn-plus")) {
		calculateSeparateItem(
			event.target.closest(".basket-item"),
			ACTION.PLUS);
	}
});

init();