"use strict";

document.addEventListener("DOMContentLoaded", () => {

	const form = document.getElementById("form");
	form.addEventListener("submit", sendForm);

	async function sendForm(event) {
		event.preventDefault();

		let error = formValidate(form);

		let formData = new FormData(form);//Получаем данные с полей
		formData.append("image", formImage.files[0]);

		if (error === 0) {
			form.classList.add("_sending");

			//Отправляем данные
			let response = await fetch("sendmail.php", {
				method: "POST",
				body: formData,
			});

			if (response.ok) {
				let result = await response.json();

				alert(result.message);

				//Очистка формы
				formPreview.innerHTML = "";//Чистим превью
				form.reset();//Чистим все поля формы
				form.classList.remove("_sending");
			} else {
				alert("Произошла ошибка");
				form.classList.remove("_sending");
			}

		} else {
			alert("Заполните обязательные поля");
		}
	}

	function formValidate(form) {
		let error = 0;//Начальное значение

		/*Переменная для хранения элементов, которые должны проходить проверку.
		В нашем случае это Имя, Почта и Чекбокс с подтверждением согласия на
		обработку данных*/
		let formReq = document.querySelectorAll("._req");

		for (let i = 0; i < formReq.length; i++) {
			const input = formReq[i];
			formRemoveError(input);//Удаляем класс _error

			if (input.classList.contains("_email")) {

				if (emailTest(input)) {
					//Если тест не пройден, добавим класс _error
					formAddError(input);

					error++;
				}
			} else if (input.getAttribute("type") === "checkbox" &&
				input.checked === false) {
				formAddError(input);

				error++;
			} else {
				if (input.value === "") {
					formAddError(input);

					error++;
				}
			}
		}

		return error;
	}

	function formAddError(input) {
		input.parentElement.classList.add("_error");
		input.classList.add("_error");
	}

	function formRemoveError(input) {
		input.parentElement.classList.remove("_error");
		input.classList.remove("_error");
	}

	//Тестирование почты
	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}

	//Получаем инпут с картинкой в переменную
	const formImage = document.querySelector("#formImage");
	//Див для превью
	const formPreview = document.querySelector("#formPreview");

	formImage.addEventListener("change", () => {
		uploadFile(formImage.files[0]);//В данном случае у нас только 1 файл
	});

	//ПРоверка и загрузка файла
	function uploadFile(file) {

		//Проверка типа файла
		if (!["image/jpg", "image/jpeg", "image/png", "image/gif"].includes(file.type)) {
			alert("Разрешены только изображения");
			formImage.value = "";
			return;
		}

		//Проверка размера файла (< 2Мб)
		if (file.size > 2 * 1024 * 1024) {
			alert("Файл должен быть менее 2 Мб");
			return;
		}

		var reader = new FileReader();

		reader.onload = function (event) {
			formPreview.innerHTML = `<img src="${event.target.result}" alt="Sorry">`;
		};

		reader.onerror = function () {
			alert("Произошла ошибка");
		};

		reader.readAsDataURL(file);
	}
});