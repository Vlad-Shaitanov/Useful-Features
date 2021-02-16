"use strict";

const textArea = document.querySelector("#mytextarea");
const button = document.querySelector(".get-editor-data");

button.addEventListener("click", () => {

	//Так мы просто получим данные из поля
	let data = tinymce.get("mytextarea").getContent();
	console.log(data);

	//Так мы получим данные из поля в нужном формате
	let data2 = tinymce.get("mytextarea").getContent({
		format: "text"
	});
	console.log(data2);
});