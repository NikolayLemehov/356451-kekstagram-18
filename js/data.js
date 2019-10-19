'use strict';

(function () {
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

  var createDataComments = function () {
    var dataComments = [];
    var avatarSrcs = window.util.createArraySerialIntegerSrc(AVATAR_QUANTITY, SRC_AVATAR_ITEMS);
    for (var i = 0; i < COMMENT_MAX; i++) {
      var indexCommentWriter = window.util.findRandomInteger(0, AVATAR_QUANTITY - 1);
      var dataComment = {
        'avatar': avatarSrcs[indexCommentWriter],
        'message': window.util.concatenateItemArray(window.util.findSliceShuffleArray(MESSAGES, MESSAGE_MAX)),
        'name': NAMES[indexCommentWriter]
      };
      dataComments.push(dataComment);
    }
    return dataComments;
  };

  var createDataPhotos = function () {
    var dataPhotos = [];
    var photoSrcs = window.util.createArraySerialIntegerSrc(PHOTO_QUANTITY, SRC_PHOTO_ITEMS);
    for (var i = 0; i < PHOTO_QUANTITY; i++) {
      var dataPhoto = {
        'url': photoSrcs[i],
        'description': window.util.findRandomItemArray(DESCRIPTION),
        'likes': window.util.findRandomInteger(LIKES_MIN, LIKES_MAX),
        'comments': window.util.findRandomSliceArray(createDataComments())
      };
      dataPhotos.push(dataPhoto);
    }
    return dataPhotos;
  };

  window.data = {
    photos: createDataPhotos(),
  };
})();
