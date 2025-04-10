// Example: Add functionality to the "Get Started" button in the header
const getStartedHeaderBtn = document.getElementById("getStartedHeaderBtn");

if (getStartedHeaderBtn) {
  getStartedHeaderBtn.addEventListener("click", () => {
    
  });
}

// You can add more JavaScript to handle form submissions, 
// open/close modals, toggle menus, etc.




document.addEventListener("DOMContentLoaded", function() {
  const navButtons = document.querySelectorAll(".nav-btn");
  
  navButtons.forEach(function(button) {
    button.addEventListener("click", function(e) {
      e.preventDefault();
      
      // Remove 'active' class from all buttons
      navButtons.forEach(btn => btn.classList.remove("active"));
      
      // Add 'active' class to the clicked button
      this.classList.add("active");
      
      // You can add further navigation functionality here
      console.log("Button " + this.dataset.option + " clicked.");
    });
  });
});


document.getElementById('find-team-btn').addEventListener('click', function(e) {
  e.preventDefault();
  // any logic based on data-option
  const option = this.dataset.option;
  // then navigate
  window.location.href = 'team.html';
});



