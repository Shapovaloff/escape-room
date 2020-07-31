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
  var menuFooter = document.querySelector('.page-footer');

  menuButton.addEventListener('click', function () {
    if (menuHeader.classList.contains('page-header--opened')) {
      menuHeader.classList.remove('page-header--opened');
      menuFooter.classList.remove('page-footer--opened');
    } else {
      menuHeader.classList.add('page-header--opened');
      menuFooter.classList.add('page-footer--opened');
    }
  });
})();
