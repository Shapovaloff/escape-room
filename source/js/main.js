'use strict';

(function () {
  var ESCAPE = 27;
  var townButton = document.querySelector('.page-header__town');
  var bodyElement = document.querySelector('body');
  var townPopup = document.querySelector('.popup--town');
  var townClose = document.querySelector('.popup__close--town');
  var townOverlay = document.querySelector('.popup__overlay--town');

  var openTownPopup = function (evt) {
    evt.preventDefault();
    bodyElement.classList.add('no-scroll');
    townPopup.classList.add('popup--active');
  }

  var closeTownPopup = function (evt) {
    evt.preventDefault();
    bodyElement.classList.remove('no-scroll');
    townPopup.classList.remove('popup--active');
  }

  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESCAPE) {
      if (townPopup.classList.contains('popup--active')) {
        closeTownPopup(evt);
      }
    }
  });

  townButton.addEventListener('click', function (evt) {
    openTownPopup(evt);
  });

  townClose.addEventListener('click', function (evt) {
    closeTownPopup(evt);
  });

  townOverlay.addEventListener('click', function (evt) {
    closeTownPopup(evt);
  })

})();
