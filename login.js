document.addEventListener('DOMContentLoaded', function () {
    const signUpForm = document.getElementById('signUpForm');
    if (signUpForm) {
        signUpForm.addEventListener('submit', validateSignUpForm);
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', validateLoginForm);
    }
});

function validateSignUpForm(event) {
    const firstname = document.getElementById('firstname').value.trim();
    const lastname = document.getElementById('lastname').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();
    
    let isValid = true;

    // Очистка предыдущих сообщений об ошибках
    document.getElementById('firstnameError').innerText = '';
    document.getElementById('lastnameError').innerText = '';
    document.getElementById('emailError').innerText = '';
    document.getElementById('passwordError').innerText = '';
    document.getElementById('confirmPasswordError').innerText = '';

    // Проверка полей
    if (firstname === '') {
        document.getElementById('firstnameError').innerText = 'Firstname is required.';
        isValid = false;
    }
    if (lastname === '') {
        document.getElementById('lastnameError').innerText = 'Lastname is required.';
        isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        document.getElementById('emailError').innerText = 'Email is required.';
        isValid = false;
    } else if (!emailPattern.test(email)) {
        document.getElementById('emailError').innerText = 'Invalid email format.';
        isValid = false;
    }

    if (password === '') {
        document.getElementById('passwordError').innerText = 'Password is required.';
        isValid = false;
    } else if (password.length < 6) {
        document.getElementById('passwordError').innerText = 'Password must be at least 6 characters long.';
        isValid = false;
    }

    if (confirmPassword === '') {
        document.getElementById('confirmPasswordError').innerText = 'Confirming password is required.';
        isValid = false;
    } else if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').innerText = 'Passwords do not match.';
        isValid = false;
    }

    // Сохранение данных в localStorage, если проверка прошла успешно
    if (isValid) {
        const userData = {
            fisrtname: firstname,
            lastname: lastname,
            email: email,
            password: password,
        };
        localStorage.setItem('userData', JSON.stringify(userData));
    }
    

    // Предотвращение отправки формы, если проверка не удалась
    if (!isValid) {
        event.preventDefault(); // Предотвращение отправки формы
    }
}

function validateLoginForm(event) {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    let isValid = true;

    // Очистка предыдущих сообщений об ошибках
    document.getElementById('emailError').innerText = '';
    document.getElementById('passwordError').innerText = '';

    if (email === '') {
        document.getElementById('emailError').innerText = 'Email is required.';
        isValid = false;
    }

    if (password === '') {
        document.getElementById('passwordError').innerText = 'Password is required.';
        isValid = false;
    }

    // Проверка данных в localStorage
    if (isValid) {
        const userData = JSON.parse(localStorage.getItem('userData'));

        if (userData) {
            // Сравнение введенных данных с сохраненными
            if (userData.email !== email || userData.password !== password) {
                document.getElementById('emailError').innerText = 'Invalid email or password.';
                isValid = false;
            } else {
                // Успешный вход, здесь можно установить welcome modal
                localStorage.setItem('showWelcomeModal', 'true');
            }
        } else {
            document.getElementById('emailError').innerText = 'No user found. Please register.';
            isValid = false;
        }
    }

    // Предотвращение отправки формы, если проверка не удалась
    if (!isValid) {
        event.preventDefault(); // Предотвращение отправки формы
    }
}
