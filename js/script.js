"use strict";

const pathname = document.location.pathname;
let userInfo = {};
let cartItems = {};

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

// try {
// const caruselNew = document.getElementById('swiper-new');


// for (let index = 0; index < 8; index++) {
//   const img = '<img src="../images/order-img-1.png" width="60" height="60" />';
//   const newDiv = document.createElement('div');
//   newDiv.setAttribute('class', 'swiper-slide swiper-slide-new');
//   // const newImg = document.createElement('img');
//   // caruselNew.appendChild(newDiv)
//   newDiv.innerHTML = img;
//   caruselNew.appendChild(newDiv);
  
// }
// } catch(error) {

// }

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



// order-modal
const orderModal = document.querySelector('.order-modal');
if (orderModal) {
  const openOrderModal = document.querySelector('.order-btn');
  const closeOrderModal = orderModal.querySelector('.close-modal');

  openOrderModal.addEventListener('click', placeAnOrder);

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
      addInBusket();
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
  console.error(error, '<<<');
}


// URL-ы API
const showcaseUrl = 'https://24autoposter.ru/sound_healing/shop/showcase';
const itemDetailsUrl = 'https://24autoposter.ru/sound_healing/shop/showcase/item';
const busketUrl = 'https://24autoposter.ru/sound_healing/shop/cart';
const getRedirectPayUrl = 'https://24autoposter.ru/sound_healing/shop/pay';
const placeOrderUrl = 'https://24autoposter.ru/sound_healing/shop/order/create';
const userInfoUrl = 'https://24autoposter.ru/sound_healing/shop/register';
const myOrdersUrl = 'https://24autoposter.ru/sound_healing/shop/order/list';


const chat_id = 795363892;


(async function fetchShowcaseItems() {
  try {
    const response = await fetch(myOrdersUrl, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id
        })
      });
      
      if (!response.ok) throw new Error(`Ошибка при загрузке: ${response.statusText}`);
      
      const data = await response.json();

      const ordersContainer = document.getElementById('orders-container');

      const myOrdersCards = document.createElement('div');
      myOrdersCards.className = 'my-orders__cards';

      // Создаем элемент для даты
      const dateLabel = document.createElement('span');
      dateLabel.className = 'my-orders__cards-label';
      dateLabel.textContent = '16 Февраля';
      myOrdersCards.appendChild(dateLabel);

      function createOrderCard(imgSrc, name, price, statusText, statusClass) {
        const orderCard = document.createElement('div');
        orderCard.className = 'my-orders__card';

        // Создаем левый блок с изображением и названием
        const leftBox = document.createElement('div');
        leftBox.className = 'left-box';

        const cardImg = document.createElement('img');
        cardImg.className = 'my-orders__card-img';
        cardImg.src = imgSrc;
        cardImg.alt = '';

        const cardName = document.createElement('h4');
        cardName.className = 'my-orders__card-name';
        cardName.textContent = name;

        leftBox.appendChild(cardImg);
        leftBox.appendChild(cardName);

        // Создаем элемент цены
        const cardPrice = document.createElement('h3');
        cardPrice.className = 'my-orders__card-price';
        cardPrice.textContent = `${price} Р`;

        // Создаем кнопку со статусом
        const cardButton = document.createElement('a');
        cardButton.className = `card-btn ${statusClass}`;
        cardButton.href = '#!';
        cardButton.textContent = statusText;

        // Добавляем элементы в карточку заказа
        orderCard.appendChild(leftBox);
        orderCard.appendChild(cardPrice);
        orderCard.appendChild(cardButton);

        // Добавляем карточку заказа в контейнер my-orders__cards
        myOrdersCards.appendChild(orderCard);
    }



      return data;
  } catch (error) {}
}())

