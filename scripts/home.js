const catImgArr = [
  "/assets/images/categories/c1.png",
  "/assets/images/categories/c2.png",
  "/assets/images/categories/c3.png",
  "/assets/images/categories/c4.png",
  "/assets/images/categories/c5.png",
  "/assets/images/categories/c6.png",
  "/assets/images/categories/c7.png",
  "/assets/images/categories/c8.png",
  "/assets/images/categories/c9.png",
  "/assets/images/categories/c10.png",
];

const catArr = [
  "Smartphones",
  "Laptops",
  "Fragrances",
  "Skincare",
  "Groceries",
  "Home Decor",
  "Furniture",
  "Furniture",
  "Furniture",
  "Furniture",
  "Furniture",
  "Furniture",
  "Furniture",
  "Furniture",
];

function displayCategoriesCircle() {
  const catCircle = document.querySelectorAll(".cat-circle");
  let i = 0;
  catCircle.forEach((circle) => {
    circle.style.backgroundImage = `url(${catImgArr[i++]})`;
  });
}
displayCategoriesCircle();

// -----------------------
// *LINK -  Swiper Library
// -----------------------
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

var swiper = new Swiper(".mySwiper2", {
  slidesPerView: "auto",
  spaceBetween: 30,
  centeredSlides: false,
  freeMode: true,

  // pagination: {
  //   el: ".swiper-pagination",
  //   clickable: true,
  // },
});
