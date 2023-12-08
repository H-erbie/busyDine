
let cart = document.querySelector('.shopping-cart-container');

document.querySelector('#cart-btn').onclick = () =>{
    cart.classList.toggle('active');
}


function openInSameWindow(evt) {
    window.location=evt;
    }

let navbar = document.querySelector('.header .navbar');

document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
    loginForm.classList.remove('active');
}

window.onscroll = () => {
    navbar.classList.remove('active');
}

document.querySelector('.home').onmousemove = (e) => {

    let x = (window.innerWidth - e.pageX * 2) / 90;
    let y = (window.innerHeight - e.pageY * 2) / 90;

    document.querySelector('.home .home-img').style.transform = `translateX(${y}px)
    translateY(${x}px)`;

    //document.querySelector('.home .home-beaute-img').style.transform = `translateX(${y}px)
    //translateY(${x}px)`;
}

document.querySelector('.home').onmouseleave = (e) => {

    document.querySelector('.home .home-img').style.transform = `translateX(0px)
    translateY(0px)`;
}

document.querySelector('.home').onmouseleave = (e) => {

    document.querySelector('.home .home-beaute-img').style.transform = `translateX(0px)
    translateY(0px)`;
}

