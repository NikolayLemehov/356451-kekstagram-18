'use strict';

(function () {
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
      && evt.target !== window.hashtag.textInput) {
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
})();
