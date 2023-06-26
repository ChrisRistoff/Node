import express from 'express';

const app = express();

const products = [];

for (let i = 0; i < 4231; i++) {
  products.push({
    id: i,
    name: `Product ${i}`,
    price: Math.floor(Math.random() * 100000),
  });
} 

app.use(express.json());


app.get('/products', (req, res) => {

let minPrice = req.query.minPrice ? parseInt(req.query.minPrice) : 0;
let maxPrice = req.query.maxPrice ? parseInt(req.query.maxPrice) : 100000;

let filteredProducts = [];

for (let i = 0; i < products.length; i++) {
  if (filteredProducts.length >= 1000) {
    break;
  }
  if (products[i].price >= minPrice && products[i].price <= maxPrice) {
    filteredProducts.push(products[i]);
  }
}

res.json({
  total: filteredProducts.length,
  count: 1000,
  products: filteredProducts
  });
});

app.listen(8080, () => {
  console.log('Server started on port 8080');
});

console.log(products);
