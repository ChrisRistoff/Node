import fetch from "node-fetch";

const url = "http://localhost:8080/products";
let products = [];
let minPrice = 0;
let maxPricePossible = 100000;
let maxPrice = 1;

async function fetchProducts(minPrice, maxPrice) {
  const res = await fetch(`${url}?minPrice=${minPrice}&maxPrice=${maxPrice}`);
  const data = await res.json();
  return data;
}

async function scrapeProducts(minPrice, maxPrice) {
    
  if (maxPrice <= maxPricePossible) {

    let data = await fetchProducts(minPrice, maxPrice);
    
    if (data.total !== data.count) {
      console.log("call the senior!");
      return;
    }

    if (data.count === 0) {
      minPrice = maxPrice;
      maxPrice = maxPrice + 1;
      await scrapeProducts(minPrice, maxPrice);
    }
    
    if (products.length === 0) {
      products = products.concat(data.products);
      minPrice = maxPrice;
      maxPrice = maxPrice + 1;
      await scrapeProducts(minPrice, maxPrice);
    }

    for (let i = 0; i < data.count ; i++) {
      let isDuplicate = false;

      for (let j = 0; j < products.length; j++) {
        if (data.products[i] === products[j]) {
          isDuplicate = true;
          break;
        }

      if (!isDuplicate) {
        products.push(data.products[i]);
        }
      }
    }

    console.log(products);
    minPrice = maxPrice;
    maxPrice = maxPrice + 1;
    await scrapeProducts(minPrice, maxPrice);

  }
  return products;
}

let data = await scrapeProducts(minPrice, maxPrice);
console.log(data.length);
