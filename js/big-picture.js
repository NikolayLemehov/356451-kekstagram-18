'use strict';

(function () {
  var bigPictureElement = document.querySelector('.big-picture');
  var socialCommentsElement = document.querySelector('.social__comments');

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

  var pictureCancelBtn = document.querySelector('#picture-cancel');
  pictureCancelBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    deactivateBigPicture();
  });
  var onDocumentBigPictureKeyDownEsc = function (evt) {
    if (evt.keyCode === window.util.ESC_KEY_CODE) {
      deactivateBigPicture();
    }
  };
  var deactivateBigPicture = function () {
    bigPictureElement.classList.add('hidden');
    document.removeEventListener('keydown', onDocumentBigPictureKeyDownEsc);
    window.bigPicture.active = false;
  };

  window.bigPicture = {
    active: false,
    activate: function (data) {
      bigPictureElement.classList.remove('hidden');
      fillBigPicture(bigPictureElement, data);
      appendSocialComments(data.comments);
      bigPictureElement.querySelector('.social__comment-count').classList.add('visually-hidden');
      bigPictureElement.querySelector('.comments-loader').classList.add('visually-hidden');
      document.addEventListener('keydown', onDocumentBigPictureKeyDownEsc);
      this.active = true;
    },
  };
})();
