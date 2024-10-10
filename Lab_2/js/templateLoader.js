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
	const currentPath = window.location.pathname;
    const menuItems = document.querySelectorAll('nav li');

    menuItems.forEach(link => {
        const linkPath = new URL(link.querySelector('a').href).pathname; 

		console.log(linkPath, currentPath);
        if (linkPath === currentPath) {
            link.classList.add('active-link');
        } else {
            link.classList.remove('active-link'); 
        }
    });
}
	