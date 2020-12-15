"use strict";
//Элементы на странице
const year = document.querySelector("#year"),
	days = document.querySelector("#days"),
	hours = document.querySelector("#hours"),
	minutes = document.querySelector("#minutes"),
	seconds = document.querySelector("#seconds"),
	countdown = document.querySelector("#countdown"),
	preloader = document.querySelector("#preloader");

//Делаем расчеты
const currentYear = new Date().getFullYear();//2020
const nextYear = new Date(`January 01 ${currentYear + 1} 00:00:00`);

year.textContent = currentYear + 1;

function updateCounter() {
	const currentTime = new Date();
	const difference = nextYear - currentTime;
	//Перевод в дни
	const daysLeft = Math.floor(difference / 1000 / 60 / 60 / 24);
	//Часов всего, далее остаток от преобразования в дни, часов осталось
	const hoursLeft = Math.floor(difference / 1000 / 60 / 60) % 24;
	//Минут всего, далее остаток от преобразования в часы, минут осталось
	const minutesLeft = Math.floor(difference / 1000 / 60) % 60;
	//Секунд всего, далее остаток от преобразования в минуты, секунд осталось
	const secondsLeft = Math.floor(difference / 1000) % 60;

	// console.log(daysLeft, hoursLeft, minutesLeft, secondsLeft);

	days.innerText = daysLeft;
	hours.innerText = hoursLeft < 10 ? '0' + hoursLeft : hoursLeft;
	minutes.innerText = minutesLeft < 10 ? '0' + minutesLeft : minutesLeft;
	seconds.innerText = secondsLeft < 10 ? '0' + secondsLeft : secondsLeft;
}

//Запуск расчета 1 раз в секунду
setInterval(updateCounter, 1000);

setTimeout(function () {
	preloader.remove();
	countdown.style.display = "flex";
}, 1000);