// *NOTE - user image in navbar  (profile)
window.addEventListener("load", () => {
  const user_image = localStorage.getItem("user-image");
  const user_image_profile = document.getElementById("user-image-profile");
  if (user_image) {
    user_image_profile.innerHTML = `<img style='width:30px' src=${user_image} alert='user'>`;
  }
  // when use click icon if he is aleady login
  user_image_profile.addEventListener("click", (event) => {
    user_image
      ? (window.location.href = "/profile.html")
      : (window.location.href = "/login.html");
  });
});

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

// NOTE  search product

async function search() {
  event.preventDefault();
  const InputData = document.querySelector("input[name=search-product]").value;
  if (InputData.length >= 1) {
    window.location.href = "/all_products.html?search=" + InputData;
  }
  InputData.value = "";
}
const form = document.querySelector("#search-container");
document.addEventListener("submit", search);

  

// *ANCHOR - CART OVER WEBSITE

  // *ANCHOR - Cart ICON NUMBER ON NAVBAR
  const getCartQuantity = ()=>{
    const carts = JSON.parse(localStorage.getItem('skembUserCart'));
    if (carts) {
      document.querySelector('.cartQuantity').innerHTML = carts.length
    }else{
      document.querySelector('.cartQuantity').innerHTML = "0"
    }
  }
  getCartQuantity()
  // *ANCHOR - SIDE MENU FOR CART & CART ACTIONS FROM IT
  document.querySelector('.cartBtn').addEventListener('click' , ()=>{
    let cartSideMenue = document.querySelector('.sideCartContainer')
    document.querySelector('.cartSide').style.display = "block"
    document.querySelector('.cartSide').style.right = "0"
    document.querySelector('.goCart').addEventListener('click' , ()=>{
      window.location.href = "/cart.html" 
    })
    const getUserSideCart =  () => {
      try {
          const carts = JSON.parse(localStorage.getItem('skembUserCart'));
          if (carts) {
            displaySideCartProducts(carts );
            attachSideEventListeners(carts );  
          }
      } catch (error) {
          console.error('Error fetching user cart:', error);
      }
    }
    
    const displaySideCartProducts = (products ) => {
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
                      <p class="fs-5 text-dark-blue product-price">${products[i].product.price * 30 * products[i].quantity} EGP</p>
                  </div>
              </div>
          </div>`;
      }
      cartSideMenue.innerHTML = cartProductsContainer ;
    }

    const attachSideEventListeners = (products) => {
      products.forEach((product, index) => {
          const decreaseBtn = document.querySelectorAll('.decrease')[index];
          const increaseBtn = document.querySelectorAll('.increase')[index];
          const quantityElement = document.querySelectorAll('.quantity')[index];
          const priceElement = document.querySelectorAll('.product-price')[index];
          const removeBtn = document.querySelectorAll('.remove-product')[index];

          decreaseBtn.addEventListener('click', () => {
              if (product.quantity > 1) {
                  product.quantity--;
                  quantityElement.textContent = product.quantity;
                  priceElement.textContent = `${product.product.price * product.quantity} EGP`;
                  localStorage.setItem("skembUserCart", JSON.stringify(products));
                  
              }
          });
  
          increaseBtn.addEventListener('click', () => {
              product.quantity++;
              quantityElement.textContent = product.quantity;
              priceElement.textContent = `${product.product.price * product.quantity} EGP`;
              localStorage.setItem("skembUserCart", JSON.stringify(products));
              
          });

          removeBtn.addEventListener('click', (e) => {
            console.log("remove");
            products.splice(index, 1);
            displaySideCartProducts(products);
            localStorage.setItem("skembUserCart", JSON.stringify(products));
            location.reload();
        });

      });
  }
  
  getUserSideCart()
  })
  document.querySelector('.closeSideCart').addEventListener('click' , ()=>{
    document.querySelector('.cartSide').style.right = "-50vw"
  })
export {getCartQuantity} ;