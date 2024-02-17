export async function searchInProduct(url, productCard) {
  let search = url.get("search");
  if (search) {
    try {
      const req = await fetch(
        "https://dummyjson.com/products/search?q=" + search
      );
      if (req.ok) {
        const res = await req.json();
        const cards = document.getElementById("productContainer");
        productCard(cards, res.products, "all");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return false;
}
