// ===== Configuration =====
const AMAZON_ASSOCIATE_TAG = 'YOUR-ASSOCIATE-TAG-20'; // Replace with your actual tag
const API_BASE_URL = '/api';

// ===== Sample Products Database =====
// This will be loaded from products-database.json in production
let productsDatabase = [
    {
        id: 1,
        title: "Premium Cat Tower with Scratching Posts",
        category: "cat",
        type: "accessories",
        price: 89.99,
        rating: 4.8,
        reviews: 2547,
        image: "https://via.placeholder.com/300x250/FFE5D9/FF8A5B?text=Cat+Tower",
        asin: "B07SAMPLE1",
        trending: true,
        commission: 3.60
    },
    {
        id: 2,
        title: "Interactive Dog Puzzle Toy",
        category: "dog",
        type: "toys",
        price: 24.99,
        rating: 4.7,
        reviews: 1823,
        image: "https://via.placeholder.com/300x250/D4F1F4/6BC4D9?text=Dog+Toy",
        asin: "B07SAMPLE2",
        trending: true,
        commission: 1.00
    },
    {
        id: 3,
        title: "Automatic Cat Feeder with Timer",
        category: "cat",
        type: "food",
        price: 49.99,
        rating: 4.6,
        reviews: 3201,
        image: "https://via.placeholder.com/300x250/FFF8F0/FFC857?text=Cat+Feeder",
        asin: "B07SAMPLE3",
        trending: true,
        commission: 2.00
    },
    {
        id: 4,
        title: "Orthopedic Dog Bed - Large",
        category: "dog",
        type: "accessories",
        price: 69.99,
        rating: 4.9,
        reviews: 4521,
        image: "https://via.placeholder.com/300x250/E8F5E9/7BC67B?text=Dog+Bed",
        asin: "B07SAMPLE4",
        trending: true,
        commission: 2.80
    }
];

// ===== Impact Data =====
let impactData = {
    totalRaised: 2847.50,
    mealsProvided: 1893,
    petsHelped: 247,
    purchasesMade: 89,
    monthlyRaised: 347.20,
    monthlyGoal: 500
};

// ===== Initialize on Page Load =====
document.addEventListener('DOMContentLoaded', () => {
    // Load impact stats
    loadImpactStats();
    
    // Page-specific initializations
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (currentPage === 'index.html' || currentPage === '') {
        loadFeaturedProducts();
        loadRecentImpact();
        animateCounters();
    } else if (currentPage === 'products.html') {
        loadAllProducts();
        setupFilters();
        setupSearch();
    } else if (currentPage === 'impact.html') {
        loadImpactPage();
    }
});

// ===== Animate Number Counters =====
function animateCounters() {
    const counters = [
        { id: 'meals-provided', target: impactData.mealsProvided, duration: 2000 },
        { id: 'pets-helped', target: impactData.petsHelped, duration: 2000 },
        { id: 'amount-raised', target: impactData.totalRaised, duration: 2000 }
    ];
    
    counters.forEach(counter => {
        const element = document.getElementById(counter.id);
        if (!element) return;
        
        let current = 0;
        const increment = counter.target / (counter.duration / 16);
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= counter.target) {
                element.textContent = Math.round(counter.target);
                clearInterval(timer);
            } else {
                element.textContent = Math.round(current);
            }
        }, 16);
    });
}

// ===== Load Impact Statistics =====
function loadImpactStats() {
    // Update all impact stat elements on the page
    const statElements = {
        'meals-provided': impactData.mealsProvided,
        'pets-helped': impactData.petsHelped,
        'amount-raised': impactData.totalRaised,
        'total-raised': impactData.totalRaised,
        'purchases-made': impactData.purchasesMade,
        'total-meals-banner': impactData.mealsProvided,
        'month-raised': impactData.monthlyRaised,
        'month-goal': impactData.monthlyGoal
    };
    
    Object.keys(statElements).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = statElements[id];
        }
    });
    
    // Update progress bar
    const progressPercent = (impactData.monthlyRaised / impactData.monthlyGoal * 100).toFixed(0);
    const progressFill = document.getElementById('monthly-progress-fill');
    const progressPercentElement = document.getElementById('progress-percent');
    
    if (progressFill) {
        setTimeout(() => {
            progressFill.style.width = progressPercent + '%';
        }, 500);
    }
    
    if (progressPercentElement) {
        progressPercentElement.textContent = progressPercent;
    }
}

