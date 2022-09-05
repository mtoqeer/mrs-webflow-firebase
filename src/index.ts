// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

import { webflowAuth } from '$utils/config';

window.Webflow ||= [];
window.Webflow.push(() => {
  // Initialize Firebase
  const app = initializeApp(webflowAuth.firebaseConfig);

  // Initialize Firebase Authentication and get a reference to the service
  const auth = getAuth(app);
  const user = auth.currentUser;

  const bodyAuth = document.body.getAttribute('data-user-auth');
  const bodyUnauth = document.body.getAttribute('data-user-unauth');
  const userAuth = document.querySelectorAll('[data-user-auth]');
  const userUnauth = document.querySelectorAll('[data-user-unauth]');
  // const userDisplayName = document.querySelectorAll('[data-user-displayName]');
  // const userEmail = document.querySelectorAll('[data-user-email]');
  // const userContent = document.querySelectorAll('[data-user]');

  userAuth.forEach(function (el) {
    el.style.display = 'none';
  });
  userUnauth.forEach(function (el) {
    el.style.display = 'none';
  });

  // Signup
  const signupForms = document.querySelectorAll('[data-signup-form]');
  const signupErrors = document.querySelectorAll('[data-signup-error]');
  const signupLoading = document.querySelectorAll('[data-signup-loading]');

  signupForms.forEach(function (el) {
    const signupEmail = el.querySelector('[data-signup-email]');
    const signupPassword = el.querySelector('[data-signup-password]');

    el.addEventListener('submit', function (e) {
      e.preventDefault();
      e.stopPropagation();

      signupErrors.forEach(function (el) {
        el.style.display = 'none';
      });
      signupLoading.forEach(function (el) {
        el.style.display = 'block';
      });

      createUserWithEmailAndPassword(auth, signupEmail.value, signupPassword.value)
        .then((userCredential) => {
          // Signed in
          const { user } = userCredential;
          window.location.href = webflowAuth.signupRedirectPath;
        })
        .catch((error) => {
          signupErrors.forEach(function (el) {
            el.innerText = error.message;
            el.style.display = 'block';
          });

          setTimeout(function () {
            signupLoading.forEach(function (el) {
              el.style.display = 'none';
            });
          }, 1000);
        });
    });
  });

  onAuthStateChanged(auth, (user) => {
    if (user && bodyUnauth) {
      window.location.href = webflowAuth.loginRedirectPath;
    } else if (!user && bodyAuth) {
      window.location.href = webflowAuth.loginPath;
    }
    if (user) {
      userAuth.forEach(function (el) {
        el.style.display = null;
      });
      userUnauth.forEach(function (el) {
        el.style.display = 'none';
      });
    } else {
      userAuth.forEach(function (el) {
        el.style.display = 'none';
      });
      userUnauth.forEach(function (el) {
        el.style.display = null;
      });
    }
    const welcomeMessage = document.getElementById('welcome-message');
    if (user !== null) {
      welcomeMessage.textContent = `Welcome ${user.email}`;
    }
  });
  // Logout
  const authLogout = document.querySelectorAll('[data-logout]');
  authLogout.forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      signOut(auth)
        .then(() => {
          window.location.href = webflowAuth.logoutRedirectPath;
        })
        .catch(function () {});
    });
  });
});
