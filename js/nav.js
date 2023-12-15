let navbar = document.querySelector(".header .navbar");

document.querySelector("#menu-btn").onclick = () => {
  navbar.classList.toggle("active");
  // loginForm.classList.remove("active");
};

window.onscroll = () => {
  navbar.classList.remove("active");
};
const loginBtn = document.querySelector("#login-btn");

const user = JSON.parse(localStorage.getItem('user')) || []
console.log(user)
const avatar = user.name.split('')
if(user){
  loginBtn.className = 'user'
  loginBtn.href='profile.html'
  loginBtn.textContent = avatar[0]
}