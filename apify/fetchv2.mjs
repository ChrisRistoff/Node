import fetch from "node-fetch";

const url = "http://localhost:8080/products";
let products = {};
let minPrice = 0;
let maxPricePossible = 100000;
let maxPrice = 501;
let step = 1000;
let maxCounter = 0;
let missedPrices = [];

async function fetchProducts(minPrice, maxPrice) {
  const res = await fetch(`${url}?minPrice=${minPrice}&maxPrice=${maxPrice}`);
  const data = await res.json();
  return data;
}

async function getAllProductsLength() {
  const data = await fetchProducts(0, maxPricePossible);
  return data.total;
}

function dictToArray(dict) {
  let arr = [];
  for (let key in dict) {
    arr.push(dict[key]);
  }
  return arr;
}

async function scrapeProducts(minPrice, maxPrice) {

  if (maxPrice <= maxPricePossible) {

    let data = await fetchProducts(minPrice, maxPrice);

    if (maxCounter > 2) {
      return products;
    }

    if (data.count > 1000) {
      step = step / 2;
      maxPrice = maxPrice - step;
      return await scrapeProducts(minPrice, maxPrice);
    }

   for (let i = 0; i < data.count; i++) {
        products[data.products[i].id] = data.products[i];
     }

    minPrice = maxPrice;
    maxPrice = maxPrice + step;

    if (maxPrice > maxPricePossible) {
      maxPrice = maxPricePossible;
      maxCounter = maxCounter + 1;
    }
    return await scrapeProducts(minPrice, maxPrice);
    }

  return products;
}

let totalProducts = await getAllProductsLength();
let productsObj = await scrapeProducts(minPrice, maxPrice);
let productsArray = dictToArray(productsObj);

console.log(`Total products: ${totalProducts}`);
console.log(`Total products scraped: ${productsArray.length}`);
