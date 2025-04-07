// Initialize Firebase (Replace with your Firebase config)
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7EUoKgkCQQQgwOw6gFQJolRnA21AT4A0",
  authDomain: "teamup-a4672.firebaseapp.com",
  projectId: "teamup-a4672",
  storageBucket: "teamup-a4672.firebasestorage.app",
  messagingSenderId: "937414334011",
  appId: "1:937414334011:web:a494d71574f437e38cae1e",
  measurementId: "G-FYTJF5THW9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Set Persistence
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(() => {
    console.log("Firebase persistence set to LOCAL.");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error.message);
  });

// Cookie Helpers
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
  }
  return null;
}
function eraseCookie(name) {
  document.cookie = name + "=; Max-Age=-99999999;";
}

// Auth State Listener
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log("User is logged in:", user.email);
    setCookie("user", user.uid, 7);
    if (window.location.pathname.includes("login.html")) {
      window.location.href = "dashboard.html";
    }
  } else {
    console.log("No user logged in.");
    eraseCookie("user");
    if (window.location.pathname.includes("dashboard.html")) {
      window.location.href = "login.html";
    }
  }
});

// Google Sign-in
document.getElementById("signUpGoogle")?.addEventListener("click", () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      console.log("Signed in:", result.user.email);
      window.location.href = "dashboard.html";
    })
    .catch((error) => console.error("Sign-in error:", error.message));
});

// Logout
document.getElementById("signOutBtn")?.addEventListener("click", () => {
  firebase.auth().signOut()
    .then(() => {
      console.log("User signed out");
      eraseCookie("user");
      window.location.href = "login.html";
    })
    .catch((error) => console.error("Logout error:", error.message));
});

// login button redirect
document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.querySelector(".login-button");

  if (loginButton) {
    loginButton.addEventListener("click", function (e) {
      e.preventDefault();

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          window.location.href = "dashboard.html";
        } else {
          window.location.href = "login.html";
        }
      });
    });
  }
});


// Get the elements
const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');
const signInForm = document.getElementById('signInForm');
const emailInput = document.getElementById('signin-username');

// Add click event for "Forgot?" link
forgotPasswordBtn.addEventListener('click', () => {
  // Get the email from the sign in form
  const email = emailInput.value.trim();
  
  if (!email) {
    alert('Please enter your email address above to reset your password.');
    return;
  }
  
  // Use Firebase to send a password reset email
  firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      alert(`A password reset link has been sent to ${email}. Please check your inbox and follow the instructions.`);
    })
    .catch((error) => {
      console.error('Error sending password reset email:', error);
      alert('There was an error sending the password reset email. Please ensure the email is correct and try again.');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const getStartedBtn = document.getElementById('getStartedHeaderBtn');
    const loginBtn      = document.getElementById('loginHeaderBtn');
  
    function routeAccordingToAuth() {
      const user = firebase.auth().currentUser;
      if (user) {
        // Already signed in → go to dashboard
        getStartedBtn.href = 'dashboard.html';
        loginBtn.href      = 'dashboard.html';
      } else {
        // Not signed in → go to login
        getStartedBtn.href = 'login.html';
        loginBtn.href      = 'login.html';
      }
    }
  
    // Update routes once on load (firebase.currentUser may be null until onAuthStateChanged fires)
    routeAccordingToAuth();
  
    // Also update routes when auth state changes:
    firebase.auth().onAuthStateChanged(() => {
      routeAccordingToAuth();
    });
  });
  