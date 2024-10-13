document.addEventListener('DOMContentLoaded', function() {
    const reviewForm = document.getElementById('reviewForm');
    const reviewList = document.getElementById('reviewList');
    const commentForm = document.getElementById('commentForm');
    const commentList = document.getElementById('commentList');

    // Handle review submission
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const reviewerName = document.getElementById('reviewerName').value;
        const reviewRating = document.querySelector('input[name="rating"]:checked').value;
        const reviewText = document.getElementById('reviewText').value;

        const newReview = document.createElement('li');
        newReview.classList.add('review-item');
        newReview.innerHTML = `<span class="reviewer-name">${reviewerName}</span>
                                <span class="review-rating">${'★'.repeat(reviewRating)}${'☆'.repeat(5 - reviewRating)}</span>
                                <p class="review-comment">${reviewText}</p>`;

        reviewList.appendChild(newReview);

        // Reset form
        reviewForm.reset();
    });

    // Handle comment submission
    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const commenterName = document.getElementById('commenterName').value;
        const commentText = document.getElementById('commentText').value;

        const newComment = document.createElement('li');
        newComment.classList.add('comment-item');
        newComment.innerHTML = `<strong>${commenterName}:</strong> ${commentText}`;

        commentList.appendChild(newComment);

        // Reset form
        commentForm.reset();
    });
});
