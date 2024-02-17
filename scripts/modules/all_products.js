window.addEventListener("load", start());

import { productCard } from "./productCard.js";
import { searchInProduct } from "./search.js";

async function start() {
  crateCategoriesSideBar();
  // displayAllProducts();
  // ========================================
  let urlParams = new URLSearchParams(window.location.search);
  if (urlParams.size != 0) {
    const cards = document.getElementById("productContainer");
    await searchInProduct(urlParams, productCard, cards);
  } else {
    displayAllProducts();
  }
  // ==========================================
}

// *ANCHOR -  get products of a category using api

async function productOfCategory(category) {
  const productsUrl = "https://dummyjson.com/products/category/";
  const res = await fetch(`${productsUrl}${category}`);
  const { products } = await res.json();
  //console.log(products);
  return products;
}

// *ANCHOR -  display Products Of Category

async function displayProductsOfCategory(cat) {
  const productsArray = await productOfCategory(cat);
  const cards = document.getElementById("productContainer");
  cards.innerHTML = "";

  productCard(cards, productsArray, "all");
}

// *ANCHOR -  get data of products using api

async function allproducts() {
  const res = await fetch("https://dummyjson.com/products");
  const { products } = await res.json();
  //console.log(products);
  return products;
}

// *ANCHOR -  function of creating cards of all products with all its details

async function displayAllProducts() {
  const productsArray = await allproducts();
  const cards = document.getElementById("productContainer");
  cards.innerHTML = "";

  productCard(cards, productsArray, "all");
}

// *ANCHOR -  get data of categoties using api

async function allCategories() {
  const res = await fetch("https://dummyjson.com/products/categories");
  const categories = await res.json();
  console.log(categories);

  return categories;
}

// *ANCHOR -  function of creating sidebar with all its categories

async function crateCategoriesSideBar() {
  // const cards = document.getElementById('productContainer');
  // cards.innerHTML=""
  const categoriesArray = await allCategories();
  // console.log(categoriesArray);
  for (let i = 0; i < 20; i++) {
    let category = categoriesArray[i];

    // Create the <ul> element
    var ulElement = document.createElement("ul");

    // Create the <li> element
    var liElement = document.createElement("li");
    liElement.classList.add(
      "link",
      "position-relative",
      "pb-1",
      "cursor-pointer",
      "side_bar_item"
    );

    // Create the <a> element
    var aElement = document.createElement("a");
    aElement.href = "#";
    aElement.textContent = category;

    // Append the <a> element to the <li> element
    liElement.appendChild(aElement);

    // Append the <ul> element to the document body (or any other desired parent element)
    let catSidebar = document.querySelector(".cat-sidebar");
    catSidebar.appendChild(liElement);

    document
      .getElementsByClassName("side_bar_item")
      [i].addEventListener("click", () => {
        for (let n = 0; n < 20; n++) {
          document
            .getElementsByClassName("side_bar_item")
            [n].classList.remove("active");
        }

        document
          .getElementsByClassName("side_bar_item")
          [i].classList.add("active");
        displayProductsOfCategory(categoriesArray[i - 1]);
      });
  }
}

const categoryAll = document.getElementsByClassName("side_bar_item_all")[0];
categoryAll.addEventListener("click", displayAllProducts);
