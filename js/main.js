'use strict';

(function () {
  var COEFFICIENT_MAX = 1;

  // форма загрузки фото
  var hideUpLoadForm = function () {
    imgUploadOverlayElement.classList.add('hidden');
    uploadFileInput.value = null;
    document.removeEventListener('keydown', onDocumentFormUpLoadKeyDownEsc);
    window.picture.picturesElement.addEventListener('click', window.picture.onPicturesClick);
  };
  var showUpLoadForm = function () {
    imgUploadOverlayElement.classList.remove('hidden');
    document.addEventListener('keydown', onDocumentFormUpLoadKeyDownEsc);
    window.picture.picturesElement.removeEventListener('click', window.picture.onPicturesClick);
  };

  var textDescriptionTextarea = document.querySelector('.text__description');
  var onDocumentFormUpLoadKeyDownEsc = function (evt) {
    if (evt.keyCode === window.util.ESC_KEY_CODE && evt.target !== textDescriptionTextarea
      && evt.target !== textHashtagsInput) {
      hideUpLoadForm();
    }
  };

  var uploadFileInput = document.querySelector('#upload-file');
  var imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
  uploadFileInput.addEventListener('change', function () {
    showUpLoadForm();
  });

  var uploadCancelBtn = document.querySelector('#upload-cancel');
  uploadCancelBtn.addEventListener('click', function () {
    hideUpLoadForm();
  });

  // описание слайдера
  var findCheckedElement = function (collection) { // util
    for (var i = 0; i < collection.length; i++) {
      if (collection[i].checked) {
        return collection[i];
      }
    }
    return null;
  };
  var convertProportion = function (coefficient, from, to) { // util
    return (to - from) * coefficient + from;
  };
  var mapEffect = {// data
    'none': function () {
      return '';
    },
    'chrome': function (coefficient) {
      return 'grayscale(' + coefficient + ')';
    },
    'sepia': function (coefficient) {
      return 'sepia(' + coefficient + ')';
    },
    'marvin': function (coefficient) {
      return 'invert(' + (coefficient * 100) + '%)';
    },
    'phobos': function (coefficient) {
      return 'blur(' + convertProportion(coefficient, 0, 3) + 'px)';
    },
    'heat': function (coefficient) {
      return 'brightness(' + convertProportion(coefficient, 1, 3);
    },
  };
  var effectsList = document.querySelector('.effects__list');
  var effectsRadios = effectsList.querySelectorAll('.effects__item .effects__radio');

  var imgUploadPreviewElement = document.querySelector('.img-upload__preview');

  var effectLevelLineElement = document.querySelector('.effect-level__line');
  var effectLevelPinElement = effectLevelLineElement.querySelector('.effect-level__pin');
  effectLevelPinElement.addEventListener('mouseup', function () {
    var coefficient = window.util.convertPixelToInteger(getComputedStyle(effectLevelPinElement).left) /
      window.util.convertPixelToInteger(getComputedStyle(effectLevelLineElement).width);
    var checkedElement = findCheckedElement(effectsRadios);
    imgUploadPreviewElement.style.filter = mapEffect[checkedElement.getAttribute('value')](coefficient);
  });

  var addChangeEffectsRadioHandler = function (element) {
    element.addEventListener('change', function (evt) {
      imgUploadPreviewElement.style.filter = mapEffect[evt.target.getAttribute('value')](COEFFICIENT_MAX);
    });
  };

  effectsRadios.forEach(function (it) {
    addChangeEffectsRadioHandler(it);
  });

  // валидация тегов
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

  window.backend.load(window.success.onLoad, window.error.onError);
  // imgUploadOverlayElement.classList.remove('hidden');// временно
})();
