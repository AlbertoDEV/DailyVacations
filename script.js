document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel-container');

    carousels.forEach(carouselContainer => {
        const carousel = carouselContainer.querySelector('.carousel');
        const prevButton = carouselContainer.querySelector('.prev');
        const nextButton = carouselContainer.querySelector('.next');
        const images = carousel.querySelectorAll('.carousel-img');

        let currentIndex = 0;

        function updateCarousel() {
            carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
            updateCarousel();
        });

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
            updateCarousel();
        });

        // Aplicar rotación inicial a las imágenes
        images.forEach((img, index) => {
            img.style.setProperty('--i', index);
        });
    });

    // Rotación de las hojas de cuaderno
    const sheets = document.querySelectorAll('.notebook-sheet');
    sheets.forEach((sheet, index) => {
        sheet.style.setProperty('--i', index);
    });
});