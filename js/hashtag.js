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
    if (array.length > TAG.LIMIT) {
      errorMessage = errorMessage + ' ' + ++counter + '. ' + mistakeHashtag.limit.message;
    }
    array.forEach(function (it, i) {
      switch (true) {
        case (it[0] !== '#' && !mistakeHashtag.start.boolean):
          errorMessage = errorMessage + ' ' + ++counter + '. ' + mistakeHashtag.start.message;
          mistakeHashtag.start.boolean = true;
          break;
        case (it === '#' && !mistakeHashtag.single.boolean):
          errorMessage = errorMessage + ' ' + ++counter + '. ' + mistakeHashtag.single.message;
          mistakeHashtag.single.boolean = true;
          break;
        case (it.length > 20 && !mistakeHashtag.length.boolean):
          errorMessage = errorMessage + ' ' + ++counter + '. ' + mistakeHashtag.length.message;
          mistakeHashtag.length.boolean = true;
          break;
        case (!mistakeHashtag.repeat.boolean && !!(array.slice(i + 1)).find(function (item) {
          return item === it;
        })):
          errorMessage = errorMessage + ' ' + ++counter + '. ' + mistakeHashtag.repeat.message;
          mistakeHashtag.repeat.boolean = true;
          break;
        default:
          return;
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

  window.hashtag = {
    textInput: textHashtagsInput,
  };
})();
