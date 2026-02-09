# 🐾 Paws & Hearts - Help Street Pets Through Shopping

> Every purchase feeds a street cat or dog. 100% transparent. 100% for the animals.

A beautiful, fully-functional Amazon affiliate website built with compassion. Shop quality pet products while automatically generating meals for homeless street cats and dogs.

## ✨ Features

### 🎯 Core Features
- ✅ **Beautiful, Responsive Design** - Warm, trustworthy UI that converts
- ✅ **Amazon Affiliate Integration** - Earn commissions from every purchase
- ✅ **100% Transparency** - Every receipt, every meal, fully documented
- ✅ **Impact Tracking** - Real-time stats showing meals provided & pets helped
- ✅ **Product Catalog** - Curated trending pet products
- ✅ **Filter & Search** - Easy product discovery

### 🤖 Automation Features
- 🔄 **SEO Keyword Finder** - Automatically discovers trending pet keywords (USA/UK focused)
- 🔄 **Product Discovery** - Finds viral Amazon products automatically
- 🔄 **Pinterest Automation** - Auto-shares products with emotional captions
- 🔄 **Receipt Tracking** - Logs all food purchases for transparency

## 🚀 Quick Start (Deploy in 5 minutes!)

### Step 1: Get Your Amazon Associate Tag
1. Sign up at [Amazon Associates](https://affiliate-program.amazon.com)
2. Get your Associate Tag (looks like: `yourname-20`)
3. Keep this handy!

### Step 2: Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Clone or download this project
cd paws-and-hearts

# Deploy!
vercel
```

### Step 3: Add Your Amazon Tag

After deployment, go to Vercel Dashboard:
1. Select your project
2. Go to **Settings** → **Environment Variables**
3. Add: `AMAZON_ASSOCIATE_ID` = `yourname-20`
4. Click **Save**

**That's it!** Your website is live and earning commissions! 🎉

## 📁 Project Structure

```
paws-and-hearts/
├── index.html              # Homepage with hero & stats
├── products.html           # Product catalog with filters
├── impact.html             # Transparency & receipts page
├── styles.css              # Beautiful, warm design
├── script.js               # Frontend interactions
├── api/
│   ├── seo-keywords.js     # SEO automation
│   ├── product-finder.js   # Product discovery
│   ├── pinterest-share.js  # Pinterest automation
│   └── receipt-tracker.js  # Impact tracking
├── products-database.json  # Product catalog
├── impact-log.json         # Transparency data
├── package.json            # Dependencies
├── vercel.json             # Vercel config
└── .env.example            # Environment variables template
```

## 🔑 Environment Variables

### Required (for earning commissions):
- `AMAZON_ASSOCIATE_ID` - Your Amazon Associate Tag

### Optional (for automation):
- `AMAZON_API_KEY` - Amazon Product Advertising API
- `AMAZON_API_SECRET` - API Secret
- `PINTEREST_ACCESS_TOKEN` - Pinterest API token
- `GOOGLE_TRENDS_API_KEY` - Google Trends API

## 📊 How It Works

### The Flow:
1. **Visitor clicks product link** → Redirects to Amazon with your tag
2. **They make a purchase** → Amazon tracks with your Associate Tag
3. **Amazon pays commission** → Usually 1-4% of purchase price
4. **You buy pet food** → 100% of commission goes to feeding street pets
5. **Upload receipt** → Via the receipt tracker API
6. **Transparency** → Receipts and photos displayed on impact page

### Commission Tracking:
- Check your Amazon Associates dashboard for earnings
- Commissions are paid ~60 days after purchase
- Once received, buy pet food and upload receipt to the site

## 🎨 Customization

### Update Your Associate Tag in Multiple Files:

**script.js** (Line 2):
```javascript
const AMAZON_ASSOCIATE_TAG = 'YOUR-TAG-20'; // Replace this!
```

### Add New Products:

Edit `products-database.json`:
```json
{
  "id": 9,
  "title": "Your Product Title",
  "category": "cat", // or "dog"
  "type": "toys", // toys, food, accessories
  "price": 29.99,
  "rating": 4.5,
  "reviews": 1234,
  "asin": "B08EXAMPLE", // Amazon ASIN
  "image": "https://...",
  "trending": true,
  "commission": 1.20 // Estimated commission
}
```

### Update Impact Stats:

Edit `impact-log.json` after each pet food purchase:
```json
{
  "totalRaised": 2847.50,
  "mealsProvided": 1893,
  "petsHelped": 247,
  "receipts": [
    {
      "date": "2026-02-09",
      "amount": 127.50,
      "items": "Cat food 15kg, Dog food 20kg",
      "meals": 51,
      "receiptImage": "https://..."
    }
  ]
}
```

## 🔧 API Endpoints

All APIs are serverless functions that run on Vercel:

### SEO Keywords
```
GET /api/seo-keywords?region=US
Returns trending pet keywords for USA/UK
```

### Product Finder
```
GET /api/product-finder?category=cat&minRating=4.5
Discovers trending Amazon products
```

### Pinterest Share
```
POST /api/pinterest-share
Body: { productTitle, productImage, productUrl, commission }
Shares product pin to Pinterest
```

### Receipt Tracker
```
GET /api/receipt-tracker?action=get
Returns current impact statistics

POST /api/receipt-tracker?action=add
Body: { amount, items, supplier, meals, receiptImage }
Adds new receipt to transparency log
```

## 📱 Features to Add Later (Optional)

### Phase 2 Enhancements:
- [ ] Email newsletter for impact updates
- [ ] User accounts to track individual impact
- [ ] Blog section for SEO
- [ ] Instagram integration
- [ ] Donation page for direct contributions
- [ ] Mobile app
- [ ] Volunteer sign-up
- [ ] Partner with local pet rescues

## 🎯 SEO & Marketing Tips

### For USA/UK Markets:
1. **Target Keywords:**
   - "best cat toys 2026"
   - "help street pets"
   - "pet charity shopping"
   - "amazon pet products"

2. **Pinterest Strategy:**
   - Create boards: "Pet Products That Help Animals"
   - Post 3-5 times daily
   - Use emotional captions
   - Include: #PetsOfInstagram #RescuePets

3. **Content Ideas:**
   - Blog: "Top 10 Cat Toys That Feed Street Cats"
   - Stories: "Meet the pets you helped feed"
   - Videos: Feeding sessions with street pets

## 💰 Commission Calculator

Typical Amazon commission rates:
- Pet Products: 4-4.5%
- Luxury Beauty: 10%
- Amazon Devices: 4%

Example:
- Customer buys $100 dog bed
- Commission: $4.00 (4%)
- Meals generated: ~1.6 meals ($2.50/meal)

## 🤝 Contributing

This is an open-source compassionate project. Improvements welcome!

## 📄 License

MIT License - Use this code to help animals anywhere in the world!

## ❤️ About

Built with love for street cats and dogs who need our help. Every line of code written with compassion.

### Why This Exists:
Too many street animals go hungry every day. By combining e-commerce with transparency and compassion, we can make shopping meaningful and help those who can't help themselves.

## 🆘 Support

- **Questions?** Check the code comments - everything is documented
- **Issues?** The code is production-ready and tested
- **Want to help?** Share the website with pet lovers!

## 🌟 Success Metrics

Track these to measure impact:
- Total commissions earned
- Meals provided
- Number of pets helped
- Website traffic
- Conversion rate
- Social media engagement

---

**Remember:** Every purchase matters. Every meal counts. Every pet deserves love. 🐾❤️

*Made with ❤️ for street cats and dogs everywhere*
