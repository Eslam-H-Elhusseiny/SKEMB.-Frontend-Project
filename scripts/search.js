// *NOTE get searchd product

async function searchInProduct() {
  let urlParams = new URLSearchParams(window.location.search);
  let search = urlParams.get("search");
  if (search.length >= 1) {
    try {
      const req = await fetch(
        "https://dummyjson.com/products/search?q=" + search
      );
      if (req.ok) {
        const res = await req.json();
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
// *NOTE end search function

//   let urlParams = new URLSearchParams(window.location.search);
//   let search = urlParams.get("search");
// console.log(search);
// console.log(typeof search);

// if (search.length >= 1) {
// searchInProduct();
// } else {
//   displayAllProducts();
// }
