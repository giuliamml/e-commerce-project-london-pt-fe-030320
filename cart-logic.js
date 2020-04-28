const cart = {};

function getCartData() {
  return localStorage.getItem("cart") != null
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
}

cart.add = function(name) {
  let cartData = getCartData();

  if (!cartData.includes(name)){
    cartData.push(name)
    localStorage.setItem("cart", JSON.stringify(cartData));
  }
}

cart.remove = function(name){
    let cartData = getCartData();

    if (cartData.includes(name)){
        cartData.splice(cartData.indexOf(name), 1)
        localStorage.setItem("cart", JSON.stringify(cartData));
    }
}

cart.hasProduct = function(name){
    return getCartData().includes(name)
}