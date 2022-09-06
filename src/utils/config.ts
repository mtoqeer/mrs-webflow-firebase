// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export const webflowAuth = {
  loginPath: '/login',
  loginRedirectPath: '/user',
  signupPath: '/signup',
  signupRedirectPath: '/user',
  logoutRedirectPath: '/',
  passwordResetPath: '/password-reset',
  firebaseConfig: {
    apiKey: 'AIzaSyBhNFLNzExqkp9dSV3gc38LiLqE2ga98XU',
    authDomain: 'mrs-webflow.firebaseapp.com',
    databaseURL: 'https://mrs-webflow-default-rtdb.firebaseio.com',
    projectId: 'mrs-webflow',
    storageBucket: 'mrs-webflow.appspot.com',
    messagingSenderId: '52297127254',
    appId: '1:52297127254:web:c6747c871e0dc286cef2f7',
    measurementId: 'G-3J00S98ECT',
  },
};