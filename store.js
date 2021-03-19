//JQuery

$(".add-to-cart").click(function(event){
  event.preventDefault();
  var name = $(this).attr("data-name");
  var price = Number ($(this).attr("data-price"));

  shoppingCart.addItemToCart(name, price, 1)
  displayCart();
});

$("#clear-cart").click(function(event){
  shoppingCart.clearCart();
  displayCart();
});

function displayCart(){

  var cartArray = shoppingCart.listCart();
  var output = "";

  for (var i in cartArray) {
     output += "<li>"
     +cartArray[i].name
     +" "+cartArray[i].count
     +" x "+cartArray[i].price
     +" = "+cartArray[i].total
     +" <button class='plus-item' data-name='"
     +cartArray[i].name
     +"'>+</button>"
     +" <button class='subtract-item' data-name='"
     +cartArray[i].name
     +"'>-</button>"
     +" <button class='subtract-item' data-name='"
     +cartArray[i].name
     +"'>X</button>"
     +"</li>";
  }

  $("#show-cart").html(output);
  $("#count-cart").html (shoppingCart.countCart());
  $("#total-cart").html(shoppingCart.totalCart());
}

$("#show-cart").on("click", ".subtract-item", function(event){
  var name = $(this).attr("data-name");
  shoppingCart.removeAllItem (name);
  displayCart();
});

$("#show-cart").on("click", ".subtract-item", function(event){
  var name = $(this).attr("data-name");
  shoppingCart.removeItemFromCart (name);
  displayCart();
});

$("#show-cart").on("click", ".plus-item", function(event){
  var name = $(this).attr("data-name");
  shoppingCart.addItemToCart(name, 0, 1);
  displayCart ();
});

//***************************************** 
// Shopping cart functions

var shoppingCart = {};
shoppingCart.cart = [];

shoppingCart.Item = function(name, price, count) {
  this.name = name
  this.price = price
  this.count = count
};

// add item to cart array function

shoppingCart.addItemToCart = function (name, price, count){
  for (var i in this.cart) {
    if (this.cart[i].name === name) {
     this.cart[i].count += count;
     this.saveCart();
     return;
    }
  }
  var item = new this.Item (name, price, count);
   this.cart.push(item);
   this.saveCart();
}

 //Removes one item from cart array

 shoppingCart.removeItemFromCart = function (name) {
  for (var i in this.cart) {
    if (this.cart[i].name === name){
    this.cart[i].count --;
    if (this.cart [i].count === 0) {
      this.cart.splice(i, 1);
    }
    break;
  }
}
this.saveCart();
 } 

//removes all of item object

shoppingCart.removeAllItem  = function(name) {
 for (var i in this.cart) {
   if (this.cart[i].name === name) {
     this.cart.splice(i, 1);
     break;
   }
 }
 this.saveCart();
}

// clears entire cart 

shoppingCart.clearCart = function () {
  this.cart = [];
  this.saveCart();
}

// return total count

shoppingCart.countCart = function (){
  var totalCount = 0;
  for (var i in this.cart){
    totalCount += this.cart [i].count;
  }
  return totalCount;
}

//returns total cost

shoppingCart.totalCart = function () {
   var totalCost = 0;
   for (var i in this.cart){
     totalCost += this.cart [i].price * this.cart[i].count;
   }
   return totalCost.toFixed(2);
 }


//returns an array of all items in the cart

shoppingCart.listCart = function (){
  var cartCopy = [];
  for (var i in this.cart) {
    var item = this.cart[i];
    var itemCopy = {};
    for (var p in item) {
      itemCopy[p] = item[p];
    }
    itemCopy.total = (item.price * item.count).toFixed(2);
    cartCopy.push(itemCopy);
  }
  return cartCopy;
}

//Save cart when you leave and comeback

shoppingCart.saveCart = function (){
  localStorage.setItem("shoppingCart", JSON.stringify(this.cart));
}

// loadCart()

shoppingCart.loadCart = function (){
  this.cart = JSON.parse(localStorage.getItem("shoppingCart"));
}

shoppingCart.loadCart();

displayCart();

// display the cart in the browser see html folder