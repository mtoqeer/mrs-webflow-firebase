export const bodyAuth = document.body.getAttribute('data-user-auth');
export const bodyUnauth = document.body.getAttribute('data-user-unauth');
export const userAuth = document.querySelectorAll('[data-user-auth]');
export const userUnauth = document.querySelectorAll('[data-user-unauth]');

// Signup UI
export const signupForms = document.querySelectorAll('[data-signup-form]');
export const signupErrors = document.querySelectorAll('[data-signup-error]');
export const signupLoading = document.querySelectorAll('[data-signup-loading]');
export const signupEmail = document.querySelector('[data-signup-email]');
export const signupPassword = document.querySelector('[data-signup-password]');

// SignIn UI
export const loginForms = document.querySelectorAll('[data-login-form]');
export const loginErrors = document.querySelectorAll('[data-login-error]');
export const loginLoading = document.querySelectorAll('[data-login-loading]');
export const loginEmail = document.querySelector('[data-login-email]');
export const loginPassword = document.querySelector('[data-login-password]');

// Logout UI
export const authLogout = document.querySelectorAll('[data-logout]');

// Profile Page
export const userEmail = document.getElementById('user-email');
export const userID = document.getElementById('user-id');
