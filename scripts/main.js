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