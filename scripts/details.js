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

//  Fetching Product Reviews
// -------------------------------
async function fetchComments() {
  const productsUrl = "https://dummyjson.com/comments";
  const response = await fetch(`${productsUrl}?limit=3`);
  const comments = await response.json();
  console.log(comments);
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
    <i class="fa-solid fa-star" style="color: #ffd43b"></i>
    <span class="rating mx-2">${product.rating}</span>
  </div>
  <h4>OverView</h4>
  <p class="product-desc w-50 mb-2">${product.description}</p>
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

  <h3 class="product-price py-3">${product.price * 30}</h3>
  <a href="" class="text-center product-btn">Add To Cart</a>
</div>
  `;

  document.getElementsByClassName("desc")[0].addEventListener("click", () => {
    document.getElementsByClassName("reviews")[0].classList.remove("active");
    document.getElementsByClassName("desc")[0].classList.add("active");
    document.getElementsByClassName("desc-reviews")[0].innerText =
      product.description;
  });

  document
    .getElementsByClassName("reviews")[0]
    .addEventListener("click", () => {
      document.getElementsByClassName("desc")[0].classList.remove("active");
      document.getElementsByClassName("reviews")[0].classList.add("active");
      productReviewSection.innerHTML = `
      <h4>Our Clients Reviews</h4>
      <!-- Clients Review Section -->
      <div
        class="reviewSection d-flex align-center px-3 py-3 justify-around"
      >
      </div>`;
      productReviewSection.forEach((comment) => {
        let reviewItem = document.createElement("div");
        reviewItem.classList.add("reviewItem", "me-2", "py-2", "px-2");
        let topDiv = document.createElement("div");
        topDiv.classList.add("top");
        let user = document.createElement("div");
        user.classList.add("clientImage");
        let usernameSpan = document.createElement("span");
        usernameSpan.innerHTML = comments.user.username;
        user.append(usernameSpan);
        let ul = document.createElement(ul);
        for (var i = 0; i < 3; i++) {
          var li = document.createElement("li");
          var starIcon = document.createElement("i");
          starIcon.classList.add("fa-solid", "fa-star");
          starIcon.style.color = "#ffd43b";
          li.appendChild(starIcon);
          starList.appendChild(li);
        }
        for (var i = 0; i < 2; i++) {
          var li = document.createElement("li");
          var starIcon = document.createElement("i");
          starIcon.classList.add("fa-regular", "fa-star");
          starIcon.style.color = "#ffd43b";
          li.appendChild(starIcon);
          starList.appendChild(li);
        }
        var article = document.createElement("article");
        var reviewParagraph = document.createElement("p");
        reviewParagraph.classList.add("review");
        reviewParagraph.textContent = "body";
        var dateParagraph = document.createElement("p");
        dateParagraph.textContent = "Jan 01, 2023";
        article.appendChild(reviewParagraph);
        article.appendChild(dateParagraph);
        topDiv.appendChild(user);
        topDiv.appendChild(starList);
        reviewItem.appendChild(topDiv);
        reviewItem.appendChild(article);
        document.productReviewSection.appendChild(reviewItem);
      });
    });
}

// window.addEventListener("load", fetchSingleProduct);

displayProductDetails();

// for (let i = 0; i < productItem.images.length; i++) {
//   let img = document.createElement("a");
//   img.classList.add("small-img", "me-2");
//   img.style.backgroundImage = "url(" + productItem.images[i] + ")";
//   document.getElementsByClassName("small-images")[0].append(img);
//   if (
//     img.addEventListener("click", () => {
//       document.getElementsByClassName("product-img")[0].src =
//         productItem.images[i];
//     })
//   );

fetch("https://dummyjson.com/products/")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    localStorage.setItem("products", JSON.stringify(data));
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", "[]");
    }
  });

let products = JSON.parse(localStorage.getItem("products"));
let cart = JSON.parse(localStorage.getItem("cart"));

// -----------------------
// LINK Adding Item to Cart Function
// -----------------------
function addToCart(productId) {
  fetch("https://dummyjson.com/products/" + productId)
    .then((res) => {
      const product = res.json();
      return product;
    })
    .then((product) => {
      let res = cart.find((item) => item.product.id === productId);
      if (cart.length == 0) {
        cart.push({
          product,
          quantity: 1,
        });
      } else if (res === undefined) {
        cart.push({
          product,
          quantity: 1,
        });
      } else {
        res.quantity = res.quantity + 1;
      }
      localStorage.setItem("cart", JSON.stringify(cart));
    });
}

// -----------------------
// LINK Removing Item From Cart Function
// -----------------------

function removeFromCart(productId) {
  let cartItems = cart.filter((item) => item.product.id != productId);
  localStorage.setItem("cart", JSON.stringify(cartItems));
}

// -----------------------
// LINK Update Item Quantity Functions
// -----------------------

function increaseItemQuantity(productId, quantity) {
  for (let item of cart) {
    if (item.product.id === productId) {
      item.quantity = item.quantity + quantity;
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

function decreaseItemQuantity(productId, quantity) {
  for (let item of cart) {
    if (item.product.id === productId) {
      item.quantity = item.quantity - quantity;
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

// document.getElementsByClassName("cart-btn")[0].addEventListener("click", () => {
//   console.log(this.product.id);
// });

