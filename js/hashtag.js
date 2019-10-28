'use strict';

(function () {
  var Tag = {
    LIMIT: 5,
    LENGTH: 20,
  };
  var mistakeHashtag = {
    start: {
      message: 'Хештег должен начинаться с символа "#".',
      boolean: false,
    },
    single: {
      message: 'Хештег не может состоять из одного символа "#".',
      boolean: false,
    },
    length: {
      message: 'Хештег не может быть длиннее ' + Tag.LENGTH + ' символов всключая "#".',
      boolean: false,
    },
    repeat: {
      message: 'Хештег не должен повторятся с учётом того, что к регистру букв он не чувствителен.',
      boolean: false,
    },
    limit: {
      message: 'Хештегов не может быть больше ' + Tag.LIMIT + 'шт.',
      boolean: false,
    },
  };
  var hashtagInputElement = document.querySelector('.text__hashtags');
  var validateHashtags = function () {
    var counter = 0;
    var errorMessage = '';
    for (var key in mistakeHashtag) {
      if (mistakeHashtag.hasOwnProperty(key)) {
        mistakeHashtag[key].boolean = false;
      }
    }

    var array = hashtagInputElement.value.toLowerCase().split(' ');
    array = array.filter(function (it) {
      return it !== '';
    });

    var addToErroMessage = function (message) {
      errorMessage = errorMessage + ' ' + ++counter + '. ' + message;
    };
    var setMistakeHashtag = function (mistakeType) {
      addToErroMessage(mistakeType.message);
      mistakeType.boolean = true;
    };

    if (array.length > Tag.LIMIT) {
      addToErroMessage(mistakeHashtag.limit.message);
    }
    array.forEach(function (it, i) {
      if (it[0] !== '#' && !mistakeHashtag.start.boolean) {
        setMistakeHashtag(mistakeHashtag.start);
      }
      if (it === '#' && !mistakeHashtag.single.boolean) {
        setMistakeHashtag(mistakeHashtag.single);
      }
      if (it.length > 20 && !mistakeHashtag.length.boolean) {
        setMistakeHashtag(mistakeHashtag.length);
      }
      if (!mistakeHashtag.repeat.boolean && !!(array.slice(i + 1)).find(function (item) {
        return item === it;
      })) {
        setMistakeHashtag(mistakeHashtag.repeat);
      }
    });

    hashtagInputElement.setCustomValidity(errorMessage);
  };

  var toColorInvalid = function (element) {
    element.style.backgroundColor = 'red';
  };
  var toColorValid = function (element) {
    element.style.backgroundColor = 'white';
  };

  hashtagInputElement.addEventListener('invalid', function () {
    toColorInvalid(hashtagInputElement);
  });
  hashtagInputElement.addEventListener('change', function () {
    validateHashtags();
    if (hashtagInputElement.checkValidity()) {
      toColorValid(hashtagInputElement);
    }
  });

  window.hashtagInputElement = hashtagInputElement;
})();
