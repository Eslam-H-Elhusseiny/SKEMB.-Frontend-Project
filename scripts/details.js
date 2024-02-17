//  Fetching All Products and Adding them to Local Storage
// -------------------------------

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

//  Fetching Single Product Api
// -------------------------------

let urlParams = new URLSearchParams(window.location.search)
let id=(urlParams.get('id'));
// let id = 15;

let singleProduct = fetch("https://dummyjson.com/products/" + id)
  .then((res) => {
    let product = res.json();
    return product;
  })
  .then((productItem) => {
    console.log(productItem);
    document.getElementsByClassName("product-title")[0].innerHTML =
      productItem.title;
    document.getElementsByClassName("product-desc")[0].innerHTML =
      productItem.description;
    document.getElementsByClassName("product-price")[0].innerHTML =
      "EGP " + productItem.price;
    document.getElementsByClassName("product-img")[0].src =
      productItem.images[0];
    document.getElementsByClassName("rating")[0].innerHTML = productItem.rating;
    document.getElementsByClassName("desc-reviews")[0].innerText =
      productItem.description;

    for (let i = 0; i < productItem.images.length; i++) {
      let img = document.createElement("a");
      img.classList.add("small-img", "me-2");
      img.style.backgroundImage = "url(" + productItem.images[i] + ")";
      document.getElementsByClassName("small-images")[0].append(img);
      if (
        img.addEventListener("click", () => {
          document.getElementsByClassName("product-img")[0].src =
            productItem.images[i];
        })
      );
    }

    document.getElementsByClassName("desc")[0].addEventListener("click", () => {
      document.getElementsByClassName("reviews")[0].classList.remove("active");
      document.getElementsByClassName("desc")[0].classList.add("active");
      document.getElementsByClassName("desc-reviews")[0].innerText =
        productItem.description;
    });

    document
      .getElementsByClassName("reviews")[0]
      .addEventListener("click", () => {
        document.getElementsByClassName("desc")[0].classList.remove("active");
        document.getElementsByClassName("reviews")[0].classList.add("active");
        document.getElementsByClassName("desc-reviews")[0].innerText =
          "reviews";
      });

    // document
    //   .getElementsByClassName("product-btn")[0]
    //   .addEventListener("click", () => {
    //     addToCart(productItem.id);
    //     console.log("hello");
    //   });
    // return productItem.category;
  });

//Fetching Product Category
//--------------------------
// .then((productCategory) => {
//   const productsUrl = "https://dummyjson.com/products/category/";
//   const category = productCategory;
//   fetch(productsUrl + category).then((productsOfCategory) => {
//     return productsOfCategory.json;
//   })
//   console.log(productsOfCategory);
//   const cards = document.getElementsByClassName("products-grid")[0];
//   productsOfCategory.forEach((product) => {
//     console.log(product);
//     const card = document.createElement("div");
//     card.innerHTML = `
//   <!-- Card -->
//   <div class="card px-2 py-2">
//     <div class="card-product position-relative justify-end d-flex flex-col align-center">
//     <img src="${product.images[0]}" alt="${product.title}"/>
//       <a href="#" class="btn cart-btn w-75">Add To Cart</a>
//       <a href="#" class="fav position-absolute py-1 px-2"><i class="fa-regular fa-heart"></i></a>
//       <a href="#" class="fav position-absolute py-1 px-2 fav-solid"><i class="fa-solid fa-heart"></i></a>
//     </div>
//     <div class="card-text px-1">

//       <a href="cart.html?id=${product.id}"><h3 class="product-h">${
//       product.title
//     }</h3></a>
//       <p class="product-p">${product.description}</p>
//       <div
//         class="price-colors mt-1 align-center justify-between d-flex"
//       >
//         <h4 class="price-tag">
//           <span class="currency">EGP</span>
//           <span class="price">${product.price * 30}</span>
//         </h4>
//         <div class="colors d-flex">
//           <div
//             class="color cursor-pointer color1 color cursor-pointer-active"
//           ></div>
//           <div class="color cursor-pointer color2"></div>
//           <div class="color cursor-pointer color3"></div>
//           <div class="color cursor-pointer color4"></div>
//         </div>
//       </div>
//     </div>
//   </div>
//  `;
//     cards.appendChild(card);
//   });
// });
