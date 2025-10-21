document.addEventListener('DOMContentLoaded', () => {
    const book = document.getElementById('book');
    const pages = book.querySelectorAll('.page');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');

    let currentPage = 0;

    const showPage = (pageNumber) => {
        // A "pageNumber" of X means that pages with an index less than X should be flipped.
        pages.forEach((page, index) => {
            if (index < pageNumber) {
                page.classList.add('flipped');
            } else {
                page.classList.remove('flipped');
            }
            // Dynamic z-index for correct stacking
            if (page.classList.contains('flipped')) {
                // Flipped pages (on the left) stack from low to high
                page.style.zIndex = index;
            } else {
                // Unflipped pages (on the right) stack from high to low
                page.style.zIndex = pages.length - index;
            }
        });
    };

    const updateNav = () => {
        if (currentPage === 0) {
            prevPageBtn.style.display = 'none';
        } else {
            prevPageBtn.style.display = 'block';
        }
        // You can click "next" until all pages are flipped.
        if (currentPage >= pages.length) {
            nextPageBtn.style.display = 'none';
        } else {
            nextPageBtn.style.display = 'block';
        }
    };

    nextPageBtn.addEventListener('click', () => {
        if (currentPage < pages.length) {
            const pageToTurn = pages[currentPage];
            pageToTurn.classList.add('turning');

            setTimeout(() => {
                pageToTurn.classList.remove('turning');
            }, 800); // Must match animation duration

            currentPage++;
            showPage(currentPage);
            updateNav();
        }
    });

    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 0) {
            const pageToTurn = pages[currentPage - 1];
            pageToTurn.classList.add('turning');

            setTimeout(() => {
                pageToTurn.classList.remove('turning');
            }, 800); // Must match animation duration

            currentPage--;
            showPage(currentPage);
            updateNav();
        }
    });

    // Initial setup
    showPage(-1); // Start with the book closed
    updateNav();

    // Modal Logic
    const modal = document.getElementById('photo-modal');
    const modalImage = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');
    const closeModal = document.querySelector('.close-modal');
    const photoItems = document.querySelectorAll('.photo-item'); // Target the whole item

    photoItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img && img.src) { // Only open modal if there is an image
                modal.classList.add('show'); // Use class to show
                modalImage.src = img.src;
                modalCaption.innerHTML = img.dataset.description;
            }
        });
    });

    const hideModal = () => {
        modal.classList.remove('show'); // Use class to hide
    };

    closeModal.addEventListener('click', hideModal);
    modal.addEventListener('click', (e) => {
        // Close if clicking on the background, but not the image itself
        if (e.target === modal) {
            hideModal();
        }
    });
});
