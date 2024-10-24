function validateLoginForm() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    let isValid = true;

    // Clear previous error messages
    document.getElementById('emailError').innerText = '';
    document.getElementById('passwordError').innerText = '';

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
    }

    // Check credentials if validation passes
    if (isValid) {
        const userData = getUserData(); // Retrieve stored user data
        if (userData && userData.email === email && userData.password === password) {
            // Successful login logic here
            localStorage.setItem('isLoggedIn', 'true'); // Set login state
            alert('Login successful!');
            window.location.href = 'home.html'; // Redirect to home page
        } else {
            document.getElementById('emailError').innerText = 'Invalid email or password.';
            isValid = false;
        }
    }

    return isValid; // Prevent form submission if validation fails
}

// Function to retrieve user data from Local Storage
function getUserData() {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
        return JSON.parse(storedData); // Convert JSON string back to object
    }
    return null; // Return null if no user data is found
}

// Function to check if user is logged in
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        window.location.href = 'home.html'; // Redirect to home page if already logged in
    }
}

// Call checkLoginStatus when the page loads
window.onload = checkLoginStatus;