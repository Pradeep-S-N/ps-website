document.addEventListener("DOMContentLoaded", function () {
    const slidesContainer = document.querySelector(".slides");
    const slides = Array.from(document.querySelectorAll(".slide"));
    const prevBtn = document.querySelector(".carousel-btn.prev");
    const nextBtn = document.querySelector(".carousel-btn.next");
    const total = slides.length;
    let index = 0;
  
    function updateCarousel() {
      const offset = -(index * (50 / 3)) ; 
      slidesContainer.style.transform = `translateX(${offset}%)`;
    }
  
    prevBtn.addEventListener("click", () => {
      index = (index - 1 + total) % total;
      updateCarousel();
    });
  
    nextBtn.addEventListener("click", () => {
      index = (index + 1) % total;
      updateCarousel();
    });
  
    // Initialize
    updateCarousel();
  });
  