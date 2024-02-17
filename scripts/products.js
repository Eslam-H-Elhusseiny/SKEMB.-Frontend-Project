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

// *LINK -  Show Sidebar
const showSidebarBtn = document.querySelector(".show-sidebar-btn");

function showSidebar() {
  const sidebarEl = document.querySelector(".sidebar");
  sidebarEl.style.right = "0";
  sidebarEl.style.display = "block";
}
showSidebarBtn.addEventListener("click", showSidebar);

// *LINK -  Hide Sidebar
const hideSidebarBtn = document.querySelector(".hide-sidebar-btn");

function hideSidebar() {
  const sidebarEl = document.querySelector(".sidebar");
  // sidebarEl.style.display = "none";
  sidebarEl.style.right = "-30rem";
}
hideSidebarBtn.addEventListener("click", hideSidebar);

// =====================================================================================

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
  let i = 0;
  productsArr.forEach((product) => {
    const card = document.createElement("div");
    card.innerHTML = `
      <!-- Card -->

      <div class="card px-2 py-2">
        <div class="card-product position-relative justify-end d-flex flex-col align-center">
          <img src="${imgArr[i] ? imgArr[i++] : product.images[0]}"
            alt="${product.title}" />
          <a href="#" class="btn cart-btn w-85">Add To Cart</a>
          <a href="#" class="fav position-absolute py-1 px-2"><i class="fa-regular fa-heart"></i></a>
          <a href="#" class="fav position-absolute py-1 px-2 fav-solid"><i class="fa-solid fa-heart"></i></a>
        </div>
        <div class="card-text px-1">
          <a href="${product.category}"
            class="product-cat mt-4">${product.category}</a>
          <a href="${product.id}" class="product-h mb-1">${product.title}</a>
          <p class="product-p">${product.description} </p>
          <div class="price-colors my-1 align-center justify-between d-flex">
            <h4 class="price-tag">
              <span class="currency">EGP</span>
              <span class="price">${product.price * 30}</span>
            </h4>
            <div class="colors d-flex">
              <div
                class="color cursor-pointer color1 color color-active"
              ></div>
              <div class="color cursor-pointer color2"></div>
              <div class="color cursor-pointer color3"></div>
              <div class="color cursor-pointer color4"></div>
            </div>
          </div>
        </div>
      </div>
  `;
    productsGridEl.appendChild(card);
  });
}

function displayTrendingProducts() {
  displayProducts("?limit=24");
}
displayTrendingProducts();
