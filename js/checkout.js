const userInfo = JSON.parse(localStorage.getItem("user")) || [];

const cartSubtotal = document.querySelector(".subtotal span");
const cartTotal = document.querySelector(".total span");

const total = JSON.parse(localStorage.getItem("CartTotal")) || [];
cartSubtotal.textContent = total;
cartTotal.textContent = total;
let cartItems = JSON.parse(localStorage.getItem("CartItems"));
let token = JSON.parse(localStorage.getItem("jwtToken"));
console.log(token)
const newOrdersProducts = [];

for (const cartItem of cartItems) {
  const { dish} = cartItem;
  const { name, price, image } = dish
  newOrdersProducts.push({ name, price, image });
}
// console.log(newOrdersProducts, cartItems)
const callb = async()=>{
    try {
        const data = await fetch("https://busydine.onrender.com/api/orders", {
        method: "POST",
        body: JSON.stringify({
          ordersProducts: newOrdersProducts,
          status: "confirmed",
          purchaserInfo: {
            name: userInfo.name,
            phone: userInfo.phone,
            email: userInfo.email,
            userId: userInfo.userId,
          },
          shippingAddress: "Kumasi",
          orderId: "83230232",
          totalPrice: total,
        }),
        headers: {
          "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
      });
      const dd = await data.json();
      console.log(dd)
      } catch (error) {
        console.log(error)
      }
}

function payWithPaystack() {
  var handler = PaystackPop.setup({
    key: "pk_test_dd49e6db53342c7c4d6f2658c3786ec64348a5e6",
    email: userInfo.email,
    amount: total * 100,
    currency: "GHS",
    metadata: {
      custom_fields: [
        {
          display_name: "Mobile Money",
          variable: "mobile_money_gh",
          value: userInfo.phone,
        },
      ],
    },
    callback:  function () {
     callb()
    //   window.location.replace("index.html");
      // alert('success. '+ response)
    },
    onClose: function () {
      alert("transaction failed");
      window.location.replace("cart.html");
    },
  });
  handler.openIframe();
}
const cartContainer = document.querySelector(".cart");

cartItems.forEach((cartItem, index) => {
  const box = document.createElement("div");
  const content = document.createElement("div");
  const img = document.createElement("img");
  const h3 = document.createElement("h3");

  const spanPtext = document.createElement("span");

  const spanPrice = document.createElement("span");

  box.className = "box";
  img.src =
    "/backend/" + (cartItem.dish ? cartItem.dish.image : cartItem.drink.image);
  img.alt = cartItem.dish ? cartItem.dish.name : cartItem.drink.name;
  content.className = "content";
  h3.textContent = cartItem.dish ? cartItem.dish.name : cartItem.drink.name;
  spanPtext.className = "text";
  spanPtext.textContent = "price :";
  spanPrice.className = "price";
  spanPrice.textContent =
    "₵" + (cartItem.dish ? cartItem.dish.price : cartItem.drink.price);

  box.append(img);
  content.append(h3);
  content.append(spanPtext);
  content.append(spanPrice);
  box.append(content);
  cartContainer.append(box);
});
