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
  "/assets/images/categories/c11.png",
  "/assets/images/categories/c12.png",
  "/assets/images/categories/c13.png",
  "/assets/images/categories/c14.png",
  "/assets/images/categories/c15.png",
  "/assets/images/categories/c16.png",
  "/assets/images/categories/c17.png",
  "/assets/images/categories/c18.png",
];

const catCard = document.querySelectorAll(".cat-card");
let i = 0;
catCard.forEach((card) => {
  card.style.backgroundImage = `url(${catImgArr[i++]})`;
});
