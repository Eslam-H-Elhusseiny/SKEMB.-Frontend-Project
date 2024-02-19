import { getCartQuantity } from "./main.js";

// *ANCHOR - get logged user cart
const getUserCart = () => {
  try {
    const carts = JSON.parse(localStorage.getItem("skembUserCart"));
    displayCartProducts(carts);
    displayCartSummary(carts);
    attachEventListeners(carts);
  } catch (error) {
    console.error("Error fetching user cart:", error);
  }
};
// *ANCHOR - display cart products
const displayCartProducts = (products) => {
  let cartProductsContainer = ``;
  for (let i = 0; i < products.length; i++) {
    cartProductsContainer += `<div class="element d-flex w-100 shadow px-2 py-2 mb-3 ">
            <div class="eleImage w-25 bg-light rounded d-flex align-center justify-center py-2 px-2">
                <img height="120" src=${
                  products[i].product.thumbnail
                } class="w-100" alt="Element-Image">
            </div>
            <div class="elementData w-75 d-flex align-start justify-between px-3 py-2">
                <div class="h-100 d-flex flex-col justify-around">
                    <h4 class="text-dark-blue elmentName">${
                      products[i].product.title
                    }</h4>
                    <p class="cursor-pointer fs-5 text-red remove-product"><i class="fa-solid fa-trash-can"></i> Remove Product</p>
                </div>
                <div class="priceControl h-100 d-flex flex-col justify-around align-center w-fit">
                    <h3>  
                        <button class="cart-quantity decrease mx-2 cursor-pointer"><i class="fa-solid fa-minus"></i></button> 
                        <span  class="px-2 mx-2 quantity">${
                          products[i].quantity
                        }</span> 
                        <button class="cart-quantity mx-2 cursor-pointer increase"><i class="fa-solid fa-plus"></i></button>  
                    </h3>
                    <p class="fs-5 text-dark-blue product-price">${
                      products[i].product.price * 30 * products[i].quantity
                    } EGP</p>
                </div>
            </div>
        </div>`;
  }
  document.querySelector(".cartElements").innerHTML = cartProductsContainer;
};
// *ANCHOR - handle increase & decrease product quantity & change product price
const attachEventListeners = (products) => {
  products.forEach((product, index) => {
    const decreaseBtn = document.querySelectorAll(".decrease")[index];
    const increaseBtn = document.querySelectorAll(".increase")[index];
    const quantityElement = document.querySelectorAll(".quantity")[index];
    const priceElement = document.querySelectorAll(".product-price")[index];
    const subtotalElement = document.querySelector(".subtotal");
    const discountElement = document.querySelector(".discount");
    const totalElement = document.querySelector(".total");
    const removeBtn = document.querySelectorAll(".remove-product")[index];

    decreaseBtn.addEventListener("click", () => {
      getCartQuantity();
      if (product.quantity > 1) {
        product.quantity--;
        quantityElement.textContent = product.quantity;
        priceElement.textContent = `${
          product.product.price * 30 * product.quantity
        } EGP`;
        // Update the localStorage with the updated cart
        localStorage.setItem("skembUserCart", JSON.stringify(products));
        updateSummary(
          products,
          subtotalElement,
          discountElement,
          totalElement,
          products
        );
      }
    });

    increaseBtn.addEventListener("click", () => {
      getCartQuantity();
      product.quantity++;
      quantityElement.textContent = product.quantity;
      priceElement.textContent = `${
        product.product.price * 30 * product.quantity
      } EGP`;
      // Update the localStorage with the updated cart
      localStorage.setItem("skembUserCart", JSON.stringify(products));
      updateSummary(
        products,
        subtotalElement,
        discountElement,
        totalElement,
        products
      );
    });

    removeBtn.addEventListener("click", (e) => {
      // Remove the product from cart
      products.splice(index, 1);
      // Update the display of cart products
      displayCartProducts(products);
      // Update the localStorage cart
      localStorage.setItem("skembUserCart", JSON.stringify(products));
      // Update the summary
      updateSummary(
        products,
        subtotalElement,
        discountElement,
        totalElement,
        products
      );
      location.reload();
    });
  });
};
// *ANCHOR - dispaly order summary
const displayCartSummary = (usercart) => {
  let subTotalPrice = 0;
  usercart.forEach((product, index) => {
    subTotalPrice += product.product.price * 30 * product.quantity;
  });
  console.log(subTotalPrice);
  let catSummaryContainer = `
        <h4 class="uppercase text-dark">Order Summary</h4>
        <div class="summaryContent my-3 py-1">
        <p class="d-flex my-1 w-100 justify-between align-center"><span>Net Price</span><span class="subtotal">${subTotalPrice} EGP</span></p>
            <p class="d-flex my-1 w-100 justify-between align-center"><span>Delivery</span><span>30 EGP</span></p>
            <div class="promocode d-flex my-2">
                <input type="text" name="promocode" placeholder="Promocode" class="px-2 py-2 flex-grow-1 rounded promoInput" id="">
                <button class="btn btn-primary ms-3 w-25 rounded">Submit</button>
            </div>
        </div>
        <hr>
        <p class="d-flex my-1 w-100 justify-between align-center"><span>Total Price</span><span class="subtotal">${
          subTotalPrice + 30
        } EGP</span></p>
        <span class="note mx-1">Estimated shipping time: 2 days</span>
        <button class="btn btn-primary mb-3 py-2 w-100 rounded-1">Checkout</button>
    `;
  document.querySelector(".orderSummary").innerHTML = catSummaryContainer;
};

// *ANCHOR - handle quantity changes in order summary (total price & discount)
const updateSummary = (
  products,
  subtotalElement,
  discountElement,
  totalElement,
  cart
) => {
  let subtotal = 0;
  const deliveryFee = 30;
  products.forEach((product) => {
    subtotal += product.product.price * 30 * product.quantity + deliveryFee;
  });
  subtotalElement.innerText = `${subtotal} EGP`;
};

getUserCart(document.querySelector(".cartElements"));

export { getUserCart, displayCartProducts, attachEventListeners };
