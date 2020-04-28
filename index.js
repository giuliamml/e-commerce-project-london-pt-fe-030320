const body = document.querySelector("body");
// holds the current page
let currentPage;
//holds main container
const content = document.querySelector(".content");

////////////////////////////////
////// NAVIGATION
////////////////////////////////

//remove carousel from homepage and add products listing

const shopBtn = document.querySelector("#shop");
const homeBtn = document.querySelector("#home");
homeBtn.style.color = "#00C98C";
let navBar = document.querySelector("div.search>input");
let navBarIcon = document.querySelector("div.search>img");

shopBtn.addEventListener("click", () => {
  currentPage.remove();
  currentPage = createPLP();
  shopBtn.style.color = "#00C98C";
  homeBtn.style.color = "#22232B";
  content.append(currentPage);
  
  
});

homeBtn.addEventListener("click", () => {
  currentPage.remove();
  currentPage = createHome();
  shopBtn.style.color = "#22232B";
  homeBtn.style.color = "#00C98C";
  content.append(currentPage);
  navBar.placeholder = "";
});

////////////////////////////////
////// UTIL
////////////////////////////////
var util = {};

util.getUnique = function(type) {
  let colours = PRODUCTS.map((product) => product[type])
    .reduce((acc, el) => acc.concat(el), [])
    .reduce((acc, colour) => {
      if (
        acc.find((el) => {
          return colour === el;
        })
      ) {
        return acc;
      } else {
        acc.push(colour);
        return acc;
      }
    }, []);

  return colours;
};

util.hasElements = function(array, secondArray) {
  let bool = false;
  for (el of secondArray) {
    if (array.includes(el)) {
      bool = true;
      break;
    }
  }
  return bool;
};

util.priceRange = function() {
  range = PRODUCTS.map((p) => p.price);
  return {
    min: Math.min.apply(null, range),
    max: Math.max.apply(null, range),
  };
};

//mobile functionalities

// const mobileNav = document.querySelector(".mobile_navigation");
// const burgerMenuMobile = document.querySelector('.burger_menu_container')
// burgerMenuMobile.addEventListener("click", (e) => {
//   mobileNav.style.visibility = "visible";
// });

// const shopBtn_mobile = document.querySelector('#shop_mobile')
// shopBtn_mobile.addEventListener("click", () => {
//   //createPLP
  
// });



// function createMobileFilters(){
//   let mobileFiltersDiv = document.createElement('div')
//   mobileFiltersDiv.className = 'mobile_filters_div'
//   mobileFiltersDiv.innerHTML = ` 
//   <summary>
//   <span>Filters</span>
//   <img src='./images/shapes/Path.svg'/>
//   </summary>`
//   content.prepend(mobileFiltersDiv)

// }