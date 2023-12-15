const signUp = document.querySelector("#signUp");
const fullname = document.querySelector("#fullname");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const phone = document.querySelector("#phone");
const err = document.querySelector(".err");

// sign up

// password.addEventListener('onchange', (e)=> password.value = e.target.value)
signUp.addEventListener("click", async () => {
  //   console.log(password.value, phone.value, email.value, fullname.value);
  try {
    const data = await fetch("http://localhost:5000/api/v1/auth/register", {
      method: "POST",
      body: JSON.stringify({
        fullname: fullname.value,
        email: email.value,
        phone: phone.value,
        password: password.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const dd = await data.json();
    if (dd.msg) {
      err.textContent = dd.msg;
      email.value = "";
      password.value = "";
      fullname.value = "";
      phone.value = "";
    } else {
      localStorage.setItem("jwtToken", JSON.stringify(dd.token));
      localStorage.setItem("user", JSON.stringify(dd.payload));
      console.log(dd);
      fullname.value = "";
      email.value = "";
      phone.value = "";
      password.value = "";
      window.location.replace("index.html");
    }
  } catch (error) {
    console.log(error);
    fullname.value = "";
    email.value = "";
    phone.value = "";
    password.value = "";
  }
});