async function editUserInfo() {
  let email = document.getElementById('user-email').value;
  let phone = document.getElementById('user-tel').value;
  let name = document.getElementById('user-name').value;
  let address = document.getElementById('user-address').value;
  let comment = document.getElementById('user-comment').value;

  try {
    const response = await fetch(userInfoUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id,
        email,
        phone,
        full_name: name,
        delivery_address: address,
        comment
      })
    });

    if (!response.ok) throw new Error(`Ошибка при загрузке: ${response.statusText}`);

    const data = await response.json();
    document.getElementById('user-name').innerText = data.name;
    document.getElementById('user-email').innerText = data.email;
    document.getElementById('user-phone').innerText = data.phone;
  } catch (error) {
    console.error(error, '<<<');
  }
}
(async function getUserInfo() {
  try {
    const response = await fetch(userInfoUrl, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id
        })
      });
      
      if (!response.ok) throw new Error(`Ошибка при загрузке: ${response.statusText}`);
      
      const data = await response.json();

      userInfo = data;
      if(pathname === '/profile.html') {
        let first_name = data.full_name.split(' ')[0];
        let last_name = data.full_name.split(' ')[1];

        document.getElementById('user-first_name').setAttribute('value', first_name);
        document.getElementById('user-last_name').setAttribute('value', last_name);
        document.getElementById('user-phone').setAttribute('value', data.phone);
        document.getElementById('user-email').setAttribute('value', data.email);
        document.getElementById('user-address').setAttribute('value', data.delivery_address);
      }
      if(pathname === '/index.html' || pathname === '/') {
        document.getElementById('user-name-title').innerText = data.full_name;

      } else if(pathname === '/profile-page.html') {
        document.getElementById('user-name-title').innerText = data.full_name;
        document.getElementById('user-telephone').innerText = data.phone;
        document.getElementById('user-email').innerText = data.email;

      } else if(pathname === '/basket.html') {

        document.getElementById('user-email').setAttribute('value', data.email);
        document.getElementById('user-tel').setAttribute('value', data.phone);;
        document.getElementById('user-name').setAttribute('value',data.full_name);
        document.getElementById('user-address').setAttribute('value', data.delivery_address);
        document.getElementById('user-comment').innerText= data.comment;
      }
  
    } catch (error) {
      console.error(error, '<<<');
    }
}())
async function handleClickCatalogItem(e) {
  
  await localStorage.setItem('catalogItemId', e.id);
  document.location.pathname = 'product-details.html';
  
};

(async function fetchItemDetails() {
  try {
  let catalogItemId = localStorage.getItem('catalogItemId');
    if(pathname === '/product-details.html') {
      const response = await fetch(itemDetailsUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: +catalogItemId
        })
      });

      if (!response.ok) throw new Error(`Ошибка при загрузке: ${response.statusText}`);
      
      const data = await response.json();

      document.getElementById('product-header').innerHTML = `
      <h2 class="product-info__title">${data.name}</h2>
      <div class="price-box">
        <span class="price">${data.price} Р</span>
      </div>`;

      document.getElementById('product-description').innerText = data?.description;

      
      
      document.getElementById('more-info').innerHTML = `
        <div class="box">
          <p>${data?.technicalSpecifications}</p>
        </div>`
        
        const swiperWrapperImages = document.getElementById('swiper-wrapper-images');

        if(data?.video?.length > 0) {
          const newElement = document.createElement('div');
          newElement.className = 'swiper-slide'
          swiperWrapperImages.appendChild(newElement);

          newElement.innerHTML = `
            <div class='product-details__img' style="display: flex; justify-content: center; margin-top: 20px">
                <video width="350" height="300" controls>
                  <source src="${data.video[0]}" type="video/mp4" />
                  <source src="${data.video[0]}" type="video/webm" />
                  Your browser does not support the video tag.
                </video>
            </div>`;
        }
        
        
        
      data?.img?.forEach((href) => {
                
        const swiperContainer = document.createElement('div');
        const productDetailsContainer = document.createElement('div');
        const productImg = document.createElement('img');
        const savedIcon = document.createElement('img');
        swiperContainer.className ='swiper-slide';
        productDetailsContainer.className = 'product-details__img';
        productImg.className = 'product-img';
        productImg.src = `${href}`;

        savedIcon.className ='saved-icon';
        savedIcon.src = 'images/icons/saved-2.svg'
        
        swiperWrapperImages.appendChild(swiperContainer);
        swiperContainer.appendChild(productDetailsContainer);
        productDetailsContainer.appendChild(productImg);
        productDetailsContainer.appendChild(savedIcon);
        
      })

      
      const caruselNew = document.getElementById('swiper-new');

      for (let i = 0; i < data?.subcategory.length; i++) {
        const img = `<img src="${data?.subcategory[i]?.img}" width="60" height="60" />`;
        const newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'swiper-slide swiper-slide-new');

        newDiv.innerHTML = img;
        caruselNew.appendChild(newDiv);        
      }


      new Swiper('.swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
      
        // If we need pagination
        pagination: {
          el: '.swiper-pagination',
        },
      
        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      
        // And if we need scrollbar
        scrollbar: {
          el: '.swiper-scrollbar',
        },
      });



      return data; // возвращает JSON с объектами магазина
    }
  } catch(error) {};

}());

