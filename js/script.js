"use strict";

try {
  var swiper = new Swiper('.service-info__swiper', {
    slidesPerView: 3.3,
    spaceBetween: 20,
    speed: 700,
  });
} catch (error) {
}


try {
  var swiper = new Swiper('.carousel-new', {
    slidesPerView: 3.3,
    spaceBetween: 20,
    speed: 700,
  });
} catch (error) {
}

const caruselNew = document.getElementById('swiper-new');


for (let index = 0; index < 8; index++) {
  const img = '<img src="../images/order-img-1.png" width="60" height="60" />';
  const newDiv = document.createElement('div');
  newDiv.setAttribute('class', 'swiper-slide swiper-slide-new');
  // const newImg = document.createElement('img');
  // caruselNew.appendChild(newDiv)
  newDiv.innerHTML = img;
  caruselNew.appendChild(newDiv);
  
}

try {
  // categories-swiper
  var swiper = new Swiper('.categories-swiper', {
    slidesPerView: 2.4,
    spaceBetween: 12,
    speed: 700,
  });
} catch (error) {

}

// counter
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
  const increment = counter.querySelector('.increment');
  const decrement = counter.querySelector('.decrement');
  const value = counter.querySelector('.count-value');
  let count = parseInt(value.textContent);
  console.log(count);

  increment.addEventListener('click', () => {
    count++;
    value.textContent = count;
  });
  decrement.addEventListener('click', () => {
    if (count > 0) {
      count--;
      value.textContent = count;
    }
  })
})


// order-modal
const orderModal = document.querySelector('.order-modal');
if (orderModal) {
  const openOrderModal = document.querySelector('.order-btn');
  const closeOrderModal = orderModal.querySelector('.close-modal');


  openOrderModal.addEventListener('click', () => {
    orderModal.classList.add('show');
    document.body.style.overflow = 'hidden';
  });

  closeOrderModal.addEventListener('click', () => {
    orderModal.classList.remove('show');
    document.body.style.overflow = '';
  });
}


// accordions
const accordion = document.querySelectorAll('.accordion');
accordion.forEach(accordion => {
  const accordionHeader = accordion.querySelector('.accordion-header');
  const accordionContent = accordion.querySelector('.accordion-content');
  accordionHeader.addEventListener('click', () => {
    accordionContent.classList.toggle('show');
    accordionHeader.classList.toggle('acctive');
  });
})

// reviews-swiper
try {
  var swiper = new Swiper('.reviews-swiper', {
    slidesPerView: 2.4,
    spaceBetween: 12,
    speed: 700,
    pagination: {
      el: '.reviews-pagination',
      clickable: true,
    },
  });
} catch (error) {
}

// add-basket-btn
const addBasketBtn = document.querySelector('.add-basket-btn');
if (addBasketBtn) {
  let isAddedToBasket = false;

  addBasketBtn.addEventListener('click', (e) => {
    if (!isAddedToBasket) {
      e.preventDefault();
      addBasketBtn.textContent = 'Перейти в корзину';
      addBasketBtn.classList.add('basket-btn');
      addBasketBtn.setAttribute('href', 'basket.html');
      isAddedToBasket = true;
    }
  });
}

try {
  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);
} catch (error) {

}


const characteristicsModal = document.querySelector('.characteristics-modal');
if (characteristicsModal) {
  const openCharacteristicsModal = document.querySelector('.characteristics-btn');
  const closeCharacteristicsModal = characteristicsModal.querySelector('.characteristics-modal__close');

  openCharacteristicsModal.addEventListener('click', () => {
    characteristicsModal.classList.add('show');
    document.body.style.overflow = 'hidden';
  });

  closeCharacteristicsModal.addEventListener('click', () => {
    characteristicsModal.classList.remove('show');
    document.body.style.overflow = '';
  });
}


// Sahifaga kirgan foydalanuvchini sessionStorage'ga yozamiz
try {
  window.onload = function () {
    sessionStorage.setItem('lastPage', window.location.href);
  };

  // "Orqaga" tugmasini bosganda ishlaydigan funksiya
  document.getElementById('prevButton').addEventListener('click', function () {
    var lastPage = sessionStorage.getItem('lastPage');

    // Agar sahifa boshqa manbadan kirilgan bo'lsa, tarixni tekshiramiz
    if (document.referrer && window.history.length > 1 && lastPage !== 'index.html') {
      window.history.back(); // Avvalgi sahifaga qaytadi
    } else {
      // Agar hech qanday avvalgi sahifa bo'lmasa yoki foydalanuvchi URL'ni qo'lda kirgan bo'lsa, asosiy sahifaga o'tadi
      window.location.href = 'index.html';
    }
  });
} catch (error) {

}


try {
  const intro = document.querySelector('.intro');

  // LocalStorage'dan 'introSeen' qiymatini tekshiramiz
  if (!localStorage.getItem('introSeen')) {
    // Agar 'introSeen' hali mavjud bo'lmasa, intro ko'rsatiladi
    setTimeout(() => {
      intro.style.opacity = '0';
      setTimeout(() => {
        intro.style.display = 'none';
        // Intro bir marta ko'rsatilgandan so'ng, localStorage'ga belgi qo'yamiz
        localStorage.setItem('introSeen', 'true');
      }, 500);
    }, 3000);
  } else {
    // Agar intro allaqachon ko'rsatilgan bo'lsa, uni yashiramiz
    intro.style.display = 'none';
  }
} catch (error) {

}