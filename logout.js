
document.getElementById('logout-btn').addEventListener('click', logout);

// Function to log out user
function logout() {
    localStorage.removeItem('isLoggedIn'); // Remove login state
    alert('You have been logged out.'); // Notify user
    window.location.href = 'Login.html'; // Redirect to login page
  }
