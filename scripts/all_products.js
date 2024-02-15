// *ANCHOR -  get data of products using api
fetch("https://dummyjson.com/products/")
  .then((res) => {
    let products = res.json();
    return products;
  })

// *ANCHOR -  function of creating cards with all its details 

.then((data) => {

    for(let i=0 ; i<30 ; i++){
        let productItem = data.products[i];
        let productTitle = productItem.title;
        let productDetails = productItem.description ;
        let productPrice = productItem.price;
        let productImage = productItem.images[0];
        let productId = productItem.id;


                // Function to create a product card
                function createProductCard() {
                    // Create elements for the card
                    var card = document.createElement("div");
                    card.classList.add("card", "px-2", "py-2");
        
                    var cardProduct = document.createElement("div");
                    cardProduct.classList.add("card-product", "position-relative", "justify-end", "d-flex", "flex-col", "align-center");
        
                    var addToCartBtn = document.createElement("a");
                    addToCartBtn.href = "#";
                    addToCartBtn.classList.add("btn", "cart-btn", "w-75");
                    addToCartBtn.textContent = "Add To Cart";
        
                    var favIcon1 = document.createElement("a");
                    favIcon1.href = "#";
                    favIcon1.classList.add("fav", "position-absolute", "py-1", "px-2");
                    var favIcon1i = document.createElement("i");
                    favIcon1i.classList.add("fa-regular", "fa-heart");
                    favIcon1.appendChild(favIcon1i);
        
                    var favIcon2 = document.createElement("a");
                    favIcon2.href = "#";
                    favIcon2.classList.add("fav", "position-absolute", "py-1", "px-2", "fav-solid");
                    var favIcon2i = document.createElement("i");
                    favIcon2i.classList.add("fa-solid", "fa-heart");
                    favIcon2.appendChild(favIcon2i);
        
                    cardProduct.appendChild(addToCartBtn);
                    cardProduct.appendChild(favIcon1);
                    cardProduct.appendChild(favIcon2);
        
                    var cardText = document.createElement("div");
                    cardText.classList.add("card-text", "px-1");
        
                    var productName = document.createElement("h3");
                    productName.classList.add("product-h");
                    productName.textContent = productTitle;

        
                    var productDesc = document.createElement("p");
                    productDesc.classList.add("product-p");
                    productDesc.textContent = productDetails;
        
                    var priceColors = document.createElement("div");
                    priceColors.classList.add("price-colors", "mt-1", "align-center", "justify-between", "d-flex");
        
                    var priceTag = document.createElement("h4");
                    priceTag.classList.add("price-tag");
                    var currency = document.createElement("span");
                    currency.classList.add("currency");
                    currency.textContent = "EGP ";
                    var price = document.createElement("span");
                    price.classList.add("price");
                    price.textContent = productPrice;
                    priceTag.appendChild(currency);
                    priceTag.appendChild(price);
        
                    var colors = document.createElement("div");
                    colors.classList.add("colors", "d-flex");
        
                    // Create color options (You can modify or add more as needed)
                    var color1 = document.createElement("div");
                    color1.classList.add("color", "cursor-pointer", "color1", "color", "cursor-pointer-active");
        
                    var color2 = document.createElement("div");
                    color2.classList.add("color", "cursor-pointer", "color2");
        
                    var color3 = document.createElement("div");
                    color3.classList.add("color", "cursor-pointer", "color3");
        
                    var color4 = document.createElement("div");
                    color4.classList.add("color", "cursor-pointer", "color4");

                    cardProduct.style.backgroundImage = 'url('+ productImage +')';
        
                    // Append elements to their respective parents
                    priceColors.appendChild(priceTag);
                    priceColors.appendChild(colors);
                    colors.appendChild(color1);
                    colors.appendChild(color2);
                    colors.appendChild(color3);
                    colors.appendChild(color4);
        
                    cardText.appendChild(productName);
                    cardText.appendChild(productDesc);
                    cardText.appendChild(priceColors);
        
                    card.appendChild(cardProduct);
                    card.appendChild(cardText);

                    // *ANCHOR -  function to pass id to details page  
                    // productName.addEventListener('click' , )
                    // let urlParams = new URLSearchParams(window.location.search)
                    // var id=(urlParams.get('id'));
                    
        
                    return card;
                }
        
                // Append the created product card to the document
                var productContainer = document.getElementById("productContainer");
                productContainer.appendChild(createProductCard());

    
    }

} )



// *ANCHOR -  get data of categoties using api

fetch('https://dummyjson.com/products/categories')
  .then((res) => {
    let categories = res.json();
 
    return categories;
  })
  

// *ANCHOR -  function of creating cards with all its details 

.then((data) => {
    
    for(let i=0 ; i<20 ; i++){

        let category = data[i];

        // Create the <ul> element
        var ulElement = document.createElement("ul");

        // Create the <li> element
        var liElement = document.createElement("li");
        liElement.classList.add("link", "position-relative", "pb-1", "cursor-pointer", "side_bar_item");

        // Create the <a> element
        var aElement = document.createElement("a");
        aElement.href = "#";
        aElement.textContent = category;

        // Append the <a> element to the <li> element
        liElement.appendChild(aElement);

        // Append the <li> element to the <ul> element
        ulElement.appendChild(liElement);

        // Append the <ul> element to the document body (or any other desired parent element)
        var sideBar = document.getElementsByClassName("side_bar")[0];
        sideBar.appendChild(ulElement);



}    }

 )



