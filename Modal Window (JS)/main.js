"use strict";

const buttons = document.querySelectorAll(".btn");
const modalOverlay = document.querySelector(".modal-overlay");
const modals = document.querySelectorAll(".modal");

buttons.forEach(elem => {//При клике по кнопке модальное окно станет видимым

	elem.addEventListener("click", event => {
		let path = event.target.getAttribute("data-path");
		

		modals.forEach(elem => {
			elem.classList.remove("modal--visible");
		});

		document.querySelector(`[data-target="${path}"]`).classList.add("modal--visible");
		modalOverlay.classList.add("modal-overlay--visible");
		

	});
});

modalOverlay.addEventListener("click", event => {
	//Скрываем модальное окно при клике на оверлей
		
		if (event.target == modalOverlay) {
		modalOverlay.classList.remove('modal-overlay--visible');
		modals.forEach((elem) => {
			elem.classList.remove('modal--visible');
		});
	}
});