// ===== Load Featured Products (Homepage) =====
function loadFeaturedProducts() {
    const grid = document.getElementById('featured-products-grid');
    if (!grid) return;
    
    // Show only trending products
    const featuredProducts = productsDatabase.filter(p => p.trending).slice(0, 4);
    
    grid.innerHTML = '';
    featuredProducts.forEach(product => {
        grid.appendChild(createProductCard(product));
    });
}

// ===== Load All Products (Products Page) =====
function loadAllProducts(filterCategory = 'all', searchTerm = '') {
    const grid = document.getElementById('products-grid');
    if (!grid) return;
    
    // Filter products
    let filteredProducts = productsDatabase;
    
    if (filterCategory !== 'all') {
        filteredProducts = filteredProducts.filter(p => 
            p.category === filterCategory || p.type === filterCategory
        );
    }
    
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(p =>
            p.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    // Update products count
    const countElement = document.getElementById('products-count');
    if (countElement) {
        countElement.textContent = filteredProducts.length;
    }
    
    // Show/hide no products message
    const noProducts = document.getElementById('no-products');
    if (filteredProducts.length === 0) {
        grid.innerHTML = '';
        if (noProducts) noProducts.style.display = 'block';
        return;
    } else {
        if (noProducts) noProducts.style.display = 'none';
    }
    
    // Render products
    grid.innerHTML = '';
    filteredProducts.forEach(product => {
        grid.appendChild(createProductCard(product));
    });
}

// ===== Create Product Card =====
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const amazonLink = `https://www.amazon.com/dp/${product.asin}?tag=${AMAZON_ASSOCIATE_TAG}`;
    const mealsGenerated = Math.floor(product.commission / 2.5); // Assuming $2.50 per meal
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="product-image">
        <div class="product-info">
            <div class="product-category">${product.category === 'cat' ? '🐱 CAT' : '🐶 DOG'}</div>
            <h3 class="product-title">${product.title}</h3>
            <div class="product-rating">
                <span class="stars">${'⭐'.repeat(Math.floor(product.rating))}</span>
                <span>(${product.reviews.toLocaleString()})</span>
            </div>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <div class="product-impact">
                💚 Helps feed ${mealsGenerated} street ${mealsGenerated > 1 ? 'pets' : 'pet'}
            </div>
            <a href="${amazonLink}" target="_blank" rel="noopener" class="btn btn-primary product-cta">
                Shop on Amazon
            </a>
        </div>
    `;
    
    return card;
}

// ===== Setup Product Filters =====
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Filter products
            const category = button.getAttribute('data-category');
            const searchTerm = document.getElementById('product-search')?.value || '';
            loadAllProducts(category, searchTerm);
        });
    });
}

// ===== Setup Search Functionality =====
function setupSearch() {
    const searchInput = document.getElementById('product-search');
    const searchBtn = document.querySelector('.search-btn');
    
    if (!searchInput) return;
    
    const performSearch = () => {
        const searchTerm = searchInput.value;
        const activeFilter = document.querySelector('.filter-btn.active');
        const category = activeFilter ? activeFilter.getAttribute('data-category') : 'all';
        loadAllProducts(category, searchTerm);
    };
    
    searchInput.addEventListener('input', performSearch);
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
}

// ===== Load Recent Impact Stories =====
function loadRecentImpact() {
    const gallery = document.getElementById('recent-impact-gallery');
    if (!gallery) return;
    
    const impactStories = [
        {
            date: 'February 5, 2026',
            description: 'Provided 45 meals to street cats in downtown area',
            image: 'https://via.placeholder.com/300x200/FFE5D9/FF8A5B?text=Street+Cats'
        },
        {
            date: 'February 1, 2026',
            description: 'Fed 12 dogs at the riverside community',
            image: 'https://via.placeholder.com/300x200/D4F1F4/6BC4D9?text=Dogs+Fed'
        },
        {
            date: 'January 28, 2026',
            description: 'Emergency food delivery for abandoned kitten colony',
            image: 'https://via.placeholder.com/300x200/FFF8F0/FFC857?text=Kittens+Rescued'
        }
    ];
    
    gallery.innerHTML = '';
    impactStories.forEach(story => {
        const card = document.createElement('div');
        card.className = 'impact-card';
        card.innerHTML = `
            <img src="${story.image}" alt="${story.description}" class="impact-image">
            <div class="impact-content">
                <div class="impact-date">${story.date}</div>
                <p class="impact-description">${story.description}</p>
            </div>
        `;
        gallery.appendChild(card);
    });
}

// ===== Load Impact Page =====
function loadImpactPage() {
    loadImpactStats();
    loadReceipts();
    loadGallery();
    loadTimeline();
}

// ===== Load Receipt Images =====
function loadReceipts() {
    const grid = document.getElementById('receipts-grid');
    if (!grid) return;
    
    const receipts = [
        {
            date: 'Feb 5, 2026',
            amount: 127.50,
            items: 'Pet food from local supplier',
            meals: 51,
            image: 'https://via.placeholder.com/300x200/FFFFFF/000000?text=Receipt+Image'
        },
        {
            date: 'Feb 1, 2026',
            amount: 89.20,
            items: 'Dry cat food (10kg)',
            meals: 36,
            image: 'https://via.placeholder.com/300x200/FFFFFF/000000?text=Receipt+Image'
        },
        {
            date: 'Jan 28, 2026',
            amount: 56.80,
            items: 'Dog food and treats',
            meals: 23,
            image: 'https://via.placeholder.com/300x200/FFFFFF/000000?text=Receipt+Image'
        }
    ];
    
    grid.innerHTML = '';
    receipts.forEach(receipt => {
        const card = document.createElement('div');
        card.className = 'receipt-card';
        card.innerHTML = `
            <div class="receipt-header">
                <span class="receipt-date">${receipt.date}</span>
                <span class="receipt-amount">$${receipt.amount.toFixed(2)}</span>
            </div>
            <div class="receipt-details">
                <p><strong>Items:</strong> ${receipt.items}</p>
                <p><strong>Meals Generated:</strong> ${receipt.meals}</p>
            </div>
            <img src="${receipt.image}" alt="Receipt" class="receipt-image">
        `;
        grid.appendChild(card);
    });
}

// ===== Load Photo Gallery =====
function loadGallery() {
    const gallery = document.getElementById('gallery-grid');
    if (!gallery) return;
    
    const photos = [
        {
            caption: 'Happy street cat enjoying fresh food',
            image: 'https://via.placeholder.com/300x300/FFE5D9/FF8A5B?text=Street+Cat'
        },
        {
            caption: 'Dog community at riverside eating together',
            image: 'https://via.placeholder.com/300x300/D4F1F4/6BC4D9?text=Dogs+Eating'
        },
        {
            caption: 'Kitten rescued and fed',
            image: 'https://via.placeholder.com/300x300/FFF8F0/FFC857?text=Kitten'
        },
        {
            caption: 'Street dogs waiting for their meal',
            image: 'https://via.placeholder.com/300x300/E8F5E9/7BC67B?text=Waiting+Dogs'
        }
    ];
    
    gallery.innerHTML = '';
    photos.forEach(photo => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `
            <img src="${photo.image}" alt="${photo.caption}" class="gallery-image">
            <div class="gallery-caption">${photo.caption}</div>
        `;
        gallery.appendChild(item);
    });
}

// ===== Load Timeline =====
function loadTimeline() {
    const timeline = document.getElementById('impact-timeline');
    if (!timeline) return;
    
    const events = [
        {
            date: 'February 2026',
            title: 'Reached 2,000 meals milestone',
            description: 'Thanks to your shopping, we crossed 2,000 meals provided to street pets!'
        },
        {
            date: 'January 2026',
            title: 'Expanded to new areas',
            description: 'Started feeding street pets in two additional neighborhoods.'
        },
        {
            date: 'December 2025',
            title: 'First 1,000 meals',
            description: 'Celebrated our first 1,000 meals provided to homeless animals.'
        },
        {
            date: 'November 2025',
            title: 'Website launched',
            description: 'Paws & Hearts went live, beginning our mission to help street pets.'
        }
    ];
    
    timeline.innerHTML = '';
    events.forEach(event => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.innerHTML = `
            <div class="timeline-date">${event.date}</div>
            <div class="timeline-content">
                <h3>${event.title}</h3>
                <p>${event.description}</p>
            </div>
        `;
        timeline.appendChild(item);
    });
}

// ===== Fetch Products from API (for future automation) =====
async function fetchTrendingProducts() {
    try {
        const response = await fetch(`${API_BASE_URL}/product-finder`);
        if (response.ok) {
            const data = await response.json();
            productsDatabase = data.products;
            loadAllProducts();
        }
    } catch (error) {
        console.log('Using local products database');
    }
}

// ===== Track Clicks (for analytics) =====
function trackProductClick(productId, asin) {
    // This can be extended to send data to your analytics
    console.log(`Product clicked: ${productId} (${asin})`);
}

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

console.log('🐾 Paws & Hearts loaded successfully! Every purchase makes a difference! ❤️');
