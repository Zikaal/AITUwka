function validateSignUpForm() {
    // Get form values
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
  
    // Username validation
    if (username === '') {
      document.getElementById('usernameError').innerText = 'Username is required.';
      isValid = false;
    }
  
    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
      document.getElementById('emailError').innerText = 'Email is required.';
      isValid = false;
    } else if (!emailPattern.test(email)) {
      document.getElementById('emailError').innerText = 'Invalid email format.';
      isValid = false;
    }
  
    // Password validation (minimum length of 6 characters)
    if (password === '') {
      document.getElementById('passwordError').innerText = 'Password is required.';
      isValid = false;
    } else if (password.length < 6) {
      document.getElementById('passwordError').innerText = 'Password must be at least 6 characters long.';
      isValid = false;
    }
  
    // Confirm password validation
    if (confirmPassword === '') {
      document.getElementById('confirmPasswordError').innerText = 'Confirming password is required.';
      isValid = false;
    } else if (password !== confirmPassword) {
      document.getElementById('confirmPasswordError').innerText = 'Passwords do not match.';
      isValid = false;
    }
  
    // Prevent form submission if any validation fails
    return isValid;
  }



  function validateLoginForm() {
    // Get form input values
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    let isValid = true;

    // Clear previous error messages
    document.getElementById('emailError').innerText = '';
    document.getElementById('passwordError').innerText = '';

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        document.getElementById('emailError').innerText = 'Email is required.';
        isValid = false;
    } else if (!emailPattern.test(email)) {
        document.getElementById('emailError').innerText = 'Invalid email format.';
        isValid = false;
    }

    // Password validation (must not be empty)
    if (password === '') {
        document.getElementById('passwordError').innerText = 'Password is required.';
        isValid = false;
    }

    // Prevent form submission if validation fails
    return isValid;
}

  