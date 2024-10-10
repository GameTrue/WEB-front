// Получаем бургер и меню
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');

// Добавляем обработчик события на бургер
burger.addEventListener('click', () => {
  // Переключаем класс 'active' на меню
  console.log("1111")
  menu.classList.toggle('active');
});
