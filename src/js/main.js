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
const menuTitle = document.querySelector(".menu__title");
const cardRating = document.querySelector(".card__rating");
const cardPrice = document.querySelector(".card__price");
const cardCategory = document.querySelector(".card__category");

let login = localStorage.getItem("deliveryFood");

const getData = async function(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}!`);
  }

  return await response.json();
};

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

function createMenuHeading({ name, kitchen, price, stars }) {
  const menuHeading = `
  <div class="menu-heading">
    <h2 class="menu__title">${name}</h2>
    <div class="card-info">
      <div class="card__rating">${stars}</div>
      <div class="card__price">От ${price} ₽</div>
      <div class="card__category">${kitchen}</div>
    </div>
  </div>
  `;
  restaurantsCards.insertAdjacentHTML("beforebegin", menuHeading);
};

function createCardRestaurant({ image, kitchen, name, price, products, stars, delay, time_of_delivery: timeOfDelivery }) {
  const card = `
  <a class="card wow animate__animated animate__fadeInUp" data-products="${products}" data-wow-delay=${delay} data-info="${[name, price, stars, kitchen]}">
    <img src=${image} alt="restaurant" class="card__img">
    <div class="card-text">
      <div class="card-heading">
        <h3 class="card__title">${name}</h3>
        <div class="card__tag">${timeOfDelivery} мин</div>
      </div>
      <div class="card-info">
        <div class="card__rating">${stars}</div>
        <div class="card__price">От ${price} ₽</div>
        <div class="card__category">${kitchen}</div>
      </div>
    </div>
  </a>
  `;
  restaurantsCards.insertAdjacentHTML("beforeend", card);
};

function createCardGood({ description, image, name, price, delay }) {
  const card = `
  <div class="card wow animate__animated animate__fadeInUp" data-wow-delay=${delay}>
  <img src=${image} alt="restaurant" class="card__img">
    <div class="card-text">
      <div class="card-heading">
        <h3 class="card__title card__title_reg">${name}</h3>
      </div>
      <div class="card-info">
        <div class="card__ingridients">${description}</div>
      </div>
      <div class="card-buttons">
        <button class="button buttons__primary">
          <span class="card-buttons__text">В корзину</span>
          <img src="img/icons/shopping-card-white.svg" alt="" class="card-buttons__icon">
        </button>
        <strong class="card__price_bold">${price} ₽</strong>
      </div>
    </div>
  </div>
  `;
  menuCards.insertAdjacentHTML("beforeend", card);
};

function openGoods(event) {
  const target = event.target;

  if (login) {
    const restaurant = target.closest(".card");
    if (restaurant) {
      const info = restaurant.dataset.info.split(',');
      const [name, price, stars, kitchen] = info;

      restaurants.classList.add("hide");
      promo.classList.add("hide");
      menu.classList.remove("hide");

      menuTitle.textContent = name;
      cardRating.textContent = stars;
      cardPrice.textContent = `От ${price} ₽`;
      cardCategory.textContent = kitchen;

      getData(`./db/${restaurant.dataset.products}`).then(function(data) {
        data.forEach(createCardGood);
      });
    };
  } else {
    modalLogin.classList.toggle("active");
  };
};

function init() {
  getData("./db/partners.json").then(function(data) {
    data.forEach(createCardRestaurant);
  });
  
  cartButton.addEventListener("click", toggleModalCart);
  closeCart.addEventListener("click", toggleModalCart);
  restaurantsCards.addEventListener("click", openGoods);
}

init();
new WOW().init();