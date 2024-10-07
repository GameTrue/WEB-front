document.addEventListener('DOMContentLoaded', function () {
	const panelBtnAdmin = document.getElementById('panel-btn-admin');
	const filterAdminPanel = document.getElementById('filter-admin-panel');
	const coursesGrid = document.getElementById('courses-grid');
	const addCourseForm = document.getElementById('add-course-form');
	const submitBtnAdmin = document.getElementById('submit-btn-admin');
	const filterCourseForm = document.getElementById('filter-course-form');
	const filterBtn = document.getElementById('filter-btn');
	const editBtnAdmin = document.getElementById('edit-btn-admin');
	let inputActive = 0;

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
		editBtnAdmin.style.display = 'inline-block';
	});

	// Обработчик нажатия на кнопку "Админ панель"
	filterBtn.addEventListener('click', function () {
		coursesGrid.innerHTML = "";
		const courseLevel = filterCourseForm['level'].value;
		loadCoursesFromStorage(courseLevel);
	});

	editBtnAdmin.addEventListener('click', function () {
		const inputs = document.getElementsByName("course-card-name");
		if (inputActive == 0) {
			inputs.forEach(element => {
				element.style.pointerEvents = "auto";
			});
	
			editBtnAdmin.textContent = "Сохранить";

			inputActive = 1 - inputActive;
		}
		else {
			const courses = JSON.parse(localStorage.getItem('courses')) || [];
			console.log(courses);

			inputs.forEach((element, index) => {
				element.style.pointerEvents = "none";
				courses[index]["name"]  = element.value;
			});

			editBtnAdmin.textContent = "Редактировать";
			
			localStorage.setItem('courses', JSON.stringify(courses));

			inputActive = 1 - inputActive;
		}
	});

	// Функция для добавления курса на страницу
	function addCourseToPage(course) {
		const courseCard = document.createElement('div');
		const courseCardFlex = document.createElement('div');
		const courseCardName = document.createElement('span');
		const courseCardAuthor = document.createElement('span');
		const courseCardInputName = document.createElement('input')


		courseCardName.classList.add('course-card-name');
		courseCardName.textContent = course.name;
		courseCardInputName.setAttribute('type', 'text');
		courseCardInputName.classList.add('course-card-input');
		courseCardInputName.value = course.name;
		courseCardInputName.name = "course-card-name";
		courseCardInputName.setAttribute('placeholder', 'Введите текст...');
		courseCardAuthor.classList.add('course-card-author');
		courseCardAuthor.textContent = "Name Surname";

		courseCard.classList.add('course-card');
		courseCard.classList.add(`${course.level}`);

		courseCardFlex.classList.add('course-card-flex')

		
		courseCardFlex.appendChild(courseCardName);
		courseCardFlex.appendChild(courseCardInputName);
		courseCardFlex.appendChild(courseCardAuthor);
		courseCard.appendChild(courseCardFlex);
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
			const template = [{ name: "Course 1", level: "beginner" }, 
				{ name: "Course 2", level: "intermediate" }, 
				{ name: "Course 3", level: "advanced" }, 
				{ name: "Course 4", level: "advanced" }, 
				{ name: "Course 5", level: "intermediate" }, 
				{ name: "Course 6", level: "beginner" }, 
				{ name: "Course 7", level: "beginner" }, 
				{ name: "Course 8", level: "intermediate" }, ];
			template.forEach(course => {
				courses.push(course);
			})
			localStorage.setItem('courses', JSON.stringify(courses));
		}
	}
});