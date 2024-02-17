window.addEventListener("load", start());

function start() {
  crateCategoriesSideBar();
  displayAllProducts();
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
  const cards = document.getElementById("productContainer");
  cards.innerHTML = "";
  const productsArray = await productOfCategory(cat);
  // let i =0;

  productsArray.forEach((product) => {
    const card = document.createElement("div");
    card.innerHTML = `
        <!-- Card -->
        <div class="card px-2 py-2">
          <div class="card-product position-relative justify-end d-flex flex-col align-center">
          <img src="${product.images[0]}" alt="${product.title}"/>
            <a href="#" class="btn cart-btn w-75">Add To Cart</a>
            <a href="#" class="fav position-absolute py-1 px-2"><i class="fa-regular fa-heart"></i></a>
            <a href="#" class="fav position-absolute py-1 px-2 fav-solid"><i class="fa-solid fa-heart"></i></a>
          </div>
          <div class="card-text px-1">
            
            <a href="cart.html?id=${product.id}"><h3 class="product-h">${
      product.title
    }</h3></a>
            <p class="product-p">${product.description}</p>
            <div
              class="price-colors mt-1 align-center justify-between d-flex"
            >
              <h4 class="price-tag">
                <span class="currency">EGP</span>
                <span class="price">${product.price * 30}</span>
              </h4>
              <div class="colors d-flex">
                <div
                  class="color cursor-pointer color1 color cursor-pointer-active"
                ></div>
                <div class="color cursor-pointer color2"></div>
                <div class="color cursor-pointer color3"></div>
                <div class="color cursor-pointer color4"></div>
              </div>
            </div>
          </div>
        </div>
       `;
    cards.appendChild(card);
  });
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
  const cards = document.getElementById("productContainer");
  cards.innerHTML = "";
  const productsArray = await allproducts();
  // let i =0;

  productsArray.forEach((product) => {
    const card = document.createElement("div");
    card.innerHTML = `
        <!-- Card -->
        <div class="card px-2 py-2">
          <div class="card-product position-relative justify-end d-flex flex-col align-center">
          <img src="${product.images[0]}" alt="${product.title}"/>
            <a href="#" class="btn cart-btn w-75">Add To Cart</a>
            <a href="#" class="fav position-absolute py-1 px-2"><i class="fa-regular fa-heart"></i></a>
            <a href="#" class="fav position-absolute py-1 px-2 fav-solid"><i class="fa-solid fa-heart"></i></a>
          </div>
          <div class="card-text px-1">
            
            <a href="${product.id}"><h3 class="product-h">${
      product.title
    }</h3></a>
            <p class="product-p">${product.description}</p>
            <div
              class="price-colors mt-1 align-center justify-between d-flex"
            >
              <h4 class="price-tag">
                <span class="currency">EGP</span>
                <span class="price">${product.price * 30}</span>
              </h4>
              <div class="colors d-flex">
                <div
                  class="color cursor-pointer color1 color cursor-pointer-active"
                ></div>
                <div class="color cursor-pointer color2"></div>
                <div class="color cursor-pointer color3"></div>
                <div class="color cursor-pointer color4"></div>
              </div>
            </div>
          </div>
        </div>
       `;
    cards.appendChild(card);
  });
}

// *ANCHOR -  get data of categoties using api

async function allCategories() {
  const res = await fetch("https://dummyjson.com/products/categories");
  const categories = await res.json();
  //console.log(products);
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
