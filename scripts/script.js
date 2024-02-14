// *NOTE -  Swiper Library
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
