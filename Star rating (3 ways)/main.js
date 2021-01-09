"use strict";

const ratings = document.querySelectorAll(".rating");
if (ratings.length > 0) {
	initRatings();
}

function initRatings() { //Основная функция
	let ratingActive, ratingValue;

	//Перебор всех рейтингов на странице
	for (let index = 0; index < ratings.length; index++) {
		const rating = ratings[index];

		initRating(rating);
	}

	//Инициализация конкретного рейтинга
	function initRating(rating) {

		initRatingVars(rating);
		setRatingActiveWidth();

		if (rating.classList.contains("rating-set")) {
			setRating(rating);
		}
	}

	//Инициализация переменных
	function initRatingVars(rating) {
		ratingActive = rating.querySelector(".rating-active");
		ratingValue = rating.querySelector(".rating-value");
	}

	//Изменение ширины активных звезд
	function setRatingActiveWidth(index = ratingValue.innerHTML) {
		const ratingActiveWidth = index / 0.05;
		ratingActive.style.width = `${ratingActiveWidth}%`;
	}

	//Возможность задать оценку
	function setRating(rating) {
		const ratingItems = rating.querySelectorAll(".rating-item");

		for (let index = 0; index < ratingItems.length; index++) {
			const ratingItem = ratingItems[index];

			ratingItem.addEventListener("mouseenter", function (e) {
				//Обновление переменных
				initRatingVars(rating);

				//Обновление активных звезд
				setRatingActiveWidth(ratingItem.value);
			});

			ratingItem.addEventListener("mouseleave", function (e) {
				setRatingActiveWidth();
			});

			ratingItem.addEventListener("click", function (e) {
				//Обновление переменных
				initRatingVars(rating);

				if (rating.dataset.ajax) {
					//Отправить на сервер 
					setRatingValue(ratingItem.value, rating);
				} else {
					//Отобразить указанную оценку
					ratingValue.innerHTML = index + 1;
					setRatingActiveWidth();
				}
			});
		}
	}

	async function setRatingValue(value, rating) {
		if (!rating.classList.contains("rating-sending")) {
			rating.classList.add("rating-sending");

			//Отправка данных (value) на сервер
			let response = await fetch("rating.json", {
				method: "GET",
				// body: JSON.stringify({
				// 	userRating: value
				// }),
				// headers: {
				// 	"content-type": "application/json"
				// }
			});

			if (response.ok) {
				const result = await response.json();

				//Получаем новый рейтинг
				const newRating = result.newRating;

				//Вывод нового среднего результата
				ratingValue.innerHTML = newRating;

				//Обновление активных звезд
				setRatingActiveWidth();

				rating.classList.remove("rating-sending");
			} else {
				alert("Произошла ошибка");

				rating.classList.remove("rating-sending");
			}
		}
	}
}