(async function fetchShowcaseItems() {
  
  if(pathname === '/index.html' || pathname === '/' || pathname === '/categories.html') {

    try {
      const response = await fetch(showcaseUrl);
      if (!response.ok) throw new Error(`Ошибка при загрузке: ${response.statusText}`);
      const data = await response.json();
      if(pathname === '/categories.html') {
        const categoriesCardContainer = document.getElementById('categories-card_container');

        data?.categories?.forEach(e => {
          const categoryLink = document.createElement('a');
          categoryLink.className = 'categories-card';
          categoryLink.href = 'profile-page.html';
          categoryLink.id = e?.category_id;

          // Создаем элемент изображения <img>
          const categoryImg = document.createElement('img');
          categoryImg.src = e?.category_img;
          categoryImg.alt = '';

          // Создаем элемент заголовка <span>
          const categoryTitle = document.createElement('span');
          categoryTitle.className = 'categories-card__title';
          categoryTitle.textContent = e?.category_name;

          // Добавляем изображение и заголовок в ссылку
          categoryLink.appendChild(categoryImg);
          categoryLink.appendChild(categoryTitle);

          // Добавляем ссылку в контейнер на странице
          categoriesCardContainer.appendChild(categoryLink); // Или другой контейнер вместо body
        })

      } else if (pathname === '/index.html' || pathname === '/') {
        const categories = data.categories;
        const catalog = data.main_page_items;
        const categoriesContainer = document.getElementById('swiper-wrapper-categories');
        
        categories.forEach(e => {        
          let newDiv = document.createElement('div');
          let newA = document.createElement('a');
          let newImg = document.createElement('img');
          let newSpan = document.createElement('span');

          newDiv.className = 'swiper-slide';
          newDiv.style.marginRight = '12px';
          
          newA.className = 'categories-card swiper-slide-next';
          newA.href = '#';

          newImg.src = e.category_img;
          newImg.style.width = '100%';

          newSpan.className = 'categories-card__title';
          newSpan.innerText = e.category_name;

          newA.appendChild(newImg);
          newA.appendChild(newSpan);
          newDiv.appendChild(newA);

          categoriesContainer.appendChild(newDiv);
        });
      

        const catalogContainer = document.getElementById("catalog-cards");

        catalog.forEach(e => {

            let newA = document.createElement('a');
            let newImg = document.createElement('img');
            let newH3 = document.createElement('h3');
            let newButton = document.createElement('button');

            newA.id = e.id;
            newA.className = 'catalog-card';
            newA.dataset.id = e.id;
            newA.onclick = () => handleClickCatalogItem(e);
            
            newImg.className = "catalog-card__img";
            newImg.src = e.img;
            
            newH3.className = "catalog-card__title";
            newH3.innerText = e.name;

            newButton.className = "buy-btn";
            newButton.innerText = "Купить";
            
            newA.appendChild(newImg);
            newA.appendChild(newH3);
            newA.appendChild(newButton);

            catalogContainer.appendChild(newA);

        });

        // Обработка категорий и каталога
        return data; // возвращает JSON с объектами магазина
      };
    } catch (error) {
      console.error('Ошибка получения списка товаров:', error);
    }
  }
}());

const decrementBusketQuantity = async (itemId) => {
  try {
    const busketIncrementUrl = `https://24autoposter.ru/sound_healing/shop/cart/${chat_id}/items/${itemId}`;

    // const itemId = localStorage.getItem('catalogItemId');
    const response = await fetch(busketIncrementUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chat_id,
        item_id: +itemId
      })
    });
  
    if (!response.ok) throw new Error(`Ошибка при загрузке: ${response.statusText}`);
    
    const data = await response.json();

    cartItems = data.cartItems;
    localStorage.setItem('busketItems', data.cartItems);
    return data; // возвращает JSON с объектами магазина

  } catch(error) {};
}

