const cartButton = document.querySelector("#cart-button");
const modalCart = document.querySelector(".modal-cart");
const closeCart = document.querySelector(".close-cart");
const username = document.querySelector(".username");
const btnLogin = document.querySelector(".buttons__login");
const btnLogout = document.querySelector(".buttons__logout");
const modalLogin = document.querySelector(".modal-auth");
const closeLogin = document.querySelector(".close-login");
const loginForm = document.querySelector("#loginForm");
const loginInput = document.querySelector("#login");
const restaurantsCards = document.querySelector(".restaurants-cards");
const menuCards = document.querySelector(".menu-cards");
const restaurants = document.querySelector(".restaurants");
const menu = document.querySelector(".menu");
const promo = document.querySelector(".promo");

let login = localStorage.getItem("deliveryFood");

function toggleModalLogin() {
  loginInput.style.borderColor = "";
  modalLogin.classList.toggle("active");
};

function toggleModalCart() {
  modalCart.classList.toggle("active");
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

    if (loginInput.value.trim()) {
      login = loginInput.value;
      localStorage.setItem('deliveryFood', login);
      toggleModalLogin();
      btnLogin.removeEventListener("click", toggleModalLogin);
      closeLogin.removeEventListener("click", toggleModalLogin);
      loginForm.removeEventListener("submit", logIn);
      loginForm.reset();
      checkAuth();
    } else {
      loginInput.style.borderColor = "red";
    };
  };

  btnLogin.addEventListener("click", toggleModalLogin);
  closeLogin.addEventListener("click", toggleModalLogin);
  loginForm.addEventListener("submit", logIn);
};

function checkAuth() {
  if (login) {
    autorized();
  } else {
    notAutorized();
  };
};

checkAuth();

function createCardRestaurant() {
  const card = `
  <a class="card wow animate__animated animate__fadeInUp">
    <img src="img/pizza-plus/preview.jpg" alt="restaurant" class="card__img">
    <div class="card-text">
      <div class="card-heading">
        <h3 class="card__title">Пицца плюс</h3>
        <div class="card__tag">50 мин</div>
      </div>
      <div class="card-info">
        <div class="card__rating">4.5</div>
        <div class="card__price">От 900 ₽</div>
        <div class="card__category">Пицца</div>
      </div>
    </div>
  </a>
  `;

  restaurantsCards.insertAdjacentHTML("beforeend", card);
};

createCardRestaurant();
createCardRestaurant();
createCardRestaurant();
createCardRestaurant();

function createCardGood() {
  const card = document.createElement("div");
  card.className = "card wow animate__animated animate__fadeInUp";

  card.insertAdjacentHTML("beforeend", `
    <img src="img/pizza-plus/pizza-vesuvius.jpg" alt="restaurant" class="card__img">
    <div class="card-text">
      <div class="card-heading">
        <h3 class="card__title card__title_reg">Пицца Везувий</h3>
      </div>
      <div class="card-info">
        <div class="card__ingridients">Соус томатный, сыр «Моцарелла», ветчина, пепперони, перец
          «Халапенье», соус «Тобаско», томаты.</div>
      </div>
      <div class="card-buttons">
        <button class="button buttons__primary">
          <span class="card-buttons__text">В корзину</span>
          <img src="img/icons/shopping-card-white.svg" alt="" class="card-buttons__icon">
        </button>
        <strong class="card__price_bold">545 ₽</strong>
      </div>
    </div>
  `);

  menuCards.insertAdjacentElement("beforeend", card);
};

function openGoods(event) {
  const target = event.target;
  const restaurant = target.closest(".restaurants-cards");

  if (restaurant) {
    if (login) {
      restaurants.classList.add("hide");
      promo.classList.add("hide");
      menu.classList.remove("hide");

      createCardGood();
      createCardGood();
      createCardGood();
      createCardGood();
    } else {
      modalLogin.classList.toggle("active");
    };
  };
};

cartButton.addEventListener("click", toggleModalCart);
closeCart.addEventListener("click", toggleModalCart);
restaurantsCards.addEventListener("click", openGoods);

new WOW().init();