import { addToCart } from "./addtocart.js";
import { productCard } from "./productCard.js";

// Variables
const productsGridEl = document.querySelector(".products-grid");
const productCardEl = document.querySelector(".card");

// ======================================================================

// Fetch All Products

// *LINK -  API OPTIONS: '?limit= NUM &skip= NUM &select=title,...properties'
async function fetchProductData(limit = "") {
  const productsURL = "https://dummyjson.com/products";
  const res = await fetch(`${productsURL}${limit}`);
  const { products } = await res.json();
  return products;
}

async function displayProducts(limit = "") {
  let productsArr = await fetchProductData(limit);
  productCard(productsGridEl, productsArr);
}

function displayTrendingProducts() {
  displayProducts("?limit=8");
}
displayTrendingProducts();
