document.addEventListener('DOMContentLoaded', function () {
	const panelBtnAdmin = document.getElementById('panel-btn-admin');
	const filterAdminPanel = document.getElementById('filter-admin-panel');
	const coursesGrid = document.getElementById('courses-grid');
	const addCourseForm = document.getElementById('add-course-form');
	const submitBtnAdmin = document.getElementById('submit-btn-admin');
	const filterCourseForm = document.getElementById('filter-course-form');
	const filterBtn = document.getElementById('filter-btn');

	// Загружаем курсы из localStorage при загрузке страницы
	defaultCourses();
	loadCoursesFromStorage();

	// Обработчик нажатия на кнопку "Добавить курс"
	submitBtnAdmin.addEventListener('click', function () {
		const courseName = addCourseForm['course-name'].value.trim();
		const courseLevel = addCourseForm['course-level'].value;

		if (courseName !== '') {
			const newCourse = { name: courseName, level: courseLevel };

			// Добавляем курс на страницу
			addCourseToPage(newCourse);

			// Сохраняем курс в localStorage
			saveCourseToStorage(newCourse);

			// Очищаем форму после добавления курса
			addCourseForm.reset();
		} else {
			alert('Введите название курса');
		}
	});

	// Обработчик нажатия на кнопку "Админ панель"
	panelBtnAdmin.addEventListener('click', function () {
		panelBtnAdmin.style.display = 'none';
		filterAdminPanel.style.display = 'flex';
	});

	// Обработчик нажатия на кнопку "Админ панель"
	filterBtn.addEventListener('click', function () {
		coursesGrid.innerHTML = "";
		const courseLevel = filterCourseForm['level'].value;
		loadCoursesFromStorage(courseLevel);
	});

	// Функция для добавления курса на страницу
	function addCourseToPage(course) {
		const courseCard = document.createElement('div');
		courseCard.classList.add('course-card');
		courseCard.classList.add(`${course.level}`);
		courseCard.textContent = `${course.name}`;
		coursesGrid.appendChild(courseCard);
	}

	// Функция для сохранения курса в localStorage
	function saveCourseToStorage(course) {
		let courses = JSON.parse(localStorage.getItem('courses')) || [];
		courses.push(course);
		localStorage.setItem('courses', JSON.stringify(courses));
	}

	// Функция для загрузки курсов из localStorage
	function loadCoursesFromStorage(filterr="all") {
		const courses = JSON.parse(localStorage.getItem('courses')) || [];
		courses.forEach(course => {
			if (course.level == filterr || filterr == "all")
				addCourseToPage(course);
		});
	}

	function defaultCourses() {
		const courses = JSON.parse(localStorage.getItem('courses')) || [];
		if (courses.length == 0) {
			const template = [{ name: "Course 1", level: "beginner" }, { name: "Course 2", level: "intermediate" }, { name: "Course 3", level: "advanced" }, { name: "Course 4", level: "advanced" }, { name: "Course 5", level: "intermediate" }, { name: "Course 6", level: "beginner" }, { name: "Course 7", level: "beginner" }, { name: "Course 8", level: "intermediate" }, ]
			template.forEach(course => {
				courses.push(course);
			})
			localStorage.setItem('courses', JSON.stringify(courses));
		}
	}
});