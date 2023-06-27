import fetch from "node-fetch";

const url = "http://localhost:8080/products";
let products = [];
let missedProductsPrices = [];
let minPrice = 0;
let maxPricePossible = 100000;
let maxPrice = 1;
let equalPriceCounter = 0;
let duplicateCounter = 0;

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

    // if data > 1000 if minPrice = maxPrice then we will continue looking for the next range
    // this will cause it to miss products of the same price if there are more than 1000 of them
    if (equalPriceCounter === 2) {
      maxPrice = maxPrice + 1;
      equalPriceCounter = 0;
      missedProductsPrices.push(minPrice);
      return await scrapeProducts(minPrice, maxPrice);
    }

    // if there are over 1000 free products in the first iteration then they will be missed
    // this also means that they will not be added to the missedPrices array
    if (data.total > 1000) {
      minPrice = maxPrice;
      equalPriceCounter = equalPriceCounter + 1;
      return await scrapeProducts(minPrice, maxPrice);
    } 

    else {

      // Nested for loop to check for duplicate products.
      // I could have used some but I am not sure if it will go through the whole product or stop 
      // at the id property, so I decided to use a for loop instead.
      // This is needed because the minPrice for the next iteration is the same as the maxPrice
      // of the previous iteration and there will be duplicate products
      for (let i = 0; i < data.count; i++) {
        for (let j = 0; j < products.length; j++) {
          if (data.products[i].id === products[j].id) {
            duplicateCounter = 1;
            break;
          }
        }

        if (duplicateCounter === 0) {
          products.push(data.products[i]);
        }
        duplicateCounter = 0;
      }
    }

    minPrice = maxPrice;
    maxPrice = maxPrice + 1;
    equalPriceCounter = 0;
    return await scrapeProducts(minPrice, maxPrice);
    }

  return { products, missedProductsPrices };
}

let totalProducts = await getAllProductsLength();
let data = await scrapeProducts(minPrice, maxPrice);

console.log(`Total products: ${totalProducts}`);
console.log(`Total products scraped: ${data.products.length}`);
console.log(`Total products missed: ${totalProducts - data.products.length}`);
console.log(`Prices missed: ${data.missedProductsPrices}`);
