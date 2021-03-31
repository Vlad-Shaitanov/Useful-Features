"use strict";

const api = {
	key: "0a446b030f49083e8e17b011c150a6ac",
	baseurl: "http://api.openweathermap.org/data/2.5/",
};

/*Инпут*/
const searchBox = document.querySelector(".search-box");
searchBox.addEventListener("keypress", setQuery);

function setQuery(event) {
	if (event.keyCode === 13) {
		getResults(searchBox.value);
		// console.log(searchBox.value);
	}
}

function getResults(query) {
	fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
		.then(weather => {
			return weather.json();
		})
		.then(displayResults);
}

function displayResults(weather) {
	console.log(weather);

	let city = document.querySelector(".city");
	city.innerHTML = `${weather.name}, ${weather.sys.country}`;

	let date = document.querySelector(".date");
	let currentDay = new Date();
	date.innerHTML = dateBuilder(currentDay);

	let temperature = document.querySelector(".temp");
	temperature.innerHTML = `${roundTemperature(weather.main.temp)}<span>°C</span>`;
	// console.log(roundTemperature(weather.main.temp));
	let weatherElem = document.querySelector(".weather");
	weatherElem.innerHTML = weather.weather[0].main;

	let hiLow = document.querySelector(".hi-low");
	hiLow.innerHTML = `${roundTemperature(weather.main.temp_min)}°C 
	/ ${roundTemperature(weather.main.temp_max)}°C`;
}

function dateBuilder(d) {
	const months = ["January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"];
	const days = ["Sun", "Mon", "Tues", "Wed", "thurs", "Fri", "Sat"];

	let day = days[d.getDay()],
		date = d.getDate(),
		month = months[d.getMonth()],
		year = d.getFullYear();

	return `${day} ${date} ${month} ${year}`;
}

function roundTemperature(num) {
	if (num > 0) {
		return `+${Math.floor(num)}`;
	} else {
		return `-${Math.floor(num)}`;
	}

}