

const signupForm = document.getElementById('signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;

    if (password !== passwordConfirm) {
      alert('Passwords do not match.');
      return;
    }

    // Sign up logic
    console.log('Signed up:', { username, email, password });

    // Redirect to homepage after successful signup
    window.location.href = 'index.html';
  });
}

// Check if the login form exists on the page
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Log in logic
    console.log('Logged in:', { email, password });

    // Redirect to homepage after successful login
    window.location.href = 'index.html';
  });
}