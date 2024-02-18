// *ANCHOR - get logged user cart 
const getUserCart =  () => {
    try {
        const carts = JSON.parse(localStorage.getItem('skembUserCart'));
        console.log(carts);
        displayCartProducts(carts);
        displayCartSummary(carts);
        attachEventListeners(carts , carts);
    } catch (error) {
        console.error('Error fetching user cart:', error);
    }
}
// *ANCHOR - display cart products
const displayCartProducts = (products) => {
    let cartProductsContainer = ``;
    for (let i = 0; i < products.length; i++) {
        cartProductsContainer += `<div class="element d-flex w-100 shadow px-2 py-2 mb-3 ">
            <div class="eleImage w-25 bg-light rounded d-flex align-center justify-center py-2 px-2">
                <img src=${products[i].product.thumbnail} class="w-100" alt="Element-Image">
            </div>
            <div class="elementData w-75 d-flex align-start justify-between px-3 py-2">
                <div class="h-100 d-flex flex-col justify-around">
                    <h4 class="text-dark-blue elmentName">${products[i].product.title}</h4>
                    <p class="cursor-pointer fs-5 text-red remove-product"><i class="fa-solid fa-trash-can"></i> Remove Product</p>
                </div>
                <div class="priceControl h-100 d-flex flex-col justify-around align-center w-fit">
                    <h3>  
                        <span class="decrease mx-2 cursor-pointer"><i class="fa-solid fa-minus"></i></span> 
                        <span class="mx-2 quantity">${products[i].quantity}</span> 
                        <span class="mx-2 cursor-pointer increase"><i class="fa-solid fa-plus"></i></span>  
                    </h3>
                    <p class="fs-5 text-dark-blue product-price">${products[i].product.price * products[i].quantity} EGP</p>
                </div>
            </div>
        </div>`;
    }
    document.querySelector('.cartElements').innerHTML = cartProductsContainer;
}
// *ANCHOR - handle increase & decrease product quantity & change product price 
const attachEventListeners = (products , cart) => {
    products.forEach((product, index) => {
        const decreaseBtn = document.querySelectorAll('.decrease')[index];
        const increaseBtn = document.querySelectorAll('.increase')[index];
        const quantityElement = document.querySelectorAll('.quantity')[index];
        const priceElement = document.querySelectorAll('.product-price')[index];
        const subtotalElement = document.querySelector('.subtotal');
        const discountElement = document.querySelector('.discount');
        const totalElement = document.querySelector('.total');
        
        decreaseBtn.addEventListener('click', () => {
            if (product.quantity > 1) {
                product.quantity--;
                quantityElement.textContent = product.quantity;
                priceElement.textContent = `${product.product.price * product.quantity} EGP`;
                // Update the localStorage with the updated cart
                localStorage.setItem("skembUserCart", JSON.stringify(cart));
                updateSummary(products, subtotalElement, discountElement, totalElement , cart);
            }
        });

        increaseBtn.addEventListener('click', () => {
            product.quantity++;
            quantityElement.textContent = product.quantity;
            priceElement.textContent = `${product.product.price * product.quantity} EGP`;
            // Update the localStorage with the updated cart
            localStorage.setItem("skembUserCart", JSON.stringify(cart));
            updateSummary(products, subtotalElement, discountElement, totalElement , cart);
        });
    });
}
// *ANCHOR - dispaly order summary
const displayCartSummary = (usercart) => {
    let subTotalPrice = 0;
    usercart.forEach((product, index) => {
        subTotalPrice += product.product.price * product.quantity;
    });
    console.log(subTotalPrice);
    let catSummaryContainer = `
        <h4 class="uppercase text-dark">Order Summary</h4>
        <div class="summaryContent my-3 py-1">
            <p class="d-flex my-1 w-100 justify-between align-center"><span>Subtotal</span><span class="subtotal">${subTotalPrice} EGP</span></p>
            <p class="d-flex my-1 w-100 justify-between align-center"><span>Delivery</span><span>30 EGP</span></p>
            <p class="d-flex my-1 mb-2 w-100 justify-between align-center"><span>Discount</span><span class="text-red discount">- ${(usercart.total) - (usercart.discountedTotal)} EGP</span></p>
            <div class="promocode d-flex my-2">
                <input type="text" name="promocode" placeholder="Promocode" class="px-2 py-2 flex-grow-1 rounded promoInput" id="">
                <button class="btn btn-primary ms-3 w-25 rounded">Submit</button>
            </div>
        </div>
        <hr>
        <p class="d-flex my-3 w-100 justify-between align-center"><span>Total</span><span class="text-dark-blue total">${usercart.discountedTotal + 30} EGP</span></p>
        <span class="note mx-1">Estimated shipping time: 2 days</span>
        <button class="btn btn-primary mb-3 py-2 w-100 rounded-1">Checkout</button>
    `;
    document.querySelector('.orderSummary').innerHTML = catSummaryContainer;
}

// *ANCHOR - handle quantity changes in order summary (total price & discount)
const updateSummary = (products, subtotalElement, discountElement, totalElement , cart) => {
    let discountPercentage = (cart.total - cart.discountedTotal) / (cart.total*100)
    let subtotal = 0;

    products.forEach(product => {
        subtotal += (product.product.price * product.quantity);
    });

    const deliveryFee = 30;
    const discount = Math.floor(subtotal * (discountPercentage * 100));
    const total = subtotal - discount + deliveryFee;

    subtotalElement.innerText = `${subtotal} EGP`;
    discountElement.innerText = `${discount} EGP`;
    totalElement.innerText = `${total} EGP`;
}

getUserCart();