(async function getBusketData() {
  
  if(pathname === '/basket.html') {
    try {
      // const itemId = localStorage.getItem('catalogItemId');
      const response = await fetch(busketUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chat_id,
          // item_id: +itemId
        })
      });
    
      if (!response.ok) throw new Error(`Ошибка при загрузке: ${response.statusText}`);
      
      const data = await response.json();
      const busketItems = data.cartItems;
      cartItems = busketItems;
      localStorage.setItem('busketItems', busketItems);      

      const busketItemsContainer = document.getElementById('basket-cards');
      
      for (let key in busketItems) {
        if (busketItems.hasOwnProperty(key)) {
          const item = busketItems[key];
          let quantity = item?.quantity;
          let price = item?.price;
          let itemPrice = price / quantity;

          // Создаем элемент для каждого объекта
          const productDiv = document.createElement('div');
          productDiv.className = 'product';
          productDiv.id = item?.id;

          // Создаем левый контейнер
          const productLeftBox = document.createElement('div');
          productLeftBox.className = 'product-left__box';

          // Создаем элемент изображения
          const productImg = document.createElement('img');
          productImg.className = 'product-img';
          productImg.src = item?.img;
          productImg.alt = '';
          productImg.width = 62;
          productImg.height = 62;

          // Создаем контейнер для имени и счетчика
          const productInfo = document.createElement('div');

          // Создаем элемент заголовка для имени продукта
          const productName = document.createElement('h4');
          productName.className = 'product-name';
          productName.textContent = item?.name;

          // Создаем контейнер для счетчика
          const counterDiv = document.createElement('div');
          counterDiv.className = 'counter';

          // Создаем кнопку уменьшения количества
          const decrementButton = document.createElement('button');
          decrementButton.className = 'decrement';
          decrementButton.addEventListener('click', () => {
            quantity--;
            quantitySpan.innerText = quantity;
            price = price - itemPrice;
            productPrice.textContent = `${price} Р`;
            decrementBusketQuantity(item?.id);
            if(quantity <= 0) {
              productDiv.style.display = 'none';
            }
          });

          // Создаем элемент для отображения количества
          const quantitySpan = document.createElement('span');
          quantitySpan.id = 'quantity';
          quantitySpan.className = 'count-value';
          quantitySpan.innerText = quantity;

          // Создаем кнопку увеличения количества
          const incrementButton = document.createElement('button');
          incrementButton.className = 'increment';
          incrementButton.addEventListener('click', () => {
            quantity++;
            quantitySpan.innerText = quantity;
            price = price + itemPrice;
            productPrice.textContent = `${price} Р`;
            addInBusket(item?.id);
          })

          // Создаем элемент для отображения цены
          const productPrice = document.createElement('h4');
          productPrice.className = 'product-price';
          productPrice.textContent = `${price} Р`;

          // Собираем элементы вместе
          counterDiv.appendChild(decrementButton);
          counterDiv.appendChild(quantitySpan);
          counterDiv.appendChild(incrementButton);

          productInfo.appendChild(productName);
          productInfo.appendChild(counterDiv);

          productLeftBox.appendChild(productImg);
          productLeftBox.appendChild(productInfo);

          productDiv.appendChild(productLeftBox);
          productDiv.appendChild(productPrice);


          console.log(busketItemsContainer);
          busketItemsContainer.appendChild(productDiv);
          // Добавляем в контейнер
        }
    }

      return data;
    } catch (error) {}
  }
}());

async function addInBusket(id) {

  try {
    const itemId = localStorage.getItem('catalogItemId');
    const response = await fetch(busketUrl, {
      method: 'PUT',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chat_id,
        item_id: +id || +itemId
      })
    });
    
    if (!response.ok) throw new Error(`Ошибка при загрузке: ${response.statusText}`);
    
    const data = await response.json();
    cartItems = data.cartItems;
    localStorage.setItem('busketItems', data.cartItems);
    return data;
  } catch (error) {}
  
};

async function placeAnOrder() {

  // const baskets = localStorage.getItem('busketItems');
  
  if(Object.keys(cartItems).length) {
    
    try {
      const response = await fetch(placeOrderUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chat_id,
          // cartItems 
          // item_id: +id || +itemId
        })
      });
      
      if (!response.ok) throw new Error(`Ошибка при загрузке: ${response.statusText}`);
      
      const data = await response.json();

      editUserInfo();

      orderModal.style.display = 'flex';

      document.querySelector('.close-modal').addEventListener('click', () => {
        orderModal.style.display = 'none';
      })
      
      return data;
    } catch (error) {
      orderModal.style.display = 'block';
      document.getElementById('title-order').innerText = 'Ошибка при оформлении заказа';
      document.getElementById('is-success').style.display = 'none';
      document.querySelector('.close-modal').addEventListener('click', () => {
        orderModal.style.display = 'none';
      })
    } 
  }
}



// try {
  //   const swiper = new Swiper('.swiper', {
    //     // Optional parameters
//     direction: 'horizontal',
//     loop: true,
  
//     // If we need pagination
//     pagination: {
//       el: '.swiper-pagination',
//     },
  
//     // Navigation arrows
//     navigation: {
//       nextEl: '.swiper-button-next',
//       prevEl: '.swiper-button-prev',
//     },
  
//     // And if we need scrollbar
//     scrollbar: {
//       el: '.swiper-scrollbar',
//     },
//   });
// } catch (e) {
  
// }