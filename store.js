//JQuery



$(".add-to-cart").click(function(event){
  event.preventDefault();
  var name = $(this).attr("data-name");
  var price = Number ($(this).attr("data-price"));

  addItemToCart(name, price, 1)
  displayCart();
});

$("#clear-cart").click(function(event){
  clearCart();
  displayCart();
});

function displayCart(){

  var cartArray= listCart();
  var output = "";

  for (var i in cartArray) {
     output += "<li>"+cartArray[i].name+" "+cartArray[i].count+"</li>";
  }
  $("#show-cart").html(output);
  $("#total-cart").html(totalCart());
}

//***************************************** 
// Shopping cart functions

var cart = [];

var Item = function(name, price, count) {
  this.name = name
  this.price = price
  this.count = count
};

// add item to cart array function

 function addItemToCart(name, price, count){
   for (var i in cart) {
     if (cart[i].name === name) {
      cart[i].count += count;
      saveCart();
      return;
     }
   }
   var item = new Item (name, price, count);
    cart.push(item);
    saveCart();
 }

 //Removes one item from cart array

function removeItemFromCart(name) {
  for (var i in cart) {
    if (cart[i].name === name){
    cart[i].count --;
    if (cart [i].count === 0) {
      cart.splice(i, 1);
    }
    break;
  }
}
saveCart();
 } 

//removes all of item object

function removeAllItem (name){
 for (var i in cart) {
   if ( cart[i].name === name){
     cart.splice(i, 1);
     break;
   }
 }
 saveCart();
}

// clears entire cart 

function clearCart() {
  cart = [];
  saveCart();
}

// return total count

function countCart(){
  var totalCount = 0;
  for (var i in cart){
    totalCount += cart [i].count;
  }
  return totalCount;
}

//returns total cost

 function totalCart() {
   var totalCost = 0;
   for (var i in cart){
     totalCost += cart [i].price * cart[i].count;
   }
   return totalCost;
 }


//returns an array of all items in the cart

function listCart(){
  var cartCopy = [];
  for (var i in cart) {
    var item = cart [i];
    var itemCopy= {};
    for (var p in item) {
      itemCopy[p] = item[p];
    }
    cartCopy.push(itemCopy);
  }
  return cartCopy;
}

//Save cart when you leave and comeback

function saveCart(){
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
}

localStorage.setItem("username", "Joe")

// loadCart()

function loadCart(){
  cart = JSON.parse(localStorage.getItem("shoppingCart"));
}

loadCart();

displayCart();

// display the cart in the browser see html folder