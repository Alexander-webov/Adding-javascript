'use strick'
window.addEventListener('DOMContentLoaded', ()=>{
 
//tabs
const tabs = document.querySelectorAll('.tabheader__item');
const tabContent = document.querySelectorAll('.tabcontent');
const tabspanel = document.querySelector('.tabheader__items');

//tabheader__item_active

const hideTabcontent = () => {
  tabContent.forEach(item => {
    item.classList.add('hide');
    item.classList.remove('show', 'fade');
  });
  tabs.forEach(item => {
    item.classList.remove('tabheader__item_active');
  });

};

const showTabContent = (i = 0) =>{
   tabContent[i].classList.add('show', 'fade');
   tabContent[i].classList.remove('hide');
   tabs[i].classList.add('tabheader__item_active');
};
hideTabcontent();
showTabContent();

tabspanel.addEventListener('click', (e)=>{
  const target = e.target;
  if(target && target.classList.contains('tabheader__item')){
    tabs.forEach((item, i) =>{
      if(target == item){
        hideTabcontent();
        showTabContent(i);
      }

    });
  }

});
// ==============
//timer
// ==============


const deadline = '2020-10-31';

const getTimeRemaining = (endtime) => {
  const t = Date.parse(endtime) - Date.parse(new Date()),
    days = Math.floor(t / (1000 * 60 *60 *24)),
    hours = Math.floor((t / (1000 *60 *60) % 24)),
    minutes = Math.floor((t / 1000 / 60) % 60),
    seconds = Math.floor((t / 1000) % 60);
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds,
  };
 
};
 const getZero = (num) => {
    if(num >= 0 && num < 10){
      return `0${num}`;
    }else{
      return num;
    }
  };

const setClock = (select, endtime) =>{
  const timer = document.querySelector(select),
        days = timer.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval(updateClock, 1000);

        updateClock();
        
        function updateClock() {
          const t = getTimeRemaining(endtime);

          days.innerHTML = getZero(t.days);
          hours.innerHTML = getZero(t.hours);
          minutes.innerHTML = getZero(t.minutes);
          seconds.innerHTML = getZero(t.seconds);

          if(t.total <= 0){
            clearInterval(timeInterval);
          }
        }
};


setClock('.timer', deadline);

// ==============
//modal
// ==============



const modalTrigger = document.querySelectorAll('[data-modal]'),
  modal = document.querySelector('.modal');
  


const closemodal = () =>{

  modal.classList.remove('show');
  modal.classList.add('hide');
  document.body.style.overflow = '';
}

modalTrigger.forEach((btn) => {
  btn.addEventListener('click', openModal);
});

function openModal() {
   modal.classList.remove('hide');
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
  clearInterval(modalTimerId);

};



modal.addEventListener('click', (event) =>{
  if (event.target == modal || event.target.getAttribute('data-close') == '') {
    
    closemodal();
  }
});

document.addEventListener('keydown', (event) => {
  if(event.code === "Escape" && modal.classList.contains('show')) closemodal();
});

  const modalTimerId = setTimeout(openModal, 1500000);
  
function showModalByScroll(params) {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
    openModal();
    window.removeEventListener('scroll', showModalByScroll);
  }
}
window.addEventListener('scroll', showModalByScroll);



class MenuCart {
  
  constructor(img, alt, title, text,  numPrice, parentSelector, ...classes){
    this.img = img;
    this.alt = alt;
    this.title = title;
    this.text = text;
    this.numPrice = numPrice;
    this.classes = classes;
    this.parentSelector = document.querySelector(parentSelector);
    this.transfert = 27;
    this.changeToUAH();
  }
  changeToUAH(){
    this.numPrice = this.numPrice * this.transfert;
  }

  render(){
    const element = document.createElement('div');

    if(this.classes.length === 0){
      this.element =  'menu__item';
      element.classList.add(this.element);
    }else{
      this.classes.forEach(classname => element.classList.add(classname))
   
    }

     element.innerHTML = `
          <img src="${this.img}" alt="${this.alt}">
          <h3 class="menu__item-subtitle">${this.title}</h3>
          <div class="menu__item-descr">${this.text}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${this.numPrice}</div>
          </div>
    `;

   this.parentSelector.append(element);
  }
}

 
new MenuCart(
  'img/tabs/post.jpg',
  'post',
  'Меню "Постное"',
  'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
  4,
  '.menu .container',

).render();

