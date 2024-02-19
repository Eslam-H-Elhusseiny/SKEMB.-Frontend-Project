import LoginModal from "./loginModal.js";
import { getCartQuantity } from "./main.js";

async function addToCart(productId, addToCartBtn, addToCartLoader) {
  addToCartBtn.classList.replace("d-inline-block", "d-none");
  addToCartLoader.classList.replace("d-none", "d-inline-block");
  try {
    // check if user logged in ot not ?
    if (localStorage.getItem("skemb-user")) {
      // Check if skembUserCart exists in localStorage, if not initialize it as an empty array
      let skembUserCart =
        JSON.parse(localStorage.getItem("skembUserCart")) || [];

      // Fetch the product data by productId
      const response = await fetch(
        "https://dummyjson.com/products/" + productId
      );
      const product = await response.json();

      // Check if the product is already in the cart
      const existingProduct = skembUserCart.find(
        (item) => item.product.id === productId
      );
      if (existingProduct) {
        // change text in BTN to be increase quantity
        // addToCartBtn.innerText = "Increase Quantity";
        // If product exists, increase its quantity
        existingProduct.quantity++;
      } else {
        // If product does not exist, add it to the cart with quantity 1
        skembUserCart.push({
          product,
          quantity: 1,
        });
      }

      // Update localStorage with the updated cart
      localStorage.setItem("skembUserCart", JSON.stringify(skembUserCart));
      // success add notification & end loading
      document.querySelector(".success").style.opacity = "1";
      addToCartLoader.classList.replace("d-inline-block", "d-none");
      addToCartBtn.classList.replace("d-none", "d-inline-block");
      getCartQuantity();
    } else {
      document.body.appendChild(LoginModal());
      document.body.style.overflow = "hidden";
      addToCartLoader.classList.replace("d-inline-block", "d-none");
      addToCartBtn.classList.replace("d-none", "d-inline-block");
    }
  } catch (error) {
    document.querySelector(".faild").style.opacity = "1";
    addToCartLoader.classList.replace("d-inline-block", "d-none");
    addToCartBtn.classList.replace("d-none", "d-inline-block");
    console.error("Error adding product to cart:", error);
  }
  setTimeout(() => {
    document.querySelector(".success").style.opacity = "0";
    document.querySelector(".faild").style.opacity = "0";
  }, 1000);
}

// -----------------------
// LINK Removing Item From Cart Function
// -----------------------

function removeFromCart(productId) {
  let cartItems = cart.filter((item) => item.product.id != productId);
  localStorage.setItem("cart", JSON.stringify(cartItems));
}
export { addToCart, removeFromCart };
