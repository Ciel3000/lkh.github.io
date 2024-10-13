 // products
    let products = [
        {
            id: 1,
            name: 'Professional Cue',
            price: 199.99,
            rating: 4.8,
            category: 'Cues',
            image: 'assets/icons/cue1.webp',
            description: 'High-quality professional billiards cue',
            reviews: []
        },
        {
            id: 2,
            name: 'Premium Ball Set',
            price: 149.99,
            rating: 4.8,
            category: 'Balls',
            image:'assets/icons/PremiumBallSet1.webp',
            description: 'Tournament-grade billiards ball set',
            reviews: []
        },
        {
            id: 3,
            name: 'Deluxe Cue Case',
            price: 79.99,
            rating: 4.5,
            category: 'Accessories',
            image: 'assets/icons/DeluxeCueCase1.webp',
            description: 'Protective case for your valuable cues',
            reviews: []
        },
        {
            id: 4,
            name: 'Premium Chalk Set',
            price: 12.99,
            rating: 4.8,
            category: 'Chalk',
            image: 'assets/icons/PremiumChalkSet1.webp',
            description: 'High-performance chalk for better grip',
            reviews: []
        }
    ];

    let categories = ['Cues', 'Balls', 'Accessories'];
    let users = [];
    let currentUser = null;

    // DOM Elements
    const productGrid = document.querySelector('.product-grid');
    const cartBtn = document.getElementById('cartBtn');
    const cartModal = document.getElementById('cartModal');
    const closeBtn = document.getElementById('closeBtn');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartCount = document.getElementById('cartCount');
    const searchBtn = document.getElementById('searchBtn');
    const searchModal = document.getElementById('searchModal');
    const searchCloseBtn = document.getElementById('searchCloseBtn');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const profileBtn = document.getElementById('profileBtn');
    const loginPopup = document.getElementById('loginPopup');
    const loginCloseBtn = document.getElementById('loginCloseBtn');
    const signupPopup = document.getElementById('signupPopup');
    const signupCloseBtn = document.getElementById('signupCloseBtn');
    const categorySelect = document.getElementById('categorySelect');

    let cart = [];


    // Display products
    function displayProducts(productsToShow = products) {
        productGrid.innerHTML = productsToShow.map(product => `
            <div class="product-card">
                <a href="pages/cues/product${product.id}.html" class="product-link">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-content">
                        <h3>${product.name}</h3>
                        <p>Rating: ${product.rating}/5</p>
                        <p>$${product.price.toFixed(2)}</p>
                    </div>
                </a>
                <button class="btn add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                <button class="btn btn view-reviews"  onclick="showReviews(${product.id})">Reviews</button>
            </div>
        `).join('');
    }
    
    // Display popular products
    function displayPopularProducts() {
        const popularProducts = products
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 4);
        const popularProductsSection = document.querySelector('.popular-products');
        popularProductsSection.innerHTML = `
            <h2>Popular Products</h2>
            <div class="product-grid">
                ${popularProducts.map(product => `
                    <div class="product-card">
                        <img src="${product.image}" alt="${product.name}">
                        <div class="product-content">
                            <h3>${product.name}</h3>
                            <p>Rating: ${product.rating.toFixed(1)}/5</p>
                            <p>$${product.price.toFixed(2)}</p>
                            <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
                            <button class="btn"  onclick="showReviews(${product.id})">Reviews</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // Add to cart
    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }

        updateCartCount();
    }

    // Update cart count
    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    // Display cart
    function displayCart() {
        if (cart.length === 0) {
            cartItems.innerHTML = '<p>Your cart is empty</p>';
            cartTotal.innerHTML = '';
            return;
        }

        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <h3>${item.name}</h3>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `).join('');

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.innerHTML = `
            <h3>Total: $${total.toFixed(2)}</h3>
            <button onclick="checkout()">Checkout</button>
        `;
    }

    // Remove from cart
    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCartCount();
        displayCart();
    }

    // Checkout
    function checkout() {
        if (!currentUser) {
            alert('Please log in to complete your purchase.');
            showLoginPopup();
        } else {
            // Implement checkout logic here
            alert('Thank you for your purchase!');
            cart = [];
            updateCartCount();
            displayCart();
        }
    }

    // Open search modal
    searchBtn.addEventListener('click', () => {
        searchModal.style.display = 'block';
        searchInput.focus();
    });

    // Search functionality
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        if (query.trim() === '') {
            searchResults.innerHTML = '<p>Please enter a search term.</p>';
            return;
        }

        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        );

        if (filteredProducts.length > 0) {
            searchResults.innerHTML = filteredProducts.map(product => `
                <div class="search-item">
                    <img src="${product.image}" alt="${product.name}" />
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p>$${product.price.toFixed(2)}</p>
                    <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            `).join('');
        } else {
            searchResults.innerHTML = '<p>No products found.</p>';
        }
    });


    // Close search modal
    searchCloseBtn.addEventListener('click', () => {
        searchModal.style.display = 'none';
        searchResults.innerHTML = '';
    });


    // Close modals when clicking outside
    window.addEventListener('click', (event) => {
        // Close search modal
        if (event.target === searchModal) {
            searchModal.style.display = 'none';
            searchResults.innerHTML = '';
        }
        // Close login modal
        if (event.target === loginPopup) {
            loginPopup.style.display = 'none';
        }
        // Close signup modal
        if (event.target === signupPopup) {
            signupPopup.style.display = 'none';
        }
        // Close cart modal
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // Show reviews
    function showReviews(productId) {
        const product = products.find(p => p.id === productId);
        const reviewsModal = document.createElement('div');
        reviewsModal.className = 'modal';
        reviewsModal.innerHTML = `
            <div class="modal-content">
                <h2>Reviews for ${product.name}</h2>
                ${product.reviews.map(review => `
                    <div class="review">
                        <p><strong>${review.user}</strong>: ${review.comment}</p>
                        <p>Rating: ${review.rating}/5</p>
                    </div>
                `).join('') || '<p>No reviews yet.</p>'}
                ${currentUser ? `
                    <h3>Add a review</h3>
                    <form onsubmit="addReview(event, ${productId})">
                        <textarea id="reviewComment" required></textarea>
                        <select id="reviewRating" required>
                            <option value="">Select rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <button type="submit">Submit Review</button>
                    </form>
                ` : '<p>Please log in to add a review.</p>'}
                <button onclick="closeModal(this.parentElement.parentElement)">Close</button>
            </div>
        `;
        document.body.appendChild(reviewsModal);
    }

    // Add review
    function addReview(event, productId) {
        event.preventDefault();
        const comment = document.getElementById('reviewComment').value;
        const rating = parseInt(document.getElementById('reviewRating').value);
        const product = products.find(p => p.id === productId);
        product.reviews.push({ user: currentUser.username, comment, rating });
        product.rating = product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length;
        closeModal(event.target.closest('.modal'));
        displayProducts();
    }

    // Close modal
    function closeModal(modal) {
        document.body.removeChild(modal);
    }

    // User login
    function login(username, password) {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            currentUser = user;
            updateProfileButton();
            closeModal(loginPopup);
        } else {
            alert('Invalid username or password');
        }
    }

    // User signup
    function signup(username, password) {
        if (users.some(u => u.username === username)) {
            alert('Username already exists');
        } else {
            const newUser = { username, password };
            users.push(newUser);
            currentUser = newUser;
            updateProfileButton();
            closeModal(signupPopup);
        }
    }

    // Update profile button
    function updateProfileButton() {
        profileBtn.textContent = currentUser ? currentUser.username : 'Login';
    }

    // Show login popup
    function showLoginPopup() {
        loginPopup.style.display = 'block';
    }

    // Show signup popup
    function showSignupPopup() {
        signupPopup.style.display = 'block';
    }

    // Filter products by category
    function filterByCategory() {
        const selectedCategory = categorySelect.value;
        const filteredProducts = selectedCategory === 'all' 
            ? products 
            : products.filter(product => product.category === selectedCategory);
        displayProducts(filteredProducts);
    }

    

    // Initialize
    function init() {
        displayProducts();
        displayPopularProducts();
        updateCartCount();
        updateProfileButton();
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });
    }

    // Event listeners
    cartBtn.addEventListener('click', () => {
        cartModal.style.display = 'block';
        displayCart();
    });

    // Close modals
    closeBtn.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    profileBtn.addEventListener('click', () => {
        if (currentUser) {
            // Show user profile or logout option
        } else {
            showLoginPopup();
        }
    });

    categorySelect.addEventListener('change', filterByCategory);

    // Initialize the application
    init();