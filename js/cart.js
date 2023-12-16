// cartItems
const cartSubtotal = document.querySelector(".subtotal span");
const cartTotal = document.querySelector(".total span");

let cartItems = JSON.parse(localStorage.getItem("CartItems"));
console.log(cartItems);
const cartContainer = document.querySelector(".cart");
document.querySelector("#cart-btn").addEventListener("click", () => {
  cart.classList.toggle("active");
  console.log(cartItems);
});
const emptyCart = document.querySelector(".empty-cart");

let total = 0; // Parse current total

cartItems.forEach((cartItem, index) => {
  if (cartItems.length > 0) {
    emptyCart.classList.add("no-display");
  } else if (cartItems.length === 0) {
    emptyCart.classList.remove("no-display");
  }

  const box = document.createElement("div");
  const i = document.createElement("i");
  const content = document.createElement("div");
  const img = document.createElement("img");
  const h3 = document.createElement("h3");
  const spanQ = document.createElement("span");
  const input = document.createElement("input");
  const br = document.createElement("br");

  const spanPtext = document.createElement("span");

  const spanPrice = document.createElement("span");

  box.className = "box";
  i.className = "fas fa-times";
  img.src =
    "/backend/" + (cartItem.dish ? cartItem.dish.image : cartItem.drink.image);
  img.alt = cartItem.dish ? cartItem.dish.name : cartItem.drink.name;
  content.className = "content";
  h3.textContent = cartItem.dish ? cartItem.dish.name : cartItem.drink.name;
  spanQ.textContent = "quantity :";
  input.type = "number";
  input.value = cartItem.quantity;
  input.min = "1";
  spanPtext.textContent = "price :";
  spanPrice.className = "price";
  spanPrice.textContent =
    "₵" + (cartItem.dish ? cartItem.dish.price : cartItem.drink.price);

  box.append(i);
  box.append(img);
  content.append(h3);
  content.append(spanQ);
  content.append(input);
  content.append(spanPtext);
  content.append(spanPrice);
  box.append(content);
  cartContainer.append(box);

  input.addEventListener("change", (event) => {
    // Update quantity based on user input
    const newQuantity = event.target.value;
    const price = cartItem.dish.price;
    if (newQuantity < cartItem.quantity) {
      total -= price;
      
    }
    if (newQuantity > cartItem.quantity) {
        total += price;
    }
    cartItem.quantity = newQuantity; // Update original cart item object
    localStorage.setItem("CartTotal", JSON.stringify(total));

    // Update price based on new quantity
    // const priceChange = price * (newQuantity - input.value); // Difference from previous value

    // Update total

    // Update subtotal and total display
    cartSubtotal.textContent = "₵" + total;
    cartTotal.textContent = "₵" + total;
    console.log(input.value);
    // Update localStorage with updated quantity
    localStorage.setItem("CartItems", JSON.stringify(cartItems));
  });

  i.addEventListener("click", () => {
    let carts = JSON.parse(localStorage.getItem("CartItems"));
    const updatedCartItems = carts.filter(
      (item) => item.dish._id !== cartItem.dish._id
    );
    console.log(carts);
    localStorage.setItem("CartItems", JSON.stringify(updatedCartItems));
    box.style.display = "none";

    const price = cartItem.dish.price;
    const quantity = cartItem.quantity;

    total -= price * quantity;
    localStorage.setItem("CartTotal", JSON.stringify(total));

    cartSubtotal.textContent = "₵" + total;
    cartTotal.textContent = "₵" + total;

    if (carts.length === 0) {
      emptyCart.classList.remove("no-display");
    }
  });
});
// let total = 0
cartItems.forEach((item) => {
  total += item.quantity * item.dish.price;
  localStorage.setItem("CartTotal", JSON.stringify(total));
});
cartSubtotal.textContent = "₵" + total;
cartTotal.textContent = "₵" + total;
const checkBtn = document.querySelector('.checkout')
const userInfo = JSON.parse(localStorage.getItem('user')) || []

if(userInfo){
    checkBtn.href = 'checkout.html'
}
// checkBtn.add('click', ()=>{
// })