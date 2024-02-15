fetch("https://dummyjson.com/products/1")
  .then((res) => res.json())
  .then((data) => console.log(data));
