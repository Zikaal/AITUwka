// Function to validate the sign-up form
function validateSignUpForm(event) {
    event.preventDefault(); // Prevent the form from submitting
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();
    
    let isValid = true;
  
    // Clear previous error messages
    document.getElementById('usernameError').innerText = '';
    document.getElementById('emailError').innerText = '';
    document.getElementById('passwordError').innerText = '';
    document.getElementById('confirmPasswordError').innerText = '';
  
    // Validate fields
    if (username === '') {
        document.getElementById('usernameError').innerText = 'Username is required.';
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
  
    // Store user data if form is valid
    if (isValid) {
        const userData = {
            username: username,
            email: email,
            password: password // In a real application, do not store passwords in plain text
        };
        localStorage.setItem('userData', JSON.stringify(userData)); // Store user data
        alert('Registration successful! You can now log in.'); // Notify user of successful registration
    }
  }
  
  // Function to validate the login form
  function validateLoginForm(event) {
    event.preventDefault(); // Prevent the form from submitting
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
  
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
  
  // Add event listeners for form submissions
  document.addEventListener('DOMContentLoaded', function () {
      const signUpForm = document.getElementById('signUpForm');
      if (signUpForm) {
          signUpForm.addEventListener('submit', validateSignUpForm);
      }
  
      const loginForm = document.getElementById('loginForm');
      if (loginForm) {
          loginForm.addEventListener('submit', validateLoginForm);
      }
      
      // Check login status on page load
      checkLoginStatus();
  });
  