"use strict";

document.addEventListener("DOMContentLoaded", () => {

	const form = document.querySelector(".form");
	form.addEventListener("submit", sendForm);

	async function sendForm(event) {
		event.preventDefault();

		let error = formValidate(form);

		if (error === 0) {

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
});