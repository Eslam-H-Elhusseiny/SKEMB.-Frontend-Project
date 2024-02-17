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
[];

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
