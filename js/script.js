
function openInSameWindow(evt) {
  window.location = evt;
}



document.querySelector(".home").onmousemove = (e) => {
  let x = (window.innerWidth - e.pageX * 2) / 90;
  let y = (window.innerHeight - e.pageY * 2) / 90;

  document.querySelector(
    ".home .home-img"
  ).style.transform = `translateX(${y}px)
    translateY(${x}px)`;

  //document.querySelector('.home .home-beaute-img').style.transform = `translateX(${y}px)
  //translateY(${x}px)`;
};

document.querySelector(".home").onmouseleave = (e) => {
  document.querySelector(".home .home-img").style.transform = `translateX(0px)
    translateY(0px)`;
};

// document.querySelector(".home").onmouseleave = (e) => {
//   document.querySelector(
//     ".home .home-beaute-img"
//   ).style.transform = `translateX(0px)
//     translateY(0px)`;
// };

const dishContainer = document.querySelector(".dishes");

const fetchAllDishes = async () => {
  try {
    const data = await fetch("https://busydine.onrender.com/api/dishes", {
      method: "GET",
    });
    const res = await data.json();
    localStorage.setItem("Dishes", JSON.stringify(res.dish));
  } catch (error) {
    console.log(error);
  }
};
fetchAllDishes();

const getDishes = JSON.parse(localStorage.getItem("Dishes"));
const dishes = getDishes.slice(0, 3);
dishes.forEach((dish, index) => {
  const box = document.createElement("div");
  const price = document.createElement("div");
  const stars = document.createElement("div");
  const imageContainer = document.createElement("div");
  const img = document.createElement("img");
  const content = document.createElement("div");
  const h3 = document.createElement("h3");
  const p = document.createElement("p");
  const a = document.createElement("button");
  const span = document.createElement("span");
  const emptySpan = document.createElement("a");

  img.src = "https://h-erbie.github.io/busyDine/backend/" + dish.image;
  img.alt = dish.name;
  img.style.width = "205px";
  img.style.height = "150px";
  box.className = "box";
  price.className = "price";
  stars.className = "stars";
  content.className = "content";
  imageContainer.className = "image";

  imageContainer.append(img);
  h3.textContent = dish.name;
  p.textContent = dish.desc;
  p.style.textAlign = "center";
  content.append(h3);
  content.append(p);
  for (let j = 0; j < 5; j++) {
    const i = document.createElement("i");

    if (j < 4) {
      i.className = "fas fa-star";
    } else if (j === 4) {
      i.className = "fas fa-star-half-alt";
    }
    stars.append(i);
  }
  content.append(stars);
  span.textContent = " ₵" + dish.previousPrice;
  price.append("₵" + dish.price);
  emptySpan.textContent = "   ";
  price.append(emptySpan);
  price.append(span);

  content.append(price);
  a.className = "btn addToCart";
  a.textContent = "add to cart";
  content.append(a);

  box.append(imageContainer);
  box.append(content);

  dishContainer.append(box);

  a.addEventListener("click", () => {
    let cartItems = JSON.parse(localStorage.getItem("CartItems")) || [];

    const existingItem = cartItems.find((item) => item.dish._id === dish._id);
    if (!existingItem) {
      // Add new item
      cartItems.push({ dish, quantity: 1 }); // Update quantity as needed
    } else {
      // Update existing item
      existingItem.quantity++;
    }
    localStorage.setItem("CartItems", JSON.stringify(cartItems));
    // console.log(cartItems)
  });
});

const fetchAllDrinks = async () => {
  try {
    const data = await fetch("https://busydine.onrender.com/api/drinks", {
      method: "GET",
    });
    const res = await data.json();
    localStorage.setItem("Drinks", JSON.stringify(res.drink));
  } catch (error) {
    console.log(error);
  }
};
fetchAllDrinks();
const DrinkContainer = document.querySelector(".drinks");
const getDrinks = JSON.parse(localStorage.getItem("Drinks"));
console.log(getDrinks)

const drinks = getDrinks.slice(0, 4);
drinks &&
  drinks.forEach((drink) => {
    const box = document.createElement("div");
    const price = document.createElement("div");
    const stars = document.createElement("div");
    const imageContainer = document.createElement("div");
    const img = document.createElement("img");
    const content = document.createElement("div");
    const h3 = document.createElement("h3");
    const p = document.createElement("p");
    const a = document.createElement("button");
    const span = document.createElement("span");
    const emptySpan = document.createElement("a");

    img.src = "https://h-erbie.github.io/busyDine/backend/" + drink.image;
    img.alt = drink.name;
    img.style.width = "205px";
    img.style.height = "150px";
    box.className = "box";
    price.className = "price";
    stars.className = "stars";
    content.className = "content";
    imageContainer.className = "image";

    imageContainer.append(img);
    h3.textContent = drink.name;
    content.append(h3);
    for (let j = 0; j < 5; j++) {
      const i = document.createElement("i");

      if (j < 4) {
        i.className = "fas fa-star";
      } else if (j === 4) {
        i.className = "fas fa-star-half-alt";
      }
      stars.append(i);
    }
    content.append(stars);
    span.textContent = " ₵" + drink.previousPrice;
    price.append("₵" + drink.price);
    emptySpan.textContent = "   ";
    price.append(emptySpan);
    price.append(span);

    content.append(price);
    a.className = "btn addToCart";
    a.textContent = "add to cart";
    content.append(a);

    box.append(imageContainer);
    box.append(content);

    DrinkContainer.append(box);
    a.addEventListener("click", () => {
      let cartItems = JSON.parse(localStorage.getItem("CartItems")) || [];
      const existingItem = cartItems.find((item) => item.dish._id === drink._id);
      if (!existingItem) {
        // Add new item
        cartItems.push({ dish: drink, quantity: 1 }); // Update quantity as needed
      } else {
        // Update existing item
        existingItem.quantity++;
      }
      localStorage.setItem("CartItems", JSON.stringify(cartItems));
      // console.log(cartItems)
    });
  });// const getUserToken =   JSON.parse(localStorage.getItem("jwtToken")) || [];
//  const payload = jwt.verify(getUserToken, 'BF8665E4BC84D73EB95B579C82816')
//  console.log(payload)


// headers: {
//   "Content-Type": "application/json"
// },
// body: JSON.stringify({
//   task: newTodos}),
