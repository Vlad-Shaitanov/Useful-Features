"use strict";

document.addEventListener("DOMContentLoaded", () =>{

	//Первоначальная инициализация карты
	function init(){

		let arr = [];
		let myMap = new ymaps.Map("map", {
		     center: [56.327459, 44.003711],
		     zoom: 13
		     });

			//Инициализация маркеров на карте
		function markers(){

			let arr = [];

			//Итератор
			let i = 0;

			document.querySelectorAll(".btn").forEach(element => {
				//Получаем координаты
				let coords = element.getAttribute("data-coords");

				//Получаем id элемента
				let id = element.getAttribute("data-id");

				//Массив с координатами
				let coordsArr = coords.split(",");
				console.log(coordsArr);

				//Преобразование строковых значений в число
				let result = coordsArr.map(x =>{
					return Number(x);
				});

				//Пушим результат в массив
				arr.push("placemark" + i);
				i++;

				//Создаем новую метку на карте
				arr[i] = new ymaps.Placemark(result, {
					'id': id,
					// Зададим содержимое заголовка балуна.
					balloonContentHeader: '<a href = "#">Какая-то компания</a><br>' +
						'<span class="description">Группа компаний "Альфа"</span>',
					// Зададим содержимое основной части балуна.
					balloonContentBody: '<a href="tel:+7-000-000-0000">+7 (000) 000-00-00</a><br/>' +
						'<b>Часы работы:</b> <br/> 10:00 - 19:00.',
					// Зададим содержимое нижней части балуна.
					balloonContentFooter: 'Информация предоставлена:<br/>ГК "Альфа"',
					// Зададим содержимое всплывающей подсказки.
					hintContent: 'Альфа'
				});

				//Добавляем метки на карту
				myMap.geoObjects.add(arr[i]);

				delete arr[0];
				
			});
			
		}
		markers();

		//Отслеживаем события карты
		myMap.events.add("boundschange", () =>{
			//boundschange => любое событие, происходящее с картой

			//Получаем все объекты на карте
			let res = ymaps.geoQuery(myMap.geoObjects);

			//Если объект в области видимости карты, отображаем его
			let visibleObjects = res.searchInside(myMap).addToMap(myMap);

			//Все видимые объекты записываем в массив
			let visibleArr = visibleObjects._objects;
			console.log(visibleArr);

			//Пробегаемся по блокам
			let items = document.querySelectorAll(".btn");

			//Сначала скрываем все блоки
			items.forEach(elem => {
				elem.closest("li").style.display = "none"
			});

			//Пробегаемся по видимым блокам и выводим их на карту
			for (let i = 0; i < visibleArr.length; i++) {
			let id = visibleArr[i].properties._data.id;

			document.querySelectorAll(`.btn[data-id="${id}"]`).forEach((el) => {
				el.closest('li').style.display = 'block';
			});
		}

			if (!visibleArr.length) {
				document.querySelector(".message").style.display = "block";
			}else{
				document.querySelector(".message").style.display = "none";

			}
		});
	}

	

	ymaps.ready(init);
});