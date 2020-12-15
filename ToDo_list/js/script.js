"use strict";

let addMessage = document.querySelector(".message"),
	addButton = document.querySelector(".add"),
	todo = document.querySelector(".todo");

let todoList = [];

if (localStorage.getItem("todo")) {
	todoList = JSON.parse(localStorage.getItem("todo"));
	showMessages();
}

addButton.addEventListener("click", function () {

	if (!addMessage.value) return;
	let newTodo = {
		todo: addMessage.value,
		checked: false,
		important: false,
	};

	todoList.push(newTodo);
	showMessages();
	localStorage.setItem("todo", JSON.stringify(todoList));
	addMessage.value = "";
});

function showMessages() {
	let showMessage = "";
	if (todoList.length === 0) {
		todo.innerHTML = "";
	}
	todoList.forEach(
		function (item, i) {
			showMessage += `
			<li>
			<input type="checkbox" id = "item_${i}" ${item.checked ? "checked" : ""}>
			<label for = "item_${i}"
			class= "${item.important ? "important" : ""}">${item.todo}</label>
			</li>`;

			todo.innerHTML = showMessage;
		}
	);
}

todo.addEventListener("change", function (event) {
	let idInput = event.target.getAttribute("id");
	let forLabel = todo.querySelector('[for=' + idInput + ']');
	let valueLabel = forLabel.innerHTML;

	todoList.forEach(function (item) {
		if (item.todo === valueLabel) {
			item.checked = !item.checked;
			localStorage.setItem("todo", JSON.stringify(todoList));
		}
	});
});

todo.addEventListener("contextmenu", function (event) {
	event.preventDefault();
	todoList.forEach(function (item, i) {
		if (item.todo === event.target.innerHTML) {
			if (event.ctrlKey || event.metaKey) {//удаление элемента при нажатом Ctrl
				todoList.splice(i, 1);
			} else {
				item.important = !item.important;
			}
			showMessages();
			localStorage.setItem("todo", JSON.stringify(todoList));
		}
	});
});