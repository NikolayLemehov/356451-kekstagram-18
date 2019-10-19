'use strict';

var ESC_KEY_CODE = 27;
var FIRST_INDEX = 0;
var COEFFICIENT_MAX = 1;

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var picturesElement = document.querySelector('.pictures');
var bigPictureElement = document.querySelector('.big-picture');
var socialCommentsElement = document.querySelector('.social__comments');

var renderPicture = function (data) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = data.url;
  pictureElement.querySelector('.picture__likes').textContent = '' + data.likes;
  pictureElement.querySelector('.picture__comments').textContent = '' + data.comments.length;
  return pictureElement;
};

var appendPhotosFragment = function (dataArray) {
  var fragment = document.createDocumentFragment();
  for (var item = 0; item < dataArray.length; item++) {
    fragment.appendChild(renderPicture(dataArray[item]));
  }
  picturesElement.appendChild(fragment);
};

var fillBigPicture = function (element, dataPhoto) {
  element.querySelector('.big-picture__img img').src = dataPhoto.url;
  element.querySelector('.likes-count').textContent = dataPhoto.likes;
  element.querySelector('.comments-count').textContent = '' + dataPhoto.comments.length;
  element.querySelector('.social__caption').textContent = dataPhoto.description;
};

var renderSocialComments = function (data) {
  var socialCommentElement = bigPictureElement.querySelector('.social__comment').cloneNode(true);
  socialCommentElement.querySelector('.social__picture').src = data.avatar;
  socialCommentElement.querySelector('.social__picture').alt = data.name;
  socialCommentElement.querySelector('.social__text').textContent = data.message;
  return socialCommentElement;
};

var appendSocialComments = function (dataArray) {
  var fragment = document.createDocumentFragment();
  for (var item = 0; item < dataArray.length; item++) {
    fragment.appendChild(renderSocialComments(dataArray[item]));
  }
  while (socialCommentsElement.firstChild) {
    socialCommentsElement.removeChild(socialCommentsElement.firstChild);
  }
  socialCommentsElement.appendChild(fragment);
};
// форма загрузки фото
var hideUpLoadForm = function () {
  imgUploadOverlayElement.classList.add('hidden');
  uploadFileInput.value = null;
  document.removeEventListener('keydown', pressEscCloseFormBtnHandler);
};
var showUpLoadForm = function () {
  imgUploadOverlayElement.classList.remove('hidden');
  document.addEventListener('keydown', pressEscCloseFormBtnHandler);
};

var pressEscCloseFormBtnHandler = function (evt) {
  if (evt.keyCode === ESC_KEY_CODE) {
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

appendPhotosFragment(window.data.photos);
// bigPictureElement.classList.remove('hidden');
fillBigPicture(bigPictureElement, window.data.photos[FIRST_INDEX]);
appendSocialComments(window.data.photos[FIRST_INDEX].comments);
bigPictureElement.querySelector('.social__comment-count').classList.add('visually-hidden');
bigPictureElement.querySelector('.comments-loader').classList.add('visually-hidden');
