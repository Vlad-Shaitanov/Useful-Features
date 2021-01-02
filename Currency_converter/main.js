"use strict";

const multiplier = document.querySelector(".multiplier");
let inputValue;//Значение инпута
const defaultCurrency = [];//Хранилище начальных значений валют

const getCurrentDay = () => {//Текущая дата
	let date = new Date();
	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;//yyy-mm-dd
};

const currency = {//Список валют
	USD: "USD",
	EUR: "EUR",
	RUB: "RUB",
	GBP: "GBP",
};

const urlUsdBase = `https://api.ratesapi.io/api/${getCurrentDay()}?base=${currency.USD}
&symbols=${currency.RUB}`;

const urlEurBase = `https://api.ratesapi.io/api/${getCurrentDay()}?base=${currency.EUR}
&symbols=${currency.RUB}`;

const urlGbpBase = `https://api.ratesapi.io/api/${getCurrentDay()}?base=${currency.GBP}
&symbols=${currency.RUB}`;


const renderContent = (response) => {//Отрисовка таблицы валют
	let { base, rates } = response;
	let content = document.querySelector("#data").innerHTML;
	console.log(response);

	Object
		.keys(rates)
		.map((currency) => {
			content += `
            <tr>
                <td>${base}</td>
                <td>${rates[currency].toFixed(2)}</td>
            </tr>
		`;
			defaultCurrency.push(`${rates[currency].toFixed(2)}`);
		});

	document.querySelector("#data").innerHTML = content;
};

const changeContent = () => {//Пересчет значений при изменении значения в инпуте
	let content = document.querySelector("#data");

	for (let i = 0; i < content.rows.length; i++) {
		for (let k = 0; k < content.rows[i].cells.length - 1; k++) {
			let td = content.rows[i].cells[k + 1];

			let changedNum = (inputValue * defaultCurrency[i]).toFixed(2);
			td.innerHTML = changedNum;

		}
	}
};

async function getData(url) {//Получение данных с сервера
	try {
		let response = await fetch(url);

		if (response.ok) {
			return await response.json();
		}
	} catch (error) {
		throw new Error(error.name);
	}
}

Promise.all([//Обрабатываем сразу все запросы
	getData(urlUsdBase),
	getData(urlEurBase),
	getData(urlGbpBase),
])
	.then(values => {
		values.forEach(renderContent);
	});

multiplier.addEventListener("input", (event) => {
	inputValue = event.target.value;

	changeContent();
});