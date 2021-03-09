"use strict";

function setTheme(themeName) {
			localStorage.setItem('theme', themeName);
			document.documentElement.className = themeName;
}

function toggleTheme() {
	if (localStorage.getItem('theme') === 'dark-theme') {
			setTheme('light-theme');
	} else {
			setTheme('dark-theme');
	}
}

setTheme('light-theme');

document.querySelector('.favorite').addEventListener('click', (e) => {
	toggleTheme();
});