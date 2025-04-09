// -------------------------
// Firebase Auth References
// -------------------------
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// -------------------------
// UI Element References (same as before)
// -------------------------
const signInPage = document.getElementById('signInPage');
const signUpPage = document.getElementById('signUpPage');
const createAccountPage = document.getElementById('createAccountPage');

const headerAction = document.getElementById('headerAction');

const goToSignUp = document.getElementById('goToSignUp');
const goToSignInFromSignUp = document.getElementById('goToSignInFromSignUp');
const goToSignInFromCreate = document.getElementById('goToSignInFromCreate');
const continueWithEmail = document.getElementById('continueWithEmail');

const popup = document.getElementById('popup');
const closePopup = document.getElementById('closePopup');

const termsCheckbox = document.getElementById('termsCheckbox');
const termsError = document.getElementById('termsError');
const createAccountBtn = document.getElementById('createAccountBtn');

// Input fields for Sign In
const signinUsername = document.getElementById('signin-username');
const signinPassword = document.getElementById('signin-password');

// Input fields for Create Account (Registration)
const signupName = document.getElementById('signup-name'); // For display purposes only
const signupUsername = document.getElementById('signup-username'); // For display purposes only
const signupEmail = document.getElementById('signup-email');
const signupPassword = document.getElementById('signup-password');

// -------------------------
// Utility Function to Switch Pages
// -------------------------
function showPage(pageToShow) {
  signInPage.classList.remove('active');
  signUpPage.classList.remove('active');
  createAccountPage.classList.remove('active');
  pageToShow.classList.add('active');
}

// -------------------------
// Navigation Handlers
// -------------------------
goToSignUp.addEventListener('click', () => {
  showPage(signUpPage);
  headerAction.textContent = 'Sign up to';
});

if (goToSignInFromSignUp) {
  goToSignInFromSignUp.addEventListener('click', () => {
    showPage(signInPage);
    headerAction.textContent = 'Sign in to';
  });
}

if (goToSignInFromCreate) {
  goToSignInFromCreate.addEventListener('click', () => {
    showPage(signInPage);
    headerAction.textContent = 'Sign in to';
  });
}

if (continueWithEmail) {
  continueWithEmail.addEventListener('click', () => {
    showPage(createAccountPage);
    headerAction.textContent = 'Sign up to';
  });
}

// Set default page on load
showPage(signInPage);
headerAction.textContent = 'Sign in to';

// -------------------------
// Firebase: Email Sign In Handler
// -------------------------
document.getElementById('signInBtn').addEventListener('click', async () => {
  const email = signinUsername.value;
  const password = signinPassword.value;

  if (!email || !password) {
    alert('Please enter both email and password.');
    return;
  }

  try {
    await auth.signInWithEmailAndPassword(email, password);
    // Redirect or update UI upon successful login.
    window.location.href = 'dashboard.html'; // Or update your UI accordingly.
  } catch (error) {
    console.error('Error during sign in:', error);
    alert(error.message);
  }
});


// -------------------------
// Firebase: Registration (Create Account) Handler
// -------------------------
createAccountBtn.addEventListener('click', async () => {
  if (!termsCheckbox.checked) {
    termsError.textContent = "Please check the box to agree to the terms.";
    termsError.style.display = "block";
    return;
  } else {
    termsError.style.display = "none";
  }

  const email = signupEmail.value;
  const password = signupPassword.value;
  
  if (!email || !password) {
    alert("Please fill in all required fields.");
    return;
  }

  try {
    await auth.createUserWithEmailAndPassword(email, password);
    // Optionally, you can update the user profile with name/username:
    const user = auth.currentUser;
    if (user) {
      user.updateProfile({
        displayName: signupName.value || signupUsername.value
      });
    }
    // Redirect or update UI upon successful registration.
    window.location.href = 'dashboard.html';
  } catch (error) {
    console.error('Error during account creation:', error);
    alert(error.message);
  }
});

// -------------------------
// Firebase: Google OAuth Handler
// -------------------------
function signInWithGoogle() {
  auth.signInWithPopup(provider)
    .then(result => {
      // Successful authentication.
      window.location.href = 'dashboard.html';
    })
    .catch(error => {
      console.error('Google sign in error:', error);
      alert(error.message);
    });
}

document.getElementById('signInGoogle').addEventListener('click', signInWithGoogle);
document.getElementById('signUpGoogle').addEventListener('click', signInWithGoogle);

// -------------------------
// Popup Close Handler
// -------------------------
if (closePopup) {
  closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');
  const emailInput = document.getElementById('signin-username');

  forgotPasswordBtn.addEventListener('click', () => {
    const email = emailInput.value.trim();
    if (!email) {
      alert('Please enter your email address above to reset your password.');
      return;
    }

    firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        alert(`A password reset link has been sent to ${email}. Please check your inbox.`);
      })
      .catch((error) => {
        console.error('Error sending password reset email:', error);
        alert('There was an error sending the password reset email. Please ensure the email is correct and try again.');
      });
  });
});


