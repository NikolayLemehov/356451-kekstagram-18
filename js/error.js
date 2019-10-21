'use strict';

(function () {
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var addError = function () {
    var element = errorTemplate.cloneNode(true);
    element.style.display = 'none';
    window.element.main.appendChild(element);
    return window.element.main.querySelector('.error');
  };
  var errorElement = addError();

  var errorTitleElement = errorElement.querySelector('.error__title');
  var errorTryAgainBtn = errorElement.querySelector('.error__button--try-again');
  var errorUploadOtherBtn = errorElement.querySelector('.error__button--upload-other');

  var onErrorUploadOtherBtnClick = function (evt) {
    evt.preventDefault();
    hideErrorElement();
    window.upLoadForm.hide();
  };
  errorUploadOtherBtn.addEventListener('click', onErrorUploadOtherBtnClick);

  var onDocumentErrorEscKeyDown = function (evt) {
    if (evt.keyCode === window.util.ESC_KEY_CODE) {
      hideErrorElement();
    }
  };
  var showError = function () {
    errorElement.style.display = 'block';
    document.addEventListener('keydown', onDocumentErrorEscKeyDown);
  };
  var hideErrorElement = function () {
    errorElement.style.display = 'none';
    document.removeEventListener('keydown', onDocumentErrorEscKeyDown);
  };
  errorTryAgainBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    hideErrorElement();
    window.upLoadForm.submit();
  });

  window.error = {
    onError: function (errorMessage) {
      showError();
      errorTitleElement.textContent = errorMessage;
    },
  };
})();
