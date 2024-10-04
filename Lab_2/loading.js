// Скрипт для получения и вывода данных о производительности

(function() {
	window.addEventListener('load', function() {
		const timing = performance.timing;

		const pageLoadTime = timing.loadEventEnd - timing.loadEventStart; // Время полной загрузки страницы
		const domContentLoadedTime = timing.domContentLoadedEventEnd - timing.domContentLoadedEventStart; // Время до DOMContentLoaded
		const responseTime = timing.responseEnd - timing.requestStart; // Время отклика сервера
		const connectTime = timing.connectEnd - timing.connectStart; // Время установки соединения
		const dnsTime = timing.domainLookupEnd - timing.domainLookupStart; // Время разрешения DNS

		const stats = `
			<p>Полное время загрузки страницы: <strong>${pageLoadTime} мс</strong></p>
			<p>Время до события DOMContentLoaded: <strong>${domContentLoadedTime} мс</strong></p>
			<p>Время отклика сервера: <strong>${responseTime} мс</strong></p>
			<p>Время установки соединения: <strong>${connectTime} мс</strong></p>
			<p>Время разрешения DNS: <strong>${dnsTime} мс</strong></p>
		`;

		const performanceDiv = document.getElementById('performance-info');
		performanceDiv.innerHTML += stats;
	});
})();