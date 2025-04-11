// Simple logout functionality
document.getElementById('logoutBtn').addEventListener('click', () => {
  // If using Firebase, for example, you could call:
  // firebase.auth().signOut().then(() => { window.location.href = '/profile.html'; });
  // For now, we simply redirect to the login page.
  window.location.href = 'home.html';
});

document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logoutBtn');

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      firebase.auth().signOut()
        .then(() => {
          console.log("User signed out successfully.");
          window.location.href = 'home.html'; // or profile.html
        })
        .catch((error) => {
          console.error("Error during sign-out:", error);
        });
    });
  }
});


// Grab all buttons (both nav and bottom-nav)
const buttons = document.querySelectorAll('button[data-view]');
const views   = document.querySelectorAll('.view');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Clear active state
    buttons.forEach(b => b.classList.remove('active'));
    views.forEach(v => v.classList.remove('active'));

    // Activate this button + corresponding view
    btn.classList.add('active');
    document.getElementById(btn.dataset.view).classList.add('active');
  });
});

// Activate the first button by default
buttons[0].classList.add('active');
