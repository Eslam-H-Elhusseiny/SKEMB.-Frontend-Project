import { productCard } from "./productCard.js";
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
  <a href="" class="text-center product-btn">Add To Cart</a>
</div>
  `;
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
        productReviewSection.innerHTML=``;
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
        })

      // productReviewSection.innerHTML = `
      // <h4>Our Clients Reviews</h4>
      // <!-- Clients Review Section -->
      // <div
      //   class="reviewSection d-flex align-center px-3 py-3 justify-around"
      // >
      // </div>`;
      // document.getElementsByClassName("desc-reviews")[0].innerText ='';
      // comments.forEach((comment) => {
      //   var reviewItem = document.createElement("div");
      //   reviewItem.classList.add("reviewItem", "me-2", "py-2", "px-2");

      //   var topDiv = document.createElement("div");
      //   topDiv.classList.add("top");

      //   var clientImageDiv = document.createElement("div");
      //   clientImageDiv.classList.add("clientImage");
      //   var usernameSpan = document.createElement("span");
      //   usernameSpan.textContent = comment.user.username;
      //   clientImageDiv.appendChild(usernameSpan);

      //   var starList = document.createElement("ul");
      //   for (var i = 0; i < 3; i++) {
      //     var li = document.createElement("li");
      //     var starIcon = document.createElement("i");
      //     starIcon.classList.add("fa-solid", "fa-star");
      //     starIcon.style.color = "#ffd43b";
      //     li.appendChild(starIcon);
      //     starList.appendChild(li);
      //   }
      //   for (var i = 0; i < 2; i++) {
      //     var li = document.createElement("li");
      //     var starIcon = document.createElement("i");
      //     starIcon.classList.add("fa-regular", "fa-star");
      //     starIcon.style.color = "#ffd43b";
      //     li.appendChild(starIcon);
      //     starList.appendChild(li);
      //   }

      //   var article = document.createElement("article");
      //   var reviewParagraph = document.createElement("p");
      //   reviewParagraph.classList.add("review");
      //   reviewParagraph.textContent = comment.body;
      //   var dateParagraph = document.createElement("p");
      //   dateParagraph.textContent = "Jan 01, 2023";
      //   article.appendChild(reviewParagraph);
      //   article.appendChild(dateParagraph);
      //   topDiv.appendChild(clientImageDiv);
      //   topDiv.appendChild(starList);
      //   reviewItem.appendChild(topDiv);
      //   reviewItem.appendChild(article);
      //   productReviewSection.appendChild(reviewItem);
      // });
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
