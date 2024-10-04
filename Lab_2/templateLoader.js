// JavaScript для подгрузки шаблонов и динамического добавления active-link

function loadFragment(fragmentId, url, callback) {
	fetch(url)
		.then(response => response.text())
		.then(data => {
			document.getElementById(fragmentId).innerHTML = data;
			if (callback) callback(); // Вызов callback после загрузки
		})
		.catch(error => console.error('Ошибка загрузки фрагмента:', error));
}

// Подгрузка header и footer
loadFragment('header-placeholder', 'header.html', setActiveLink);
loadFragment('footer-placeholder', 'footer.html');


// Функция для установки класса active-link на активную страницу
function setActiveLink() {
	const path = window.location.pathname;
	// Извлекаем последний элемент пути (название страницы)
	const page = path.substring(path.lastIndexOf('/') + 1);
	const menuItems = document.querySelectorAll('nav a');

	menuItems.forEach(link => {
		console.log(link.getAttribute('href'), path)
		if (link.getAttribute('href') === page) {
			link.querySelector('li').classList.add('active-link');
		}
	});
}
