'use strict';

(function () {
  var bodyElement = document.querySelector('body');
  var bigPictureElement = document.querySelector('.big-picture');

  var fillBigPicture = function (element, dataPhoto) {
    element.querySelector('.big-picture__img img').src = dataPhoto.url;
    element.querySelector('.likes-count').textContent = dataPhoto.likes;
    element.querySelector('.comments-count').textContent = '' + dataPhoto.comments.length;
    element.querySelector('.social__caption').textContent = dataPhoto.description;
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
    window.comment.reset();
  };

  window.bigPicture = {
    activate: function (data) {
      bigPictureElement.classList.remove('hidden');
      bodyElement.classList.add('modal-open');
      fillBigPicture(bigPictureElement, data);
      window.comment.add(data.comments);
      document.addEventListener('keydown', onDocumentBigPictureKeyDownEsc);
    },
  };
})();
