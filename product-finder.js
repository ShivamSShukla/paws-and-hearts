// Product Finder Automation
// Discovers trending and viral pet products from Amazon
// Finds best-sellers and high-review products automatically

const axios = require('axios');

// Sample product data (in production, use Amazon Product Advertising API)
const sampleProducts = [
    {
        id: 1,
        title: "Premium Cat Tower with Scratching Posts - 6 Levels",
        category: "cat",
        type: "accessories",
        price: 89.99,
        rating: 4.8,
        reviews: 2547,
        asin: "B08XYZ1234",
        image: "https://via.placeholder.com/300x250/FFE5D9/FF8A5B?text=Cat+Tower",
        trending: true,
        bestseller: true,
        commission: 3.60,
        addedDate: new Date().toISOString()
    },
    {
        id: 2,
        title: "Interactive Dog Puzzle Toy - Slow Feeder Bowl",
        category: "dog",
        type: "toys",
        price: 24.99,
        rating: 4.7,
        reviews: 1823,
        asin: "B08ABC5678",
        image: "https://via.placeholder.com/300x250/D4F1F4/6BC4D9?text=Dog+Toy",
        trending: true,
        bestseller: true,
        commission: 1.00,
        addedDate: new Date().toISOString()
    },
    {
        id: 3,
        title: "Automatic Cat Feeder with Camera & WiFi - 5L",
        category: "cat",
        type: "food",
        price: 49.99,
        rating: 4.6,
        reviews: 3201,
        asin: "B08DEF9012",
        image: "https://via.placeholder.com/300x250/FFF8F0/FFC857?text=Cat+Feeder",
        trending: true,
        bestseller: false,
        commission: 2.00,
        addedDate: new Date().toISOString()
    },
    {
        id: 4,
        title: "Orthopedic Memory Foam Dog Bed - Large/XL",
        category: "dog",
        type: "accessories",
        price: 69.99,
        rating: 4.9,
        reviews: 4521,
        asin: "B08GHI3456",
        image: "https://via.placeholder.com/300x250/E8F5E9/7BC67B?text=Dog+Bed",
        trending: true,
        bestseller: true,
        commission: 2.80,
        addedDate: new Date().toISOString()
    },
    {
        id: 5,
        title: "Cat Water Fountain Stainless Steel - 2L Automatic",
        category: "cat",
        type: "accessories",
        price: 34.99,
        rating: 4.7,
        reviews: 2891,
        asin: "B08JKL7890",
        image: "https://via.placeholder.com/300x250/FFE5D9/FF8A5B?text=Water+Fountain",
        trending: true,
        bestseller: false,
        commission: 1.40,
        addedDate: new Date().toISOString()
    },
    {
        id: 6,
        title: "Heavy Duty Dog Leash - Reflective for Large Dogs",
        category: "dog",
        type: "accessories",
        price: 19.99,
        rating: 4.8,
        reviews: 1654,
        asin: "B08MNO1234",
        image: "https://via.placeholder.com/300x250/D4F1F4/6BC4D9?text=Dog+Leash",
        trending: false,
        bestseller: true,
        commission: 0.80,
        addedDate: new Date().toISOString()
    }
];

module.exports = async (req, res) => {
    try {
        const category = req.query.category || 'all'; // cat, dog, or all
        const minRating = parseFloat(req.query.minRating) || 4.5;
        const sortBy = req.query.sortBy || 'reviews'; // reviews, rating, price
        
        // In production, call Amazon Product Advertising API
        // const amazonProducts = await fetchAmazonBestSellers(category);
        
        // Filter products
        let filteredProducts = sampleProducts;
        
        if (category !== 'all') {
            filteredProducts = filteredProducts.filter(p => p.category === category);
        }
        
        filteredProducts = filteredProducts.filter(p => p.rating >= minRating);
        
        // Sort products
        filteredProducts.sort((a, b) => {
            if (sortBy === 'reviews') return b.reviews - a.reviews;
            if (sortBy === 'rating') return b.rating - a.rating;
            if (sortBy === 'price') return b.price - a.price;
            return 0;
        });
        
        const response = {
            status: 'success',
            lastUpdated: new Date().toISOString(),
            totalProducts: filteredProducts.length,
            products: filteredProducts,
            insights: {
                bestsellerCount: filteredProducts.filter(p => p.bestseller).length,
                trendingCount: filteredProducts.filter(p => p.trending).length,
                averageRating: (filteredProducts.reduce((sum, p) => sum + p.rating, 0) / filteredProducts.length).toFixed(2),
                totalPotentialCommission: filteredProducts.reduce((sum, p) => sum + p.commission, 0).toFixed(2)
            },
            recommendations: [
                {
                    asin: filteredProducts[0].asin,
                    reason: 'Highest number of reviews - very popular',
                    action: 'Feature on homepage'
                },
                {
                    asin: filteredProducts.find(p => p.bestseller && p.trending)?.asin,
                    reason: 'Both bestseller and trending',
                    action: 'Add to trending section'
                }
            ]
        };
        
        res.status(200).json(response);
        
    } catch (error) {
        console.error('Product Finder Error:', error);
        res.status(500).json({ 
            error: 'Failed to fetch trending products',
            message: error.message 
        });
    }
};

// Helper function to fetch from Amazon Product Advertising API
async function fetchAmazonBestSellers(category) {
    // This would use the Amazon Product Advertising API
    // Requires AWS credentials and Product Advertising API keys
    
    // Example structure (not actual working code):
    // const ProductAdvertisingAPI = require('paapi5-nodejs-sdk');
    // const client = ProductAdvertisingAPI.ApiClient.instance;
    // const api = new ProductAdvertisingAPI.DefaultApi();
    
    // Return sample data for now
    return sampleProducts;
}
