// Окно корзины

const cartButton = document.querySelector("#cart-button");
const modalCart = document.querySelector(".modal-cart");
const closeCart = document.querySelector(".close-cart");

cartButton.addEventListener("click", toggleModalCart);
closeCart.addEventListener("click", toggleModalCart);

function toggleModalCart() {
  modalCart.classList.toggle("active");
};

new WOW().init();

// Окно авторизации

const username = document.querySelector(".username");
const btnLogin = document.querySelector(".buttons__login");
const btnLogout = document.querySelector(".buttons__logout");
const modalLogin = document.querySelector(".modal-auth");
const closeLogin = document.querySelector(".close-login");
const loginForm = document.querySelector("#loginForm");
const loginInput = document.querySelector("#login");

let login = localStorage.getItem("deliveryFood");

function toggleModalLogin() {
  modalLogin.classList.toggle("active");
};

function autorized() {
  console.log("Авторизован");

  function logOut() {
    login = "";

    localStorage.removeItem('deliveryFood');

    btnLogin.style.display = "";
    username.style.display = "";
    btnLogout.style.display = "";
    btnLogout.removeEventListener("click", logOut);
    checkAuth();
  };

  username.textContent = login;
  btnLogin.style.display = "none";
  username.style.display = "inline";
  btnLogout.style.display = "flex";

  btnLogout.addEventListener("click", logOut);
};

function notAutorized() {
  console.log("Не авторизован");

  function logIn(event) {
    event.preventDefault();
    login = loginInput.value;

    localStorage.setItem('deliveryFood', login);

    toggleModalLogin();
    btnLogin.removeEventListener("click", toggleModalLogin);
    closeLogin.removeEventListener("click", toggleModalLogin);
    loginForm.removeEventListener("submit", logIn);
    loginForm.reset();
    checkAuth();
  };

  btnLogin.addEventListener("click", toggleModalLogin);
  closeLogin.addEventListener("click", toggleModalLogin);
  loginForm.addEventListener("submit", logIn);
};

console.log(loginInput.value);

function checkAuth() {
  if (login) {
    autorized();
  } else {
    notAutorized();
  };
};

checkAuth();
console.log(loginInput);