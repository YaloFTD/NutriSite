"use strict";

let menuSwiper = document.querySelector('.menu-foods__slider');
if (menuSwiper) {
   let eating = ['Breakfast', 'Lunch', 'Dinner'];
   const swiper = new Swiper('.menu-foods__slider', {
      autoHeight: true,
      // If we need pagination
      pagination: {
         el: '.swiper-pagination',
         clickable: true,
         renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (eating[index]) + '</span>';
         }
      },
      effect: "creative",
      creativeEffect: {
         prev: {
            shadow: true,
            translate: [0, 0, -800],
            rotate: [180, 0, 0],
         },
         next: {
            shadow: true,
            translate: [0, 0, -800],
            rotate: [-180, 0, 0],
         },
      },
      // Navigation arrows
      navigation: {
         nextEl: '.menu-foods__arrow-next',
         prevEl: '.menu-foods__arrow-prev',
      },
   });
}

const animItems = document.querySelectorAll('._anim-items');
if (animItems.length > 0) {
   window.addEventListener('scroll', animOnScroll);
   function animOnScroll() {
      for (let index = 0; index < animItems.length; index++){
         const animItem = animItems[index];
         const animItemHeight = animItem.offsetHeight;
         const animItemOffset = offset(animItem).top;
         const animStart = 4;

         let animItemPoint = window.innerHeight - animItemHeight / animStart;
         if (animItemHeight > window.innerHeight) {
            animItemPoint = window.innerHeight - window.innerHeight / animStart;
         }

         if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
            animItem.classList.add('_active');
         } else {
            if (!animItem.classList.contains('_anim-no-hide')) {
               animItem.classList.remove('_active');
            }
         }
      }
   }
   function offset(el) {
      const rect = el.getBoundingClientRect(),
         scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
         scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
   }

   setTimeout(() => {
      animOnScroll();
   }, 300);
}

// МЕНЮ БУРГЕР
let menu = document.querySelector('.icon-menu');
let menuBody = document.querySelector('.menu__body');
menu.addEventListener('click', function () {
   document.body.classList.toggle('_lock');
   menu.classList.toggle('_active');
   menuBody.classList.toggle('_active');
});

// ЛИПКИЙ HEADER
let header = document.querySelector('.header');
document.onscroll = function () {
   let scroll = window.scrollY;

   if (scroll > 0){
      header.classList.add('fixed');
   } else {
      header.classList.remove('fixed');
   }
}

// ЯКОРЬ (ПЛАВНАЯ ПРОКРУТКА ДО НУЖНОГО БЛОКА)
let menuLinks = document.querySelectorAll('[data-goto]');
if (menuLinks.length > 0) {
   window.addEventListener('scroll', onMenuLinkScroll);
   for (let menuLink of menuLinks) {
      menuLink.addEventListener('click', onMenuLinkClick);
   }
   function onMenuLinkClick(e) {
      let menuLink = e.target;
      if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
         let gotoBlock = document.querySelector(menuLink.dataset.goto);
         let gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;
         if (menu.classList.contains('_active')) {
            document.body.classList.remove('_lock');
            menu.classList.remove('_active');
            menuBody.classList.remove('_active');
         }
         
         window.scrollTo({
            top: gotoBlockValue,
            behavior: 'smooth'
         });
         e.preventDefault();
      }
   }
   function onMenuLinkScroll(e) {
      let scrollDistance = pageYOffset + 3;
      for (let menuLink of menuLinks) {
         if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            let gotoBlock = document.querySelector(menuLink.dataset.goto);
            let gotoBlockHeight = document.querySelector(menuLink.dataset.goto).offsetHeight;
            let gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollDistance - document.querySelector('header').offsetHeight;
            if (gotoBlock.offsetTop - document.querySelector('header').offsetHeight <= scrollDistance && gotoBlockHeight + gotoBlockValue > scrollDistance) {
               for (let menuLink of menuLinks) {
                  if (menuLink.classList.contains('_active')) {
                     menuLink.classList.remove('_active');
                  }
               }
               menuLink.classList.add('_active');
            } else {
               menuLink.classList.remove('_active');
            }
         }
      }
   }
}