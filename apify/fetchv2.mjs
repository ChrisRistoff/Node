import fetch from "node-fetch";

const url = "http://localhost:8080/products";
let products = {};
let missedProductsPrices = [];
let minPrice = 0;
let maxPricePossible = 100000;
let maxPrice = 1;
let step = 1000;

async function fetchProducts(minPrice, maxPrice) {
  const res = await fetch(`${url}?minPrice=${minPrice}&maxPrice=${maxPrice}`);
  const data = await res.json();
  return data;
}

async function getAllProductsLength() {
  const data = await fetchProducts(0, maxPricePossible);
  return data.total;
}

async function scrapeProducts(minPrice, maxPrice) {

  if (maxPrice <= maxPricePossible) {

    let data = await fetchProducts(minPrice, maxPrice);

    if (data.count > 1000) {
      step = step / 2;
      maxPrice = maxPrice - step;
      return await scrapeProducts(minPrice, maxPrice);
    }

    if (data.count < 500) {
      step = step * 1.5;
      return await scrapeProducts(minPrice, maxPrice + step);
    }


    for (let i = 0; i < data.count; i++) {
        products[data.products[i].id] = data.products[i];
     }

    minPrice = maxPrice;
    maxPrice = maxPrice + step;
    return await scrapeProducts(minPrice, maxPrice);
    }

  return { products, missedProductsPrices };
}

let totalProducts = await getAllProductsLength();
let data = await scrapeProducts(minPrice, maxPrice);

console.log(`Total products: ${totalProducts}`);
console.log(`Total products scraped: ${Object.keys(data.products).length}`);
