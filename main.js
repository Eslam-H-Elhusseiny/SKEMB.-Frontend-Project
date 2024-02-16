// let urlParams = new URLSearchParams(window.location.search)
// var id=(urlParams.get('id'));
var id = 15;

fetch("https://dummyjson.com/products/" + id)
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
  });
