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
		const courses = JSON.parse(localStorage.getItem('courses')) || [];

		const courseId = courses[courses.length-1]['id'] + 1;
		const courseName = addCourseForm['course-name'].value.trim();
		const courseAuthor = addCourseForm['course-author'].value.trim();
		const courseCategory = addCourseForm['course-category'].value.trim();
		const courseLevel = addCourseForm['course-level'].value;

		if (courseName !== '') {
			const newCourse = { id: courseId,
				 name: courseName,
				  level: courseLevel,
				   author: courseAuthor,
				    category: courseCategory };

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
		const courseCategory = filterCourseForm['category'].value;
		loadCoursesFromStorage({level: courseLevel, category: courseCategory});
	});

	editBtnAdmin.addEventListener('click', function () {
		const inputs = document.getElementsByName("course-card-name");
		const inputAuthors = document.getElementsByName("course-card-author");

		if (inputActive == 0) {
			inputs.forEach(element => {
				element.style.pointerEvents = "auto";
			});
			
			inputAuthors.forEach(element => {
				element.style.pointerEvents = "auto";
			});
	
			editBtnAdmin.textContent = "Сохранить";

			inputActive = 1 - inputActive;
		}
		else {
			const courses = JSON.parse(localStorage.getItem('courses')) || [];
			console.log(courses);

			inputs.forEach((element, index) => {
				const elementVal = element.value;
				const elementIds = element.id;
				element.style.pointerEvents = "none";
				const digits = elementIds.match(/\d+$/);
				const elementId = digits ? parseInt(digits[0], 10) : null;;
				courses[elementId - 1]["name"]  = elementVal;
			});
			
			inputAuthors.forEach((element, index) => {
				const elementVal = element.value;
				const elementIds = element.id;
				element.style.pointerEvents = "none";
				const digits = elementIds.match(/\d+$/);
				const elementId = digits ? parseInt(digits[0], 10) : null;;
				courses[elementId - 1]["author"]  = elementVal;
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
		const courseCardInputAuthor = document.createElement('input')


		courseCardName.classList.add('course-card-name');
		courseCardName.textContent = course.name;

		courseCardInputName.setAttribute('type', 'text');
		courseCardInputName.classList.add('course-card-input');
		courseCardInputName.id = `input-courses-${course.id}`;
		courseCardInputName.value = course.name;
		courseCardInputName.name = "course-card-name";
		courseCardInputName.setAttribute('placeholder', 'Введите текст...');

		courseCardAuthor.classList.add('course-card-author');
		courseCardAuthor.textContent = course.author;

		courseCardInputAuthor.setAttribute('type', 'text');
		courseCardInputAuthor.classList.add('course-card-input');
		courseCardInputAuthor.classList.add('course-card-author');
		courseCardInputAuthor.id = `input-courses-author-${course.id}`;
		courseCardInputAuthor.value = course.author;
		courseCardInputAuthor.name = "course-card-author";
		courseCardInputAuthor.setAttribute('placeholder', 'Введите текст...');

		courseCard.classList.add('course-card');
		courseCard.classList.add(`${course.level}`);

		courseCardFlex.classList.add('course-card-flex')

		
		courseCardFlex.appendChild(courseCardName);
		courseCardFlex.appendChild(courseCardInputName);
		courseCardFlex.appendChild(courseCardAuthor);
		courseCardFlex.appendChild(courseCardInputAuthor);
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
	function loadCoursesFromStorage(filterr={level: "all", category: "all"}) {
		const courses = JSON.parse(localStorage.getItem('courses')) || [];
		courses.forEach(course => {
			if ((course.level == filterr.level || filterr.level == "all") && (course.category == filterr.category || filterr.category == "all"))
				addCourseToPage(course);
		});
	}

	function defaultCourses() {
		const courses = JSON.parse(localStorage.getItem('courses')) || [];
		if (courses.length == 0) {
			const template = [{ id: 1, name: "Course 1", level: "beginner", author: "Name Surname", category: "programming" }, 
				{ id: 2, name: "Course 2", level: "intermediate", author: "Name Surname", category: "programming" }, 
				{ id: 3, name: "Course 3", level: "advanced", author: "Name Surname", category: "design" }, 
				{ id: 4, name: "Course 4", level: "advanced", author: "Name Surname", category: "programming" }, 
				{ id: 5, name: "Course 5", level: "intermediate", author: "Name Surname", category: "marketing" }, 
				{ id: 6, name: "Course 6", level: "beginner", author: "Name Surname", category: "marketing" }, 
				{ id: 7, name: "Course 7", level: "beginner", author: "Name Surname", category: "marketing" }, 
				{ id: 8, name: "Course 8", level: "intermediate", author: "Name Surname", category: "design" }, ];
			template.forEach(course => {
				courses.push(course);
			})
			localStorage.setItem('courses', JSON.stringify(courses));
		}
	}
});