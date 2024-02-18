import { productCard } from "./productCard.js";
import { addToCart } from "./addtocart.js";

//  Fetching All Products
// -------------------------------

async function fetchProducts() {
  const productsUrl = "https://dummyjson.com/products/";
  const response = await fetch(`${productsUrl}${limit}`);
  const { products } = await response.json();
  return products;
}

//  Fetching Single Product
// -------------------------------
let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get("id");

async function fetchSingleProduct() {
  const productsUrl = "https://dummyjson.com/products/";
  const response = await fetch(`${productsUrl}${id}`);
  const product = await response.json();
  return product;
}

// LINK Fetching Product Reviews
// -------------------------------
async function fetchComments() {
  const productsUrl = "https://dummyjson.com/comments/post/";
  const response = await fetch(`${productsUrl}${id}?limit=3`);
  const { comments } = await response.json();
  return comments;
}

fetchComments();

//  Display Product Details Page Content
// -------------------------------

async function displayProductDetails() {
  const product = await fetchSingleProduct();
  const comments = await fetchComments();
  const productDetailSection = document.getElementsByClassName("product")[0];
  const productReviewSection =
    document.getElementsByClassName("desc-reviews")[0];
  document.getElementsByClassName("desc-reviews")[0].innerText =
    product.description;

  productDetailSection.innerHTML = `
  <div class="product-images d-grid">
  <div class="product-image mx-auto">
    <img class="product-img mx-auto" src="${product.images[0]}" alt="${
    product.title
  }"/>
  </div>
  <div class="small-images d-flex justify-center mx-auto w-75"></div>
</div>

<div class="product-details d-flex flex-col">
  <h2 class="product-title">${product.title}</h2>
  <div class="rating-icon py-3">
    <i class="fa-solid fa-star" style="color: #ffd43b"></i>
    <i class="fa-solid fa-star" style="color: #ffd43b"></i>
    <i class="fa-solid fa-star" style="color: #ffd43b"></i>
    <i class="fa-solid fa-star" style="color: #ffd43b"></i>
    <i class="fa-regular fa-star"></i>
    <span class="rating mx-2">${product.rating}</span>
  </div>
  <h4>OverView</h4>
  <p class="product-desc mb-2">${product.description}</p>
  <h4>Size</h4>
  <div class="sizes mb-2 my-1">
    <div class="size px-1 py-1">S</div>
    <div class="size px-1 py-1">M</div>
    <div class="size px-1 py-1">L</div>
    <div class="size px-1 py-1">XL</div>
    <div class="size px-1 py-1">XXL</div>
  </div>

  <div class="product-color my-1 mb-2">
    <h4>Color</h4>

    <div class="color-choose my-1">
      <div>
        <input
          data-image="black"
          type="radio"
          id="black"
          name="color"
          value="black"
          checked
        />
        <label for="black"><span></span></label>
      </div>
      <div>
        <input
          data-image="blue"
          type="radio"
          id="blue"
          name="color"
          value="blue"
          checked
        />
        <label for="blue"><span></span></label>
      </div>
      <div>
        <input
          data-image="gray"
          type="radio"
          id="gray"
          name="color"
          value="gray"
        />
        <label for="gray"><span></span></label>
      </div>
      <div>
        <input
          data-image="white"
          type="radio"
          id="white"
          name="color"
          value="white"
        />
        <label for="white"><span></span></label>
      </div>
    </div>
  </div>

  <h3 class="product-price py-3">EGP ${product.price * 30}</h3>
  <button class="text-center product-btn">Add To Cart</button>
  <button class="btn addToCartLoader w-85 cursor-pointer d-none"><i class="fa-solid fa-spinner fa-spin"></i></button>
</div>
  `;
  let addToCartBtn = productDetailSection.querySelector(".product-btn");
  let addToCartLoader = productDetailSection.querySelector(".addToCartLoader");
  addToCartBtn.addEventListener("click", (e) => {
    addToCart(product.id, addToCartBtn, addToCartLoader);
  });
  for (let i = 0; i < product.images.length; i++) {
    let img = document.createElement("a");
    img.classList.add("small-img", "me-2");
    img.style.backgroundImage = "url(" + product.images[i] + ")";
    document.getElementsByClassName("small-images")[0].append(img);
    if (
      img.addEventListener("click", () => {
        document.getElementsByClassName("product-img")[0].src =
          product.images[i];
      })
    );
  }
  document.getElementsByClassName("desc")[0].addEventListener("click", () => {
    document.getElementsByClassName("reviews")[0].classList.remove("active");
    document.getElementsByClassName("desc")[0].classList.add("active");
    document.getElementsByClassName("desc-reviews")[0].style.alignItems =
      "flex-start";
    document.getElementsByClassName("desc-reviews")[0].innerText =
      product.description;
  });
  displayRelatedProducts(product.category);

  document
    .getElementsByClassName("reviews")[0]
    .addEventListener("click", () => {
      document.getElementsByClassName("desc")[0].classList.remove("active");
      document.getElementsByClassName("reviews")[0].classList.add("active");
      document.getElementsByClassName("desc-reviews")[0].style.alignItems =
        "center";
      productReviewSection.innerHTML = ``;
      comments.forEach((comment) => {
        const commentCard = document.createElement("div");
        commentCard.innerHTML = `
          <div
          class="reviewSection d-flex align-center px-3 py-3 justify-around"
        ></div>
        <div class="reviewItem me-2 py-2 px-2">
        <div class="top d-flex align-center mb-3 my-3">
          <div class="clientImage">
            <h4 class=username>${comment.user.username}</h4>
          </div>
          <ul>
            <li>
              <i class="fa-solid fa-star" style="color: #ffd43b"></i>
            </li>
            <li>
              <i class="fa-solid fa-star" style="color: #ffd43b"></i>
            </li>
            <li>
              <i class="fa-solid fa-star" style="color: #ffd43b"></i>
            </li>
            <li>
              <i class="fa-regular fa-star" style="color: #ffd43b"></i>
            </li>
            <li>
              <i class="fa-regular fa-star" style="color: #ffd43b"></i>
            </li>
          </ul>
        </div>
        <article >
        <h4 class="review text-center">${comment.body}</h4>
        <p class="date mb-1">Jan 01, 2023</p>
      </article>
      </div>
          `;
        productReviewSection.appendChild(commentCard);
      });
    });
}

// LINK -  Display Related Products Of Category
// ---------------------------------------------

async function relatedProducts(category) {
  const productsUrl = "https://dummyjson.com/products/category/";
  const res = await fetch(`${productsUrl}${category}?limit=3`);
  const { products } = await res.json();
  return products;
}

async function displayRelatedProducts(category) {
  const productsArray = await relatedProducts(category);
  const cards = document.getElementsByClassName("products-grid")[0];
  productCard(cards, productsArray, "all");
}

displayProductDetails();
