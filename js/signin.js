const signIn = document.querySelector("#signIn");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const err = document.querySelector(".err");

// sign up

signIn.addEventListener("click", async () => {
  // console.log(dishImg.files[0])
  err.textContent = ''
  try {
    const data = await fetch("https://busydine.onrender.com/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const dd = await data.json();

    // console.log(dd);
    if (dd.msg) {
      err.textContent = dd.msg;
      email.value = "";
      password.value = "";
    } else {
      localStorage.setItem("jwtToken", JSON.stringify(dd.token));
      localStorage.setItem("user", JSON.stringify(dd.payload));
      email.value = "";
      password.value = "";
      window.location.replace("index.html");
    }
  } catch (error) {
    console.log(error);
    email.value = "";
    password.value = "";
  }
});
//   const tokenData = JSON.parse(localStorage.getItem('jwtToken'));
