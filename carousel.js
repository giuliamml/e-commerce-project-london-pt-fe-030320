const carouselSlide = document.querySelector(".carousel_slide");
const carouselImages = document.querySelectorAll(".carousel_slide img");
const carouselContainer = document.querySelector(".carousel_container");

function createHome(){
  searchBar.style.visibility = 'visible'
    return carouselContainer;
}

//carousel buttons
const previousBtn = document.querySelector(".button-left");
const nextBtn = document.querySelector(".button-right");

//counter
let counter = 1;
const size = carouselImages[0].clientWidth;


carouselSlide.style.transform = "translateX(" + -size * counter + "px)";

//button listeners
nextBtn.addEventListener("click", () => {
  if (counter >= carouselImages.length - 1) return;
  carouselSlide.style.transition = "transform 0.4s ease-in-out";
  counter++;
  carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
});

previousBtn.addEventListener("click", () => {
  if (counter <= 0) return;
  carouselSlide.style.transition = "transform 0.4s ease-in-out";
  counter--;
  carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
});

carouselSlide.addEventListener("transitionend", () => {
  if (carouselImages[counter].id === "lastClone") {
    carouselSlide.style.transition = "none";
    counter = carouselImages.length - 2;
    carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
  }
  if (carouselImages[counter].id === "firstClone") {
    carouselSlide.style.transition = "none";
    counter = carouselImages.length - counter;
    carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
  }
});

currentPage = carouselContainer;