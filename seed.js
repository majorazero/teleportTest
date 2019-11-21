const db = require('./models');

const productTypes = [
  'Supplements',
  'Sleep',
  'Keto',
  'Cleaning Supplies',
  'Nootropics',
  'Personal Care/ Hydration'
];

const companies = [
  'Ritual',
  'Casper',
  'Purple',
  'Tuft and Needle',
  'Evolved',
  'Fourth and Heart',
  'Trumans',
  'Goop',
  'Phillips',
  'Perfect Keto',
  'Olly',
  'SugarBearHair',
  'Four sigmatic',
  'Cali White'
];

const products = [
  {
    name: 'Essential Vitamins for Women',
    company: 'Ritual',
    category: 'Health',
    productType: 'Supplements',
    link: 'https://ritual.com/products/essential-for-women-multivitamin',
    price: 30,
    demographic: 'Women',
    shipping: 0
  },
  {
    name: 'Casper Pillow',
    company: 'Casper',
    category: 'Sleep',
    productType: 'Sleep',
    link: 'https://purple.com/pillows/purple-pillo://casper.com/pillows/',
    price: 65,
    demographic: 'Millenial',
    shipping: 15
  },
  {
    name: 'Purple Pillow',
    company: 'Purple',
    category: 'Sleep',
    productType: 'Sleep',
    link: 'https://purple.com/pillows/purple-pillow',
    price: 99,
    demographic: 'Millenial',
    shipping: 10
  },
  {
    name: 'Tuft and Need Mattress',
    company: 'Tuft and Needle',
    category: 'Sleep',
    productType: 'Sleep',
    link: 'https://www.tuftandneedle.com/mattress/original/',
    price: 500,
    demographic: 'Millenial',
    shipping: 3
  },
  {
    name: 'Keto Cups',
    company: 'Evolved',
    category: 'Health',
    productType: 'Food',
    link: 'https://eatingevolved.com/products/original-keto-cups',
    price: 10,
    demographic: 'Keto',
    shipping: 0,
    shipping_threshold: 35
  },
  {
    name: 'Ghee',
    company: 'Fourth and Heart',
    category: 'Food',
    productType: 'Keto',
    link: 'https://fourthandheart.com/product/original-ghee/',
    price: 13,
    demographic: 'Fitness',
    shipping: 10
  },
  {
    name: 'Cleaning spray',
    company: 'Trumans',
    category: 'Home',
    productType: 'Cleaning Supplies',
    link: 'https://www.trumans.com',
    price: 18,
    demographic: 'Women',
    shipping: 1
  },
  {
    name: 'High School Genes',
    company: 'Goop',
    category: 'Health',
    productType: 'Supplements',
    link: 'https://shop.goop.com/shop/products/high-school-genes',
    price: 90,
    demographic: 'Women',
    shipping: 0,
    shipping_threshold: 20
  },
  {
    name: 'Light Alarm Clock',
    company: 'Phillips',
    category: 'Home',
    productType: 'Sleep',
    link: 'https://www.amazon.com/gp/product/B0093162RM?ie=UTF8&tag=tzr-15862306-20&camp=1789&linkCode=xm2&creativeASIN=B0093162RM',
    price: 100,
    demographic: 'Millenial',
    shipping: 0
  },
  {
    name: 'Ketosis Urine Strips',
    company: 'Perfect Keto',
    category: 'Fitness',
    productType: 'Keto',
    link: 'https://www.amazon.com/gp/product/B01MUB7BUV?ie=UTF8&tag=tzr-15862306-20&camp=1789&linkCode=xm2&creativeASIN=B01MUB7BUV',
    price: 8,
    demographic: 'Fitness',
    shipping: 0,
    shipping_threshold: 30
  },
  {
    name: 'Melatonin Gummies',
    company: 'Olly',
    category: 'Sleep',
    productType: 'Supplements',
    link: 'https://www.amazon.com/gp/product/B0145QI7O0?ie=UTF8&tag=tzr-15862306-20&camp=1789&linkCode=xm2&creativeASIN=B0145QI7O0',
    price: 13,
    demographic: 'Fitness',
    shipping: 0,
    shipping_threshold: 50
  },
  {
    name: 'Hair supplement gummies',
    company: 'SugarBearHair',
    category: 'Skin & Beauty',
    productType: 'Supplements',
    link: 'https://www.amazon.com/SugarBearHair-Vitamins-1-Month-Supply/dp/B019ZZB3O2/ref=as_li_ss_tl?th=1&linkCode=ll1&tag=tzr-15862306-20&linkId=b243ad059c37a4f2f3503e5e97608206&language=en_US',
    price: 30,
    demographic: 'Fitness',
    shipping: 0
  },
  {
    name: 'Mushroom Coffee',
    company: 'Four sigmatic',
    category: 'Mind',
    productType: 'Nootropics',
    link: 'https://www.amazon.com/gp/product/B00ZWA7LQ4?ie=UTF8&tag=tzr-16823336-20&camp=1789&linkCode=xm2&creativeASIN=B00ZWA7LQ40',
    price: 10,
    demographic: 'Productivity',
    shipping: 0
  },
  {
    name: 'Charcoal Toothpaste',
    company: 'Cali White',
    category: 'Skin & Beauty',
    productType: 'Personal Care/ Hydration',
    link: 'https://www.amazon.com/gp/product/B06WRS71N8?ie=UTF8&tag=tzr-15862306-20&camp=1789&linkCode=xm2&creativeASIN=B06WRS71N8',
    price: 10,
    demographic: 'Millenial',
    shipping: 15
  },
]

productTypes.forEach((prod) => {
  db.ProductType.create({
    name: prod
  })
})

companies.forEach((company) => {
  db.Company.create({
    name: company
  })
})

products.forEach((product) => {
  db.Company.findOne({name: product.company}).then((company) => {
    db.ProductType.findOne({name: product.productType}).then((prodType) => {
      db.Product.create({
        name: product.name,
        category: product.category,
        link: product.link,
        CompanyId: company.id,
        ProductTypeId: prodType.id,
        price: product.price,
        demographic: product.demographic,
        shipping: product.shipping,
        shipping_threshold: product.shipping_threshold,
      })
    })
  })
})
