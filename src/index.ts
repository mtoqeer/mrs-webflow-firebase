// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck ignores all ts errors in the file
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  getAuth,
} from 'firebase/auth';

import { webflowAuth } from '$utils/config';
import {
  bodyAuth,
  bodyUnauth,
  userAuth,
  userUnauth,
  signupForms,
  signupErrors,
  signupLoading,
  signupEmail,
  signupPassword,
  loginForms,
  loginErrors,
  loginLoading,
  loginEmail,
  loginPassword,
  authLogout,
  userEmail,
  userID,
} from '$utils/ui';

window.Webflow ||= [];
window.Webflow.push(() => {
  // Initialize Firebase
  const app = initializeApp(webflowAuth.firebaseConfig);

  // Initialize Firebase Authentication and get a reference to the service
  const auth = getAuth(app);
  // const user = auth.currentUser;

  onAuthStateChanged(auth, (user) => {
    if (user !== null) {
      if (userEmail !== null || userID !== null) {
        userEmail.textContent = `${user.email}`;
        userID.textContent = `${user.uid}`;
      }
    }
  });

  userAuth.forEach(function (el) {
    el.style.display = 'none';
  });
  userUnauth.forEach(function (el) {
    el.style.display = 'none';
  });

  // Signup

  signupForms.forEach(function (el) {
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
  });

  // Sign-in

  loginForms.forEach(function (el) {
    // On Login Submit
    el.addEventListener('submit', function (e) {
      e.preventDefault();
      e.stopPropagation();
      loginErrors.forEach(function (el) {
        el.style.display = 'none';
      });
      loginLoading.forEach(function (el) {
        el.style.display = 'block';
      });
      signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
        .then((userCredential) => {
          const user = userCredential.user;
          window.location.href = webflowAuth.loginRedirectPath;
        })
        .catch((error) => {
          loginErrors.forEach(function (el) {
            el.innerText = error.message;
            el.style.display = 'block';
          });
        });

      setTimeout(function () {
        loginLoading.forEach(function (el) {
          el.style.display = 'none';
        });
      }, 1000);
    });
  });

  // Logout
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
