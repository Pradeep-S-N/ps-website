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
            window.location.href = 'mobile.html'; // or profile.html
          })
          .catch((error) => {
            console.error("Error during sign-out:", error);
          });
      });
    }
  });
  