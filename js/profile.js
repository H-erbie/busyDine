const userInfo = JSON.parse(localStorage.getItem("user")) || undefined;

const profileAvatar = document.querySelector(".profile-avatar");
const userContainer = document.querySelector(".userInfo");
const username = document.querySelector(".username");
const logout = document.querySelector(".logout-btn");
const del = document.querySelector(".del-btn");
const useremail = document.querySelector(".useremail");
const usercontact = document.querySelector(".usercontact");
const userAvatar = userInfo.name.split("");
profileAvatar.textContent = userAvatar[0];
username.textContent = "Name: " + userInfo.name;
useremail.textContent = "Email: " + userInfo.email;
usercontact.textContent = "Contact: " + userInfo.phone;

// if(profileAvatar.textContent === ''){
//     profileAvatar.classList.add('no-display')
//     userContainer.classList.add('no-display')
// }
// else{
//     profileAvatar.classList.remove('no-display')
//     userContainer.classList.remove('no-display')
// }

logout.addEventListener("click", () => {
  localStorage.setItem("jwtToken", JSON.stringify());
  localStorage.setItem("user", JSON.stringify());
  window.location.replace("index.html");
});
del.addEventListener("click", async () => {
  // del.disabled = true
  try {
    const data = await fetch("https://busydine.onrender.com/api/v1/auth/del-account", {
      method: "DELETE",
      body: JSON.stringify({
        _id: userInfo.userId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await data.json();
    console.log(res);
    // del.disabled = false
    localStorage.setItem("jwtToken", JSON.stringify());
    localStorage.setItem("user", JSON.stringify());
    window.location.replace("index.html");
  } catch (error) {
    
  }
});
