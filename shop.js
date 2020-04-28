//TODO: remove?
const allProductsName = PRODUCTS.map((product) => product.name);
const allProductsPrice = PRODUCTS.map((product) => "$" + product.price);

const pagination = document.querySelector("div.pagination");

function createPLP() {
  let pageDiv = document.createElement("div");
  pageDiv.classList = "PLP_content";
  searchBar.style.visibility = "visible";
  createSelectors(pageDiv);
  renderAllProducts(pageDiv, PRODUCTS);
 
  return pageDiv;
}

function createSelectors(pageDiv) {

  let filtersDiv = document.createElement("div");
  filtersDiv.className = "filters_div";

  let filtersText = document.createElement("p");
  filtersText.innerText = "filter by";

  //colours
  let coloursDiv = document.createElement("div");
  coloursDiv.className = "colors_filter";
  let coloursDetailsEl = document.createElement("details");
  coloursDetailsEl.className = "colors_details";
  coloursDetailsEl.innerHTML =
    "<summary><span>Color</span><img src='./images/shapes/Path.svg'/></summary>";
  coloursDiv.append(coloursDetailsEl);

  renderInputs("colors", coloursDetailsEl);

  //collection
  let collectionsDiv = document.createElement("div");
  collectionsDiv.className = "collection_filter";
  let collectionsDetailsEl = document.createElement("details");
  collectionsDetailsEl.className = "collections_details";
  collectionsDetailsEl.innerHTML =
    "<summary><span>Collection</span><img class='arrow' src='./images/shapes/Path.svg'/></summary>";
  collectionsDiv.append(collectionsDetailsEl);

  //types
  let typesDiv = document.createElement("div");
  typesDiv.className = "type_filter";
  let typesDetailsEl = document.createElement("details");
  typesDetailsEl.className = "types_details";
  typesDetailsEl.innerHTML =
    "<summary><span>Category</span><img class='arrow' src='./images/shapes/Path.svg'/></summary>";
  typesDiv.append(typesDetailsEl);

  renderInputs("type", typesDetailsEl);

  function renderInputs(type, element) {
    util.getUnique(type).forEach((el) => {
      let divInput = document.createElement("div");
      divInput.className = "input_el";
      input = document.createElement("input");
      input.setAttribute("type", "checkbox");
      label = document.createElement("label");
      label.innerText = `${el}`;
      input.value = `${el}`;

      input.addEventListener("change", (input) => {
        let products = updateProducts();
        console.log(products);
        renderAllProducts(pageDiv, products);
      });
      divInput.append(input, label);
      element.append(divInput);
    });
  }

  //price
  let minPrice = util.priceRange().min;
  let maxPrice = util.priceRange().max;

  let priceDiv = document.createElement("div");
  priceDiv.className = "price_filter";

  priceDiv.innerHTML = `<span id="min">$${minPrice}</span>
  <input type="range" class="input_1" min="${minPrice}" max="${maxPrice}" value="${minPrice}"></input>
  <input type="range" class="input_2" min="${minPrice}" max="${maxPrice}" value="${maxPrice}"></input>
  <span id="max">$${maxPrice}</span>`;

  function updateValues() {
    let priceInputOne = document.querySelectorAll("div.price_filter input")[0];
    let priceInputTwo = document.querySelectorAll("div.price_filter input")[1];
    var sliderOne = parseFloat(priceInputOne.value);
    var sliderTwo = parseFloat(priceInputTwo.value);
    if (sliderOne > sliderTwo) {
      var tmp = sliderTwo;
      sliderTwo = sliderOne;
      sliderOne = tmp;
    }
    var displayValues = document.querySelectorAll("div.price_filter>span");
    displayValues[0].innerText = `$${sliderOne}`;
    displayValues[1].innerText = `$${sliderTwo}`;
    let products = updateProducts();
    console.log(products.length);
    renderAllProducts(pageDiv, products);
  }

  filtersDiv.append(
   
    filtersText,
    collectionsDiv,
    coloursDiv,
    typesDiv,
    priceDiv
  );

  pageDiv.append(filtersDiv);

  let priceInputOne = priceDiv.querySelectorAll("input")[0];
  priceInputOne.oninput = updateValues;

  let priceInputTwo = priceDiv.querySelectorAll("input")[1];
  priceInputTwo.oninput = updateValues;

  
}

