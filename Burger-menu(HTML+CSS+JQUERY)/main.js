$(document).ready(function () {//Получаем элемент со страницы
	$(".header__burger").click(function () {//Обработка клика
		$(".header__burger, .header__menu").toggleClass("active");
		$("body").toggleClass("lock");
	});
});