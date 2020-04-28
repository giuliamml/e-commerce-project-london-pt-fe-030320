const cartQuantityDiv = document.querySelector("div.cart_quantity");
const searchBar = document.querySelector("div.search_bar");

function renderPDP(product) {
  let name = product.name;

  searchBar.style.visibility = "hidden";

  console.log("PDP has been created");
  let productDiv = document.createElement("div");
  productDiv.className = "PDP_content";
  // productDiv.innerText = JSON.stringify(product);

  let productImgDiv = document.createElement("div");
  productImgDiv.className = "product_images";

  let productImg = document.createElement("img");
  productImg.className = "image";
  productImg.src = "./images/couch_image_PDP.svg";

  let productCarousel = document.createElement("div");
  productCarousel.className = "product_images_carousel";
  productCarousel.innerHTML =
    '<button id="previous"><img src="./images/shapes/carousel_arrow_previous.svg"/></button><img src="./images/productCarousel1.svg"/><img src="./images/productCarousel2.svg"/><img src="./images/productCarousel3.svg"/><img src="./images/productCarousel4.svg"/><button id="next"><img src="./images/shapes/carousel_arrow_next.svg"/></button>';

  let productDetailsWrapper = document.createElement("div");
  productDetailsWrapper.className = "product_details";

  let productName = document.createElement("h3");
  productName.className = "name";
  productName.innerText = product.name;

  let productDescription = document.createElement("p");
  productDescription.className = "description";
  productDescription.innerText = product.description;

  let productPrice = document.createElement("p");
  productPrice.className = "price";
  productPrice.innerText = `$${product.price}`;

  let deliveryInfo = document.createElement("p");
  deliveryInfo.className = "delivery";
  deliveryInfo.innerHTML = "DISPATCHED IN 2-3 WEEKS, ONLY <span>4 LEFT</span> ";

  let productDetails = document.createElement("details");
  productDetails.className = "details";
  productDetails.innerHTML = `<summary><span class='PDP'>Details</span><img src='./images/shapes/Arrow.svg'/></summary>
    - Dimensions: W: ${product.dimensions["w"]}cm, H: ${
    product.dimensions["h"]
  }cm, D: ${product.dimensions["d"]}cm <br>
    - Seat dimensions: W: ${product.seat_dimensions["w"]}cm, H: ${
    product.dimensions["h"]
  }cm, D: ${product.dimensions["d"]}cm <br>
    - Weight: ${product.weight}Kg <br>
    - Materials: ${product.materials.join(", ")} <br>
    - Filling materials: ${product.filling_materials.join(", ")} <br>
    - Comfort level: ${product.comfort_level}`;

  let colorSwatchDiv = document.createElement("div");
  colorSwatchDiv.className = "color_swatches";

  product.colors.forEach((col) => {
    let colorSwatchBtn = document.createElement("button");
    colorSwatchBtn.style.backgroundColor = col;
    colorSwatchDiv.append(colorSwatchBtn);
  });

  let cartBtn = document.createElement("button");
  cartBtn.classList = "add_to_cart_btn";
  cartBtn.innerText = "ADD TO BASKET";
  cartBtn.addEventListener("click", (e) => {
    cartBtn.style.background = "#00C98C";
    cartBtn.innerText = "go to checkout";
    cartBtn.style.paddingLeft = "62px";
    cartBtn.style.paddingRight = "62px";

    cartQuantityDiv.style.visibility = "visible";
    let cartData = getCartData();
    cartQuantityDiv.innerText = `${cartData.length}`;

    if (!cart.hasProduct(name)) {
      cart.add(name);
    }
  });

  productDetailsWrapper.append(
    productName,
    productDescription,
    productPrice,
    deliveryInfo,
    colorSwatchDiv,
    cartBtn,
    productDetails
  );
  productImgDiv.append(productImg, productCarousel);
  productDiv.append(productImgDiv, productDetailsWrapper);

  return productDiv;
}

// //PDP carousel
// const productCarousel = document.querySelector('.product_images_carousel')
// const  previousBtn = document.querySelector('button#previous')
// const  nextBtn = document.querySelector('button#next')