function updateProducts() {
  let colorInputs = Array.from(
    document.querySelectorAll(".colors_filter input")
  );

  let typesInput = Array.from(document.querySelectorAll(".type_filter input"));

  let colorSwatches = colorInputs
    .filter((el) => el.checked)
    .map((el) => el.value);

  let types = typesInput.filter((el) => el.checked).map((el) => el.value);

  let priceInputs = document.querySelectorAll("div.price_filter input");

  let value1 = parseInt(priceInputs[0].value);
  let value2 = parseInt(priceInputs[1].value);

  let from = Math.min(value1, value2);
  let to = Math.max(value1, value2);

  return PRODUCTS.filter((p) => {
    return (
      util.hasElements(p.colors, colorSwatches) || colorSwatches.length === 0
    );
  })
    .filter((p) => {
      return types.includes(p.type) || types.length === 0;
    })
    .filter((p) => {
      return p.price > from && p.price < to;
    });
}

//create div for all products listing PLP
function renderAllProducts(pageDiv, products) {
  let productsDiv = document.querySelector(".all_products_listing");

  if (productsDiv) {
    productsDiv.remove();
  }

  const allProductsDiv = document.createElement("div");
  allProductsDiv.className = "all_products_listing";

  for (i = 0; i < products.length; i++) {
    createProductDiv(i);
  }

  function createProductDiv(i) {
    const singleProductDiv = document.createElement("div");
    singleProductDiv.className = "products";

    const productImg = document.createElement("img");
    productImg.className = "product_img";
    productImg.src = products[i].image;

    const productName = document.createElement("h3");
    productName.className = "product_name";
    productName.innerText = products[i].name;

    const productCategory = document.createElement("p");
    productCategory.className = `product_category`;
    productCategory.innerText = products[i].type;

    const productPrice = document.createElement("p");
    productPrice.className = "product_price";
    productPrice.innerText = `$ ${products[i].price}`;

    const quickCartBtn = document.createElement("button");
    quickCartBtn.innerHTML = '<img src="./images/icons/quickCartBtn.svg"/>';
    quickCartBtn.className = "quick_cart_button";

    const productTextDiv = document.createElement("div");
    productTextDiv.className = "product_text";

    singleProductDiv.append(
      productImg,
      productName,
      productTextDiv,
      quickCartBtn
    );
    productTextDiv.append(productCategory, productPrice);
    allProductsDiv.append(singleProductDiv);

    singleProductDiv.addEventListener("click", (e) => {
      currentPage.remove();
      currentPage = renderPDP(products[i]);
      content.append(currentPage);
    });
  }

  pageDiv.append(allProductsDiv);
}

//pagination

function createPagination(pageDiv) {
  let numberPages = Math.ceil(PRODUCTS.length / 6);

  let paginatorEl = document.createElement("div");
  paginatorEl.className = "pagination";

  for (let n = 1; n < numberPages + 1; n++) {
    let el = document.createElement("div");
    el.innerHTML = n;
    paginatorEl.append(el);
  }

  pageDiv.append(paginatorEl);
}




//sort products
const sortingOptions = document.querySelector("select.sorting_options");

let sortProducts = sortingOptions.addEventListener("change", (e) =>
  productSort(e.target.value)
);

function productSort(option) {
  if (option === "Default") {
    PRODUCTS.sort((a, b) => {
      return a.name - b.name;
    });
  } else if (option === "Price1") {
    PRODUCTS.sort((a, b) => {
      return a.price - b.price;
    });
  } else if (option === "Price2") {
    PRODUCTS.sort((a, b) => {
      return b.price - a.price;
    });
  }
}
