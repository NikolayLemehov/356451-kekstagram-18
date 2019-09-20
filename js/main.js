'use strict';

var PHOTO_QUANTITY = 25;
var AVATAR_QUANTITY = 6;
var SRC_PHOTO_ITEMS = ['photos/', '.jpg'];
var SRC_AVATAR_ITEMS = ['img/avatar-', '.svg'];
var DESCRIPTION = 'описание фотографии';
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

var findRandomItemArray = function (array) {
  return array[findRandomInteger(0, array.length - 1)];
};

var findRandomSliceArray = function (array) {
  return array.slice(findRandomInteger(0, array.length - 1));
};

var findSliceShuffleArray = function (array, sliceNumber) {
  return (sliceNumber < array.length) ? shuffle(array).slice(array.length - findRandomInteger(1, sliceNumber)) : shuffle(array).slice(findRandomInteger(0, array.length - 1));
};

var createDataComments = function () {
  var dataComments = [];
  var avatarSrcs = createArraySerialIntegerSrc(AVATAR_QUANTITY, SRC_AVATAR_ITEMS);
  for (var i = 0; i < COMMENT_MAX; i++) {
    var dataComment = {
      'avatar': findRandomItemArray(avatarSrcs),
      'message': concatenateItemArray(findSliceShuffleArray(MESSAGES, MESSAGE_MAX)),
      'name': findRandomItemArray(NAMES)
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
      'description': DESCRIPTION,
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

var renderPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = '' + picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = '' + picture.comments.length;
  return pictureElement;
};

var appendPinsFragment = function (data) {
  var fragment = document.createDocumentFragment();
  for (var item = 0; item < data.length; item++) {
    fragment.appendChild(renderPicture(data[item]));
  }
  picturesElement.appendChild(fragment);
};

appendPinsFragment(dataPhotos);
