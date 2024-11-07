"use strict";

const pathname = document.location.pathname


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
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
  const increment = counter.querySelector('.increment');
  const decrement = counter.querySelector('.decrement');
  const value = counter.querySelector('.count-value');
  let count = parseInt(value.textContent);

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
    addInBusket();
    // characteristicsModal.classList.remove('show');
    // document.body.style.overflow = '';
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
const addInBusketUrl = 'https://24autoposter.ru/vkusnaya_argentina/shop/showcase/main';

async function handleClickCatalogItem(e) {
  
  await localStorage.setItem('catalogItemId', e.id);
  document.location.pathname = 'product-details.html';
  
}

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
                <video width="400px" height="300" controls>
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
  
  if (pathname === '/index.html' || pathname === '/') {
    
    try {
      const response = await fetch(showcaseUrl);
      if (!response.ok) throw new Error(`Ошибка при загрузке: ${response.statusText}`);
      const data = await response.json();
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
    } catch (error) {
      console.error('Ошибка получения списка товаров:', error);
    }
  };
}());


async function addInBusket() {
console.log('sss');

  try {
    const itemId = localStorage.getItem('catalogItemId');
    const response = await fetch(itemDetailsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: +itemId
      })
    });
  
    if (!response.ok) throw new Error(`Ошибка при загрузке: ${response.statusText}`);
    
    const data = await response.json();
    return data;
  } catch (error) {}
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