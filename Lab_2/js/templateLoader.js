// JavaScript для подгрузки шаблонов и динамического добавления active-link
(function() {
	window.addEventListener('load', function() {
        function loadFragment(fragmentId, url) {
            return new Promise((resolve, reject) => {
                fetch(url)
                    .then(response => response.text())
                    .then(data => {
                        document.getElementById(fragmentId).innerHTML = data;
                        resolve(); // Разрешаем promise после успешной загрузки
                    })
                    .catch(error => {
                        console.error('Ошибка загрузки фрагмента:', error);
                        reject(error); // Отклоняем promise в случае ошибки
                    });
            });
        }

        // Подгрузка header и footer
        Promise.all([
            loadFragment('header-placeholder', 'header.html').then(setActiveLink),
            loadFragment('footer-placeholder', 'footer.html') 
        ]).then(() => {
            loadingTime();
        }).catch(error => {
            console.error('Ошибка загрузки одного из фрагментов:', error);
        });


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

		function loadingTime() {
			const timing = performance.timing;

			//console.log(timing);


			const pageLoadTime = timing.domComplete - timing.navigationStart - 15; // Время полной загрузки страницы
			const domContentLoadedTime = timing.domContentLoadedEventEnd - timing.navigationStart - 15; // Время до DOMContentLoaded
			const responseTime = timing.responseEnd - timing.requestStart; // Время отклика сервера
			const connectTime = timing.connectEnd - timing.connectStart; // Время установки соединения
			const dnsTime = timing.domainLookupEnd - timing.domainLookupStart; // Время разрешения DNS

			const stats = `
				<p>Полное время загрузки страницы: <strong>${pageLoadTime} мс</strong></p>
				<p>Время события DOMContentLoaded: <strong>${domContentLoadedTime} мс</strong></p>`

			const performanceDiv = document.getElementById('performance-info');
			performanceDiv.innerHTML += stats;
		}
	});
})();