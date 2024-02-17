const productCard = (container, productsArray, page, imgArr = "") => {
  let i = 0;
  productsArray.forEach((product) => {
    let src = ``;
    if (page === "home") {
      src = imgArr[i] ? imgArr[i++] : product ? product.images[0] : "";
    } else {
      src = product ? product.images[0] : "";
    }
    const card = document.createElement("div");
    card.innerHTML = `
        <!-- Card -->
        <div class="card px-2 py-2 h-100">
            <div class="card-product position-relative justify-end d-flex flex-col align-center">
                <img src=${src} alt="${product.title}"/>
<<<<<<< HEAD
                <a href="#" class="btn cart-btn w-85">Add To Cart</a>
=======
                <a href="#" class="btn cart-btn w-75" onclick="addToCart(${
                  product.id
                })">Add To Cart</a>
>>>>>>> 73e711d5e2cd8845be621c700b4724b150e815e6
                <a href="#" class="fav position-absolute py-1 px-2"><i class="fa-regular fa-heart"></i></a>
                <a href="#" class="fav position-absolute py-1 px-2 fav-solid"><i class="fa-solid fa-heart"></i></a>
            </div>
            <div class="card-text px-1 d-flex flex-col">
                <a href="${product.category}" class="product-cat mt-4">${
      product.category
    }</a>
<<<<<<< HEAD
                <a href="details.html?id=${
=======
                <a href="cart.html?id=${
>>>>>>> 73e711d5e2cd8845be621c700b4724b150e815e6
                  product.id
                }"><h3 class="product-h mb-1">${product.title.slice(
      0,
      25
    )}</h3></a>
                <p class="product-p">${product.description}</p>
                <div class="price-colors my-1 align-center justify-between d-flex" >
                    <h4 class="price-tag">
                        <span class="currency">EGP</span>
                        <span class="price">${product.price * 30}</span>
                    </h4>
                    <div class="colors d-flex">
                    <div class="color cursor-pointer color1 color color-active" ></div>
                    <div class="color cursor-pointer color2"></div>
                    <div class="color cursor-pointer color3"></div>
                    <div class="color cursor-pointer color4"></div>
                </div>
            </div>
        </div>
    `;
    container.appendChild(card);
  });
};
<<<<<<< HEAD
=======

>>>>>>> 73e711d5e2cd8845be621c700b4724b150e815e6
export { productCard };
