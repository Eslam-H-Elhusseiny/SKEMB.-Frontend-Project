import { productCard } from "./productCard.js";
// Variables
const productsGridEl = document.querySelector(".products-grid");
const productCardEl = document.querySelector(".card");
const imgArr = [
  "/assets/images/products/p1.png",
  "/assets/images/products/p2.png",
  "/assets/images/products/p3.png",
  "/assets/images/products/p4.png",
  "/assets/images/products/p5.png",
  "/assets/images/products/p6.png",
  "/assets/images/products/p7.png",
  "/assets/images/products/p8.png",
  "/assets/images/products/p9.png",
  "/assets/images/products/p10.png",
  "/assets/images/products/p11.png",
  "/assets/images/products/p12.png",
  "/assets/images/products/p13.png",
  "/assets/images/products/p14.png",
  "/assets/images/products/p15.png",
  "/assets/images/products/p16.png",
  "/assets/images/products/p17.png",
  "/assets/images/products/p18.png",
  "/assets/images/products/p19.png",
  "/assets/images/products/p20.png",
  "/assets/images/products/p21.png",
  "/assets/images/products/p22.png",
  "/assets/images/products/p23.png",
  "/assets/images/products/p24.png",
];

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
  productCard(productsGridEl, productsArr, "home", imgArr);
}

function displayTrendingProducts() {
  displayProducts("?limit=8");
}
displayTrendingProducts();