new MenuCart(
  'img/tabs/post.jpg',
  'post',
  'Меню "Постное"',
  'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
  4,
  '.menu .container',
).render();

new MenuCart(
  'img/tabs/post.jpg',
  'post',
  'Меню "Постное"',
  'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
  4,
  '.menu .container',
  'menu__item'
).render();


//forms

const forms = document.querySelectorAll('form');

const message = {
  loading: 'img/spinner.svg',
  seccusse: 'Спасибо! Скоро мы с вами свяжемся',
  failuer: 'Что-то пошло не так'
};

forms.forEach((item) =>{
  bindPostData(item);
});
  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data
    });
    return await res.json();
  };


function bindPostData (form){
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const statusMessage = document.createElement('img');
    statusMessage.src = message.loading;
    statusMessage.style.cssText = `
      display: block;
      margin: 0 auto;
    `;
    form.append(statusMessage);

 
   const formData = new FormData(form);
const object = {};
    formData.forEach(function (value, key){
      object[key] = value;

    });
 

    
    postData('http://localhost:3000/requests', JSON.stringify(object))
      .then(data => {
      console.log(data);
      showThanksModal(message.seccusse);
      statusMessage.remove();

    }).catch(() => {
      showThanksModal(message.failuer);
    }).finally(() => {
       form.reset();

    });


  });
  }
  
  function showThanksModal(message) {
    const prevModaldialog = document.querySelector('.modal__dialog');
    
    prevModaldialog.classList.add('hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close>x</div>
        <div class="modal__title">${message}</div>
      </div>
    
    `;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
       prevModaldialog.classList.add('show');
      prevModaldialog.classList.remove('hide');
      closemodal();
    }, 4000);
  };




  
  /* slider*/

  const slider = document.querySelectorAll('.offer__slide'),
    prev = document.querySelector('.offer__slider-prev'),
    next = document.querySelector('.offer__slider-next'),
    total = document.querySelector('#total'),
    current = document.querySelector('#current'),
    sledeWrapper = document.querySelector('.offer__slider-wrapper'),
    sledeFill = document.querySelector('.offer__slide-inner'),
    width = window.getComputedStyle(sledeWrapper).width;
  
  let slideindex = 1;
  let offSet = 0;

    if (slider.length < 10) {
      total.textContent = `0${slider.length}`;
      current.textContent = `0${slideindex}`;
  } else {
      total.textContent = slider.length;
       current.textContent = slideindex;
  }
  

  sledeFill.style.width = 100 * slider.length + '%';
  sledeFill.style.display = 'flex';
  sledeFill.style.transition = 'all 0.5s';

  sledeWrapper.style.overflow = 'hidden';

  slider.forEach(slide => {
    slide.style.width = width;

  });

  next.addEventListener('click', () => {
    if (offSet == +width.slice(0, width.length - 2) * (slider.length -1)) {
      offSet = 0;
    } else {
      offSet+= +width.slice(0, width.length - 2)
    }
    sledeFill.style.transform = `translateX(-${offSet}px)`;
    
    if (slideindex == slider.length) {
      slideindex = 1;
    } else {
      slideindex++;
    }

    if (slider.length < 10) {
       current.textContent = `0${slideindex}`;
    } else {
      current.textContent = slideindex;
    }

  });
    prev.addEventListener('click', () => {
    if (offSet == 0) {
      offSet = +width.slice(0, width.length - 2) * (slider.length - 1);
    } else {
      offSet -= +width.slice(0, width.length - 2)
    }
      sledeFill.style.transform = `translateX(-${offSet}px)`;
      
       if (slideindex == 1) {
          slideindex = slider.length;
        } else {
          slideindex--;
        }

        if (slider.length < 10) {
          current.textContent = `0${slideindex}`;
        } else {
          current.textContent = slideindex;
        }

  });

});


