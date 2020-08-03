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
  var nameField = document.querySelector('input[type="text"]');

  var openTownPopup = function (popup, evt) {
    evt.preventDefault();
    bodyElement.classList.add('no-scroll');
    popup.classList.add('popup--active');
  };

  window.closeTownPopup = function (popup, evt) {
    evt.preventDefault();
    bodyElement.classList.remove('no-scroll');
    popup.classList.remove('popup--active');
  };

  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESCAPE) {
      if (townPopup.classList.contains('popup--active')) {
        window.closeTownPopup(townPopup, evt);
      }
    }
  });

  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESCAPE) {
      if (questionPopup.classList.contains('popup--active')) {
        window.closeTownPopup(questionPopup, evt);
      }
    }
  });

  var listenerPopupOpen = function (popupButton, popup) {
    popupButton.addEventListener('click', function (evt) {
      openTownPopup(popup, evt);
      nameField.focus();
    });
  };

  var listenerPopupClose = function (popupButton, popup) {
    popupButton.addEventListener('click', function (evt) {
      window.closeTownPopup(popup, evt);
    });
  };

  listenerPopupOpen(townButton, townPopup);
  listenerPopupOpen(questionButton, questionPopup);

  listenerPopupClose(townClose, townPopup);
  listenerPopupClose(questionClose, questionPopup);


  townOverlay.addEventListener('click', function (evt) {
    window.closeTownPopup(townPopup, evt);
  });

  questionOverlay.addEventListener('click', function (evt) {
    window.closeTownPopup(questionPopup, evt);
  });

})();

// Функция открытия и закрытия меню в мобильной версии

(function () {
  var menuButton = document.querySelector('.page-header__toggle');
  var menuHeader = document.querySelector('.page-header');
  var menuFooter = document.querySelector('.page-footer');
  var bodyElement = document.querySelector('body');

  menuHeader.classList.remove('page-header--nojs');
  menuFooter.classList.remove('page-footer--nojs');

  menuButton.addEventListener('click', function () {
    if (menuHeader.classList.contains('page-header--closed') && menuFooter.classList.contains('page-footer--closed')) {
      menuHeader.classList.remove('page-header--closed');
      menuFooter.classList.remove('page-footer--closed');
      menuHeader.classList.add('page-header--opened');
      menuFooter.classList.add('page-footer--opened');
      bodyElement.classList.add('no-scroll');
    } else {
      menuHeader.classList.remove('page-header--opened');
      menuFooter.classList.remove('page-footer--opened');
      menuHeader.classList.add('page-header--closed');
      menuFooter.classList.add('page-footer--closed');
      bodyElement.classList.remove('no-scroll');
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

// Валидация формы

(function () {
  var form = document.querySelector('.popup__form');
  var formButton = document.querySelector('.form__btn');
  var inputs = form.querySelectorAll('input');
  var textarea = form.querySelector('textarea');

  var checkFormState = function () {
    var isReady = true;

    for (var i = 0; i < inputs.length; i++) {
      var input = inputs[i];

      if (input.type === 'checkbox' && !input.checked) {
        isReady = false;
      }

      if (input.validity.tooShort) {
        isReady = false;
      }

      if (textarea.validity.tooShort) {
        isReady = false;
      }

      if (input.id === 'form__email' && input.validity.typeMismatch) {
        isReady = false;
      }
    }
    return isReady;
  };

  form.addEventListener('input', function (evt) {
    var isReady = checkFormState();

    if (isReady) {
      formButton.disabled = false;
    } else {
      formButton.disabled = true;
    }

    var input = evt.target.closest('.form__input');
    var inputBlock = evt.target.closest('.form__input-block');

    if (input) {
      var formInvalid = inputBlock.querySelector('.form__invalid');
      var formPlaceholder = inputBlock.querySelector('.form__placeholder');

      if (input.value) {
        formPlaceholder.classList.add('form__placeholder--value');
      } else {
        formPlaceholder.classList.remove('form__placeholder--value');
      }

      if (input.id === 'form__name') {
        if (input.validity.tooShort) {
          formInvalid.style.display = 'block';
          input.classList.add('form__input--invalid');
        } else {
          formInvalid.style.display = 'none';
          input.classList.remove('form__input--invalid');
        }
      }

      if (input.id === 'form__email') {
        if (input.validity.typeMismatch) {
          formInvalid.style.display = 'block';
          input.classList.add('form__input--invalid');
        } else {
          formInvalid.style.display = 'none';
          input.classList.remove('form__input--invalid');
        }
      }
    }
  });
})();

// Отправка формы и сохранения в localStoredg

(function () {
  var form = document.querySelector('.popup__form');
  var questionPopup = document.querySelector('.popup--question');

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var name = form.querySelector('input[type="text"]');
    var email = form.querySelector('input[type="email"]');
    var question = form.querySelector('textarea[name="question"]');
    var checkbox = form.querySelector('input[type="checkbox"]');

    var userQuestion = {
      name: name.value,
      email: email.value,
      question: question.value,
      checkbox: checkbox.checked
    };

    localStorage.setItem('userQuestion', JSON.stringify(userQuestion));

    name.value = '';
    email.value = '';
    question.value = '';
    checkbox.checked = false;

    window.closeTownPopup(questionPopup, evt);
  });
})();
