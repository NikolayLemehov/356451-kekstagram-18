'use strict';

(function () {
  var formElement = document.querySelector('#upload-select-image');
  var fileInputElement = document.querySelector('#upload-file');
  var imgUploadOverlayElement = document.querySelector('.img-upload__overlay');

  var formReset = function () {
    formElement.reset();
    window.getOriginSlider();
    window.resetScaleControl();
  };

  var hideUpLoadForm = function () {
    imgUploadOverlayElement.classList.add('hidden');
    document.body.classList.remove('modal-open');
    fileInputElement.value = null;
    document.removeEventListener('keydown', onDocumentFormUpLoadKeyDownEsc);
    window.picture.section.addEventListener('click', window.picture.onClick);
    formReset();
  };
  var showUpLoadForm = function () {
    imgUploadOverlayElement.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentFormUpLoadKeyDownEsc);
    window.picture.section.removeEventListener('click', window.picture.onClick);
  };

  var descriptionTextareaElement = document.querySelector('.text__description');
  var onDocumentFormUpLoadKeyDownEsc = function (evt) {
    if (evt.keyCode === window.util.ESC_KEY_CODE && evt.target !== descriptionTextareaElement
      && evt.target !== window.hashtagInputElement) {
      hideUpLoadForm();
    }
  };

  fileInputElement.addEventListener('change', function () {
    showUpLoadForm();
  });

  var cancelBtnElement = document.querySelector('#upload-cancel');
  cancelBtnElement.addEventListener('click', function () {
    hideUpLoadForm();
  });

  var submitBtnElement = document.querySelector('.img-upload__submit');
  submitBtnElement.addEventListener('click', function (evt) {
    if (formElement.checkValidity()) {
      evt.preventDefault();
      window.backend.save(new FormData(formElement), window.success.onSave, window.onError);
    }
  });

  window.hideUpLoadForm = hideUpLoadForm;
})();

