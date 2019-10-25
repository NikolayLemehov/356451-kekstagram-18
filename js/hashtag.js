'use strict';

(function () {
  var TAG = {
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
      message: 'Хештег не может быть длиннее ' + TAG.LENGTH + ' символов всключая "#".',
      boolean: false,
    },
    repeat: {
      message: 'Хештег не должен повторятся с учётом того, что к регистру букв он не чувствителен.',
      boolean: false,
    },
    limit: {
      message: 'Хештегов не может быть больше ' + TAG.LIMIT + 'шт.',
      boolean: false,
    },
  };
  var textHashtagsInput = document.querySelector('.text__hashtags');
  var validateHashtags = function () {
    var counter = 0;
    var errorMessage = '';
    var array = textHashtagsInput.value.toLowerCase().split(' ');
    array = array.filter(function (it) {
      return it !== '';
    });
    var addToErroMessage = function (message) {
      errorMessage = errorMessage + ' ' + ++counter + '. ' + message;
    };
    if (array.length > TAG.LIMIT) {
      addToErroMessage(mistakeHashtag.limit.message);
    }
    var setMistakeHashtag = function (mistakeType) {
      addToErroMessage(mistakeType.message);
      mistakeType.boolean = true;
    };
    array.forEach(function (it, i) {
      if (it[0] !== '#' && !mistakeHashtag.start.boolean) {
        setMistakeHashtag(mistakeHashtag.start);
      }
      if (it === '#' && !mistakeHashtag.single.boolean) {
        setMistakeHashtag(mistakeHashtag.start);
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
    textHashtagsInput.setCustomValidity(errorMessage);
  };

  textHashtagsInput.addEventListener('change', function () {
    validateHashtags();
  });

  var toColorInvalid = function (element) {
    element.style.backgroundColor = 'red';
  };
  var toColorValid = function (element) {
    element.style.backgroundColor = 'white';
  };
  textHashtagsInput.addEventListener('invalid', function () {
    toColorInvalid(textHashtagsInput);
  });
  textHashtagsInput.addEventListener('change', function () {
    if (textHashtagsInput.checkValidity()) {
      toColorValid(textHashtagsInput);
    }
  });

  window.textHashtagsInput = textHashtagsInput;
})();
