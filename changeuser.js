// Функция для загрузки данных из localStorage
function loadUserData() {
    // Загружаем данные из 'userdata', если они существуют
    const savedData = JSON.parse(localStorage.getItem('userProfileData'));
    const userData = JSON.parse(localStorage.getItem('userdata'));
    

    if (savedData && savedData.firstname && savedData.lastname) {
        if (savedData && savedData.firstname && savedData.lastname) {
        document.getElementById('user-name').textContent = `${savedData.firstname} ${savedData.lastname}`;

    }
    } 
    else if(userData) {
        // Если userdata отсутствует, берем значения из отдельных ключей localStorage
        const fname = localStorage.getItem('fname');
        const lname = localStorage.getItem('lname');
        const dob = localStorage.getItem('dob');

        if (fname && lname) {
            document.getElementById('user-name').textContent = `${fname} ${lname}`;
        }
        if (dob) {
            document.getElementById('user-dob').textContent = `Date of Birth: ${dob}`;
        }
    }

    // Загружаем изображение профиля
    const profileImage = localStorage.getItem('profileImage');
    if (profileImage) {
        document.querySelector('.profile-user').src = profileImage;
    }
}

// Вызов функции загрузки данных при загрузке страницы
window.onload = function() {
    loadUserData();
    loadProfileImage();
};

document.querySelector('.submit-btn-user').addEventListener('click', function(event) {
    event.preventDefault(); // Предотвращаем отправку формы

    // Получаем значения из полей ввода
    const fname = document.getElementById('fname').value;
    const lname = document.getElementById('lname').value;
    const dob = document.getElementById('dob').value;

    // Обновляем отображаемую информацию
    const userNameElement = document.getElementById('user-name');
    userNameElement.textContent = `${fname} ${lname}`;

    // Обновляем дату рождения
    const userDobElement = document.getElementById('user-dob');
    userDobElement.textContent = `Date of Birth: ${dob ? dob : 'Not set'}`;

    // Сохраняем данные в localStorage
    localStorage.setItem('fname', fname);
    localStorage.setItem('lname', lname);
    localStorage.setItem('dob', dob);

    // Также обновляем объект 'userdata'
    const userData = {
        firstname: fname,
        lastname: lname,
        dob: dob
    };
    localStorage.setItem('userdata', JSON.stringify(userData));

    // Очистка полей после изменения
    document.getElementById('fname').value = '';
    document.getElementById('lname').value = '';
    document.getElementById('dob').value = '';
});

// Функция для предварительного просмотра изображения профиля
function previewImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        // Изменяем изображение профиля
        document.querySelector('.profile-user').src = e.target.result;
        // Сохраняем изображение в localStorage
        localStorage.setItem('profileImage', e.target.result);
    }
    reader.readAsDataURL(file);
}

// Добавляем обработчик для выбора файла
document.querySelector('.profile-input').addEventListener('change', previewImage);

// Функция для загрузки изображения профиля
function loadProfileImage() {
    const profileImage = localStorage.getItem('profileImage');
    if (profileImage) {
        const profileUser = document.querySelector('.profile-user');
        if (profileUser) {
            profileUser.src = profileImage;
        }
    }
}
