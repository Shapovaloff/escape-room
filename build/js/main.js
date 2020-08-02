'use strict';

(function () {
  var ESCAPE = 27;
  var townButton = document.querySelector('.page-header__town');
  var questionButton = document.querySelector('.page-footer__question');
  var bodyElement = document.querySelector('body');
  var townPopup = document.querySelector('.popup--town');
  var townClose = townPopup.querySelector('.popup__close--town');
  var townOverlay = townPopup.querySelector('.popup__overlay');
  var questionPopup = document.querySelector('.popup--question');
  var questionClose = questionPopup.querySelector('.popup__close--question');
  var questionOverlay = questionPopup.querySelector('.popup__overlay');

  var openTownPopup = function (popup, evt) {
    evt.preventDefault();
    bodyElement.classList.add('no-scroll');
    popup.classList.add('popup--active');
  };

  var closeTownPopup = function (popup, evt) {
    evt.preventDefault();
    bodyElement.classList.remove('no-scroll');
    popup.classList.remove('popup--active');
  };

  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESCAPE) {
      if (townPopup.classList.contains('popup--active')) {
        closeTownPopup(townPopup, evt);
      }
    }
  });

  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESCAPE) {
      if (questionPopup.classList.contains('popup--active')) {
        closeTownPopup(questionPopup, evt);
      }
    }
  });

  var listenerPopupOpen = function (popupButton, popup) {
    popupButton.addEventListener('click', function (evt) {
      openTownPopup(popup, evt);
    });
  };

  var listenerPopupClose = function (popupButton, popup) {
    popupButton.addEventListener('click', function (evt) {
      closeTownPopup(popup, evt);
    });
  };

  listenerPopupOpen(townButton, townPopup);
  listenerPopupOpen(questionButton, questionPopup);

  listenerPopupClose(townClose, townPopup);
  listenerPopupClose(questionClose, questionPopup);


  townOverlay.addEventListener('click', function (evt) {
    closeTownPopup(townPopup, evt);
  });

  questionOverlay.addEventListener('click', function (evt) {
    closeTownPopup(questionPopup, evt);
  });

})();

// Функция открытия и закрытия меню в мобильной версии

(function () {
  var menuButton = document.querySelector('.page-header__toggle');
  var menuHeader = document.querySelector('.page-header');
  var menuMain = document.querySelector('.page-main');
  var menuFooter = document.querySelector('.page-footer');

  menuHeader.classList.remove('page-header--nojs');
  menuFooter.classList.remove('page-footer--nojs');

  menuButton.addEventListener('click', function () {
    if (menuHeader.classList.contains('page-header--closed') && menuFooter.classList.contains('page-footer--closed')) {
      menuHeader.classList.remove('page-header--closed');
      menuFooter.classList.remove('page-footer--closed');
      menuHeader.classList.add('page-header--opened');
      menuFooter.classList.add('page-footer--opened');
      menuMain.style.display = 'none';
    } else {
      menuHeader.classList.remove('page-header--opened');
      menuFooter.classList.remove('page-footer--opened');
      menuHeader.classList.add('page-header--closed');
      menuFooter.classList.add('page-footer--closed');
      menuMain.style.display = 'block';
    }
  });
})();

// Функция реализации прокрутки табов

(function () {
  var programsTabs = document.querySelector('.choice-quest__block-contols');

  var breakpoint = window.matchMedia('(min-width:768px)');
  var mySwiper;
  var breakpointChecker = function () {
    if (breakpoint.matches === true) {
      if (mySwiper) {
        mySwiper.destroy(true, true);
      }
      return;
    } else if (breakpoint.matches === false) {
      enableSwiper();
    }
  };


  var enableSwiper = function () {
    if (programsTabs) {
      mySwiper = new window.Swiper(programsTabs, {
        direction: 'horizontal',
        slidesPerView: 'auto',
        freeMode: true,
        spaceBetween: 0,
        grabCursor: true,
        pagination: {
          clickable: true,
        },
      });
    }
  };

  breakpoint.addListener(breakpointChecker);
  breakpointChecker();
})();
