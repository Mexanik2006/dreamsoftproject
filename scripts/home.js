document.addEventListener("DOMContentLoaded", () => {
    const carouselContainer = document.querySelector('.carousel-container');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    const currentSlideElement = document.querySelector('.current-slide');
    const totalSlidesElement = document.querySelector('.total-slides');
    let currentIndex = 0;
    let autoSlideInterval = null;
    const slideIntervalTime = 4000;
    const slideHeight = 742; // Fixed height in pixels

    totalSlidesElement.textContent = carouselItems.length.toString().padStart(2, '0');

    function updateSlide(index) {
        currentIndex = index;
        const offset = currentIndex * slideHeight; // Use fixed height instead of window.innerHeight
        carouselContainer.style.transform = `translateY(-${offset}px)`;

        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === currentIndex);
        });

        currentSlideElement.textContent = (currentIndex + 1).toString().padStart(2, '0');
    }

    // Rest of your JavaScript remains the same
    function getNextIndex() {
        if (currentIndex === 0) return 1;
        if (currentIndex === 1 && lastDirection === 'up') return 2;
        if (currentIndex === 2) return 1;
        if (currentIndex === 1 && lastDirection === 'down') return 0;
        return 0;
    }

    let lastDirection = 'up';

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            const nextIndex = getNextIndex();
            if (nextIndex > currentIndex) {
                lastDirection = 'up';
            } else {
                lastDirection = 'down';
            }
            updateSlide(nextIndex);
        }, slideIntervalTime);
    }

    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    }

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopAutoSlide();
            updateSlide(index);
            setTimeout(startAutoSlide, 10000);
        });
    });

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.querySelector('i').classList.toggle('fa-bars');
        hamburger.querySelector('i').classList.toggle('fa-times');
    });

    updateSlide(0);
    startAutoSlide();
});