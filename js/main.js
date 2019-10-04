'use strict';

var ESC_KEY_CODE = 27;
var PHOTO_QUANTITY = 25;
var AVATAR_QUANTITY = 6;
var SRC_PHOTO_ITEMS = ['photos/', '.jpg'];
var SRC_AVATAR_ITEMS = ['img/avatar-', '.svg'];
var DESCRIPTION = [
  'Тестим новую камеру!',
  'Угадайте, где я',
  'Говорю “да” новым приключениям',
  'Нечего добавить',
  'Да, еще одно фото',
  'Разве не потрясающе?',
  'Что вы об этом думаете?',
];
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var COMMENT_MAX = 5;
var MESSAGE_MAX = 2;
var MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var NAMES = [
  'Виктор',
  'Олег',
  'Илья',
  'Анна',
  'Татьяна',
  'Полина'
];
var FIRST_INDEX = 0;
var COEFFICIENT_MAX = 1;

var findRandomInteger = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var shuffle = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var swap = array[j];
    array[j] = array[i];
    array[i] = swap;
  }
  return array;
};

var createArraySerialIntegerSrc = function (quantity, srcItems) {
  var array = [];
  for (var i = 0; i < quantity; i++) {
    array.push(srcItems[0] + (i + 1) + srcItems[1]);
  }
  return array;
};

var concatenateItemArray = function (array) {
  var string = '' + array[0];
  if (array.length > 1) {
    for (var i = 1; i < array.length; i++) {
      string = string + ' ' + array[i];
    }
  }
  return string;
};

var convertPixelToInteger = function (string) {
  return Number(string.slice(0, -2));
};

var findRandomItemArray = function (array) {
  return array[findRandomInteger(0, array.length - 1)];
};

var findRandomSliceArray = function (array) {
  return array.slice(findRandomInteger(0, array.length - 1));
};

var findSliceShuffleArray = function (array, sliceNumber) {
  if (sliceNumber < array.length) {
    return shuffle(array).slice(array.length - findRandomInteger(1, sliceNumber));
  }
  return shuffle(array).slice(findRandomInteger(0, array.length - 1));
};

var createDataComments = function () {
  var dataComments = [];
  var avatarSrcs = createArraySerialIntegerSrc(AVATAR_QUANTITY, SRC_AVATAR_ITEMS);
  for (var i = 0; i < COMMENT_MAX; i++) {
    var indexCommentWriter = findRandomInteger(0, AVATAR_QUANTITY - 1);
    var dataComment = {
      'avatar': avatarSrcs[indexCommentWriter],
      'message': concatenateItemArray(findSliceShuffleArray(MESSAGES, MESSAGE_MAX)),
      'name': NAMES[indexCommentWriter]
    };
    dataComments.push(dataComment);
  }
  return dataComments;
};

var createDataPhotos = function () {
  var dataPhotos = [];
  var photoSrcs = createArraySerialIntegerSrc(PHOTO_QUANTITY, SRC_PHOTO_ITEMS);
  for (var i = 0; i < PHOTO_QUANTITY; i++) {
    var dataPhoto = {
      'url': photoSrcs[i],
      'description': findRandomItemArray(DESCRIPTION),
      'likes': findRandomInteger(LIKES_MIN, LIKES_MAX),
      'comments': findRandomSliceArray(createDataComments())
    };
    dataPhotos.push(dataPhoto);
  }
  return dataPhotos;
};

var dataPhotos = createDataPhotos();

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
  return (to - from) * coefficient;
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
    return 'brightness(' + convertProportion(coefficient, 0, 3);
  },
};
var effectsList = document.querySelector('.effects__list');
var effectsRadios = effectsList.querySelectorAll('.effects__item .effects__radio');

var imgUploadPreviewElement = document.querySelector('.img-upload__preview');

var effectLevelLineElement = document.querySelector('.effect-level__line');
var effectLevelPinElement = effectLevelLineElement.querySelector('.effect-level__pin');
effectLevelPinElement.addEventListener('mouseup', function () {
  var coefficient = convertPixelToInteger(getComputedStyle(effectLevelPinElement).left) /
    convertPixelToInteger(getComputedStyle(effectLevelLineElement).width);
  var checkedElement = findCheckedElement(effectsRadios);
  imgUploadPreviewElement.style.filter = mapEffect[checkedElement.getAttribute('value')](coefficient);
});

var addChangeEffectsRadioHandler = function (element) {
  element.addEventListener('change', function (evt) {
    imgUploadPreviewElement.style.filter = mapEffect[evt.target.getAttribute('value')](COEFFICIENT_MAX);
  });
};

for (var i = 0; i < effectsRadios.length; i++) {
  addChangeEffectsRadioHandler(effectsRadios[i]);
}

appendPhotosFragment(dataPhotos);
// bigPictureElement.classList.remove('hidden');
fillBigPicture(bigPictureElement, dataPhotos[FIRST_INDEX]);
appendSocialComments(dataPhotos[FIRST_INDEX].comments);
bigPictureElement.querySelector('.social__comment-count').classList.add('visually-hidden');
bigPictureElement.querySelector('.comments-loader').classList.add('visually-hidden');
