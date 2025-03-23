// Example: Add functionality to the "Get Started" button in the header
const getStartedHeaderBtn = document.getElementById("getStartedHeaderBtn");

if (getStartedHeaderBtn) {
  getStartedHeaderBtn.addEventListener("click", () => {
    alert("Header Get Started button clicked!");
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


document.addEventListener("DOMContentLoaded", function() {
  const featuresBtn = document.querySelector(".features-btn");
  const dropdownMenu = document.getElementById("dropdown-container");
  
  featuresBtn.addEventListener("click", function(e) {
    e.preventDefault();
    
    // Toggle the active class on the Features button (for arrow rotation)
    this.classList.toggle("active");
    
    // Toggle the dropdown menu's open state
    dropdownMenu.classList.toggle("open");
    
    // Get the Features button's position relative to the viewport
    const rect = featuresBtn.getBoundingClientRect();
    
    // Set the dropdown's left position to align with the Features button
    dropdownMenu.style.left = rect.left + "px";
    
    // Set the dropdown's top position to be just below the Features button
    // Adding window.scrollY accounts for any vertical scrolling
    dropdownMenu.style.top = rect.bottom + window.scrollY + "px";
  });
});

