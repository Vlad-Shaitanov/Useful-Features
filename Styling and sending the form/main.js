"use strict";

document.addEventListener("DOMContentLoaded", () => {

	const form = document.querySelector(".form");

	const sendForm = async (event) => {
		event.preventDefault();
	};
	form.addEventListener("submit", sendForm);

});