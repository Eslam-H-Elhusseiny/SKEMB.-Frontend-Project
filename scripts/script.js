// Variables
const productsGridEl = document.querySelector(".products-grid");
const productCardEl = document.querySelector(".card");
const imgArr = [
  "/images/products/p1.png",
  "/images/products/p2.png",
  "/images/products/p3.png",
  "/images/products/p4.png",
  "/images/products/p5.png",
  "/images/products/p6.png",
  "/images/products/p7.png",
  "/images/products/p8.png",
  "/images/products/p9.png",
  "/images/products/p10.png",
  "/images/products/p11.png",
  "/images/products/p12.png",
  "/images/products/p13.png",
  "/images/products/p14.png",
  "/images/products/p15.png",
  "/images/products/p16.png",
  "/images/products/p17.png",
  "/images/products/p18.png",
  "/images/products/p19.png",
  "/images/products/p20.png",
  "/images/products/p21.png",
  "/images/products/p22.png",
  "/images/products/p23.png",
  "/images/products/p24.png",
];

// Show Sidebar
const showSidebarBtn = document.querySelector(".show-sidebar-btn");

function showSidebar() {
  const sidebarEl = document.querySelector(".sidebar");
  sidebarEl.style.right = "0";
  sidebarEl.style.display = "block";
}
showSidebarBtn.addEventListener("click", showSidebar);

// Hide Sidebar
const hideSidebarBtn = document.querySelector(".hide-sidebar-btn");

function hideSidebar() {
  const sidebarEl = document.querySelector(".sidebar");
  // sidebarEl.style.display = "none";
  sidebarEl.style.right = "-30rem";
}
hideSidebarBtn.addEventListener("click", hideSidebar);

// Fetch All Products
// *LINK -  API OPTIONS: '?limit= NUM &skip= NUM &select=title,...properties'
async function fetchProductData(limit = "") {
  const productsURL = "https://dummyjson.com/products";
  const res = await fetch(`${productsURL}${limit}`);
  const { products } = await res.json();
  return products;
}

async function displayTrendingProducts() {
  const productsArr = await fetchProductData("?limit=4");
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
          <a href="${product.category}" class="product-cat mt-4">${
      product.category
    }</a>
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

displayTrendingProducts();

// -----------------------
// *LINK -  Swiper Library
// -----------------------
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

var swiper = new Swiper(".mySwiper2", {
  slidesPerView: "auto",
  spaceBetween: 30,
  centeredSlides: false,
  freeMode: true,

  // pagination: {
  //   el: ".swiper-pagination",
  //   clickable: true,
  // },
});
