import fetch from "node-fetch";

const url = "http://localhost:8080/products";
let products = [];
let minPrice = 0;
let maxPricePossible = 100000;
let maxPrice = 1;

async function fetchProducts(minPrice, maxPrice) {
  const res = await fetch(`${url}?minPrice=${minPrice}&maxPrice=${maxPrice}`);
  const data = await res.json();
  console.log(data);
  return data;
}

async function scrapeProducts(minPrice, maxPrice) {
  let data = await fetchProducts(minPrice, maxPrice);
    
  while (maxPrice < maxPricePossible) {
    
    if (data.count >= 1000) {
      maxPrice = maxPrice - 1;
      await scrapeProducts(minPrice, maxPrice);
    }
    
    products.push(data.products);
    minPrice = maxPrice;
    maxPrice = maxPrice + 1;
    await scrapeProducts(minPrice, maxPrice);
  }

  return products;
}

let data = await scrapeProducts(minPrice, maxPrice);
console.log(data.length);
