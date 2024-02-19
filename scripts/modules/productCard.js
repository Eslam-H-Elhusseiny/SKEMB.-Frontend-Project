import { addToCart } from "./addtocart.js";
const imgArr = [
  "/assets/images/products/p1.png",
  "/assets/images/products/p2.png",
  "/assets/images/products/p3.png",
  "/assets/images/products/p4.png",
  "/assets/images/products/p5.png",
  "/assets/images/products/p6.png",
  "/assets/images/products/p7.png",
  "/assets/images/products/p8.png",
  "/assets/images/products/p9.png",
  "/assets/images/products/p10.png",
  "/assets/images/products/p11.png",
  "/assets/images/products/p12.png",
  "/assets/images/products/p13.png",
  "/assets/images/products/p14.png",
  "/assets/images/products/p15.png",
  "/assets/images/products/p16.png",
  "/assets/images/products/p17.png",
  "/assets/images/products/p18.png",
  "/assets/images/products/p19.png",
  "/assets/images/products/p20.png",
  "/assets/images/products/p21.png",
  "/assets/images/products/p22.png",
  "/assets/images/products/p23.png",
  "/assets/images/products/p24.png",
];

const productCard = (container, productsArray) => {
  let i = 0;
  productsArray.forEach((product) => {
    let src = ``;
    src = imgArr[i] ? imgArr[i++] : product ? product.images[0] : "";
    const card = document.createElement("div");
    card.innerHTML = `
        <!-- Card -->
        <div class="card px-2 py-2 h-100">
            <div class="card-product position-relative justify-end d-flex flex-col align-center">
                <a href="details.html?id=${product.id}"> <img src=${src} alt="${
      product.title
    }"/></a>
                <button --data-pId=${
                  product.id
                } class="btn addToCart w-85 cursor-pointer d-inline-block">Add To Cart</button>
                <button class="btn addToCartLoader w-85 cursor-pointer d-none"><i class="fa-solid fa-spinner fa-spin"></i></button>
                <div class="fav position-absolute py-1 px-2 fav-regular cursor-pointer"><i class="fa-regular fa-heart"></i></div>
                <div class="fav position-absolute py-1 px-2 fav-solid cursor-pointer d-none"><i class="fa-solid fa-heart"></i></div>
            </div>
            <div class="card-text px-1 d-flex flex-col">
                <a href="categories.html" class="product-cat mt-4">${
                  product.category
                }</a>
                <a href="details.html?id=${product.id}">
                  <h3 class="product-h mb-1">${product.title.slice(0, 24)}</h3>
                </a>
                <p class="product-p mb-3">${product.description.slice(
                  0,
                  125
                )}</p>
                <div class="price-colors my-1 align-center justify-between d-flex" >
                    <h4 class="price-tag">
                        <span class="currency">EGP</span>
                        <span class="price">${product.price * 30}</span>
                    </h4>
                    <div class="colors d-flex">
                      <div class="color cursor-pointer color1"></div>
                      <div class="color cursor-pointer color2"></div>
                      <div class="color cursor-pointer color3"></div>
                      <div class="color cursor-pointer color4"></div>
                    </div>
                </div>
            </div>
        </div>
    `;

    card.querySelector(".fav-regular").addEventListener("click", function () {
      card.querySelector(".fav-regular").classList.add("d-none");
      card.querySelector(".fav-solid").classList.remove("d-none");
    });

    card.querySelector(".fav-solid").addEventListener("click", function () {
      card.querySelector(".fav-regular").classList.remove("d-none");
      card.querySelector(".fav-solid").classList.add("d-none");
    });

    const colors = card.querySelectorAll(".color");

    colors.forEach((color) => {
      color.addEventListener("click", function () {
        colors.forEach((otherColor) => {
          otherColor.classList.remove("color-active");
        });
        this.classList.add("color-active");
      });
    });

    container.appendChild(card);
    let addToCartBtn = card.querySelector(".addToCart");
    let addToCartLoader = card.querySelector(".addToCartLoader");
    addToCartBtn.addEventListener("click", (e) => {
      addToCart(product.id, addToCartBtn, addToCartLoader);
    });
  });
};

export { productCard };
