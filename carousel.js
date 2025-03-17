document.addEventListener("DOMContentLoaded", () => {
    const carouselContainer = document.querySelector('.carousel-container');
    const carouselItems = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;

    // Function to scroll the carousel items
    function changeSlide(direction) {
        if (direction === "down" && currentIndex < carouselItems.length - 1) {
            currentIndex++;
        } else if (direction === "up" && currentIndex > 0) {
            currentIndex--;
        }
        const offset = currentIndex * window.innerHeight;
        carouselContainer.style.transform = `translateY(-${offset}px)`;
    }

    // Event listener for scroll events
    let lastScrollTop = 0;
    window.addEventListener('wheel', (e) => {
        const scrollTop = window.scrollY || window.pageYOffset;
        if (scrollTop > lastScrollTop) {
            changeSlide("down"); // Scroll down
        } else {
            changeSlide("up"); // Scroll up
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Prevent negative scroll values
    });
});
