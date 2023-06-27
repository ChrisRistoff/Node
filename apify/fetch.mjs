import fetch from "node-fetch";

const url = "http://localhost:8080/products";
let products = [];
let minPrice = 0;
let maxPricePossible = 100000;
let maxPrice = 1;
let equalPriceCounter = 0;

async function fetchProducts(minPrice, maxPrice) {
  const res = await fetch(`${url}?minPrice=${minPrice}&maxPrice=${maxPrice}`);
  const data = await res.json();
  return data;
}

async function scrapeProducts(minPrice, maxPrice) {
    
  if (maxPrice <= maxPricePossible) {

    let data = await fetchProducts(minPrice, maxPrice);
    console.log(data);

    if (equalPriceCounter === 2) {
      maxPrice = maxPrice + 1;
      equalPriceCounter = 0;
      return await scrapeProducts(minPrice, maxPrice);
    }

    if (data.total > 1000) {
      minPrice = maxPrice;
      equalPriceCounter = equalPriceCounter + 1;
      return await scrapeProducts(minPrice, maxPrice);
    } 
    else {
      for (let i = 0; i < data.count; i++) {
          products.push(data.products[i]);
        }
      }
      console.log(products);
      minPrice = maxPrice;
      maxPrice = maxPrice + 1;
      equalPriceCounter = 0;
      return await scrapeProducts(minPrice, maxPrice);
    }

  return products;
}

let data = await scrapeProducts(minPrice, maxPrice);
console.log(data.length);
