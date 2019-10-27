'use strict';

(function () {
  var formElement = document.querySelector('#upload-select-image');
  var uploadFileInput = document.querySelector('#upload-file');
  var imgUploadOverlayElement = document.querySelector('.img-upload__overlay');

  var hideUpLoadForm = function () {
    imgUploadOverlayElement.classList.add('hidden');
    uploadFileInput.value = null;
    document.removeEventListener('keydown', onDocumentFormUpLoadKeyDownEsc);
    window.picture.section.addEventListener('click', window.picture.onClick);
  };
  var showUpLoadForm = function () {
    imgUploadOverlayElement.classList.remove('hidden');
    document.addEventListener('keydown', onDocumentFormUpLoadKeyDownEsc);
    window.picture.section.removeEventListener('click', window.picture.onClick);
  };

  var textDescriptionTextarea = document.querySelector('.text__description');
  var onDocumentFormUpLoadKeyDownEsc = function (evt) {
    if (evt.keyCode === window.util.ESC_KEY_CODE && evt.target !== textDescriptionTextarea
      && evt.target !== window.textHashtagsInput) {
      hideUpLoadForm();
    }
  };

  uploadFileInput.addEventListener('change', function () {
    showUpLoadForm();
  });

  var uploadCancelBtn = document.querySelector('#upload-cancel');
  uploadCancelBtn.addEventListener('click', function () {
    hideUpLoadForm();
  });

  var formSubmitBtn = document.querySelector('.img-upload__submit');
  formSubmitBtn.addEventListener('click', function (evt) {
    if (formElement.checkValidity()) {
      evt.preventDefault();
      window.backend.save(new FormData(formElement), window.success.onSave, window.onError);
    }
  });

  var formReset = function () {
    formElement.reset();
    window.slider.getOrigin();
    window.resetScaleControl();
  };

  window.hideUpLoadForm = function () {
    formReset();
    hideUpLoadForm();
  };
})();
