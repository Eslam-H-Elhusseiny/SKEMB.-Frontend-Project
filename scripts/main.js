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
