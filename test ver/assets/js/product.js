document.addEventListener('DOMContentLoaded', function() {
    // Handle star rating selection
    const ratingSelect = document.getElementById('rating');
    const starDisplay = document.createElement('div');
    starDisplay.classList.add('star-rating');
    ratingSelect.parentNode.insertBefore(starDisplay, ratingSelect);

    function updateStarRating() {
        const rating = ratingSelect.value;
        starDisplay.innerHTML = '★'.repeat(rating) + '☆'.repeat(5 - rating);
    }

    ratingSelect.addEventListener('change', updateStarRating);
    updateStarRating(); // Initial display

    // Handle review submission
    const reviewForm = document.querySelector('form');
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const rating = ratingSelect.value;
        const comment = document.getElementById('comment').value;
        
        // Here you would typically send this data to a server
        // For now, we'll just add it to the page
        addReview(rating, comment);
        
        // Clear the form
        reviewForm.reset();
        updateStarRating();
    });

    function addReview(rating, comment) {
        const reviewsContainer = document.querySelector('.bg-white.shadow-lg.rounded-lg.overflow-hidden.p-6');
        const newReview = document.createElement('div');
        newReview.classList.add('mb-4', 'pb-4', 'border-b');
        newReview.innerHTML = `
            <div class="flex items-center mb-2">
                <span class="text-yellow-400 mr-2">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</span>
                <span class="font-semibold">Anonymous User</span>
            </div>
            <p>${comment}</p>
        `;
        reviewsContainer.insertBefore(newReview, reviewForm.parentNode);
    }

    // Handle "Add to Cart" button
    const addToCartBtn = document.querySelector('button.bg-blue-600');
    addToCartBtn.addEventListener('click', function() {
        alert('Product added to cart!');
        // Here you would typically update a cart count or open a cart modal
    });

    // Implement a simple image zoom on hover for the product image
    const productImage = document.querySelector('.md\\:flex-shrink-0 img');
    productImage.addEventListener('mousemove', function(e) {
        const zoomer = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - zoomer.x) / zoomer.width * 100;
        const y = (e.clientY - zoomer.y) / zoomer.height * 100;
        this.style.transformOrigin = `${x}% ${y}%`;
        this.style.transform = 'scale(1.5)';
    });
    productImage.addEventListener('mouseleave', function() {
        this.style.transformOrigin = 'center center';
        this.style.transform = 'scale(1)';
    });
});