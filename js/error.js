'use strict';

(function () {
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var addError = function () {
    var element = errorTemplate.cloneNode(true);
    element.style.display = 'none';
    window.mainElement.appendChild(element);
    return window.mainElement.querySelector('.error');
  };
  var errorElement = addError();

  var errorTitleElement = errorElement.querySelector('.error__title');
  var errorTryAgainBtn = errorElement.querySelector('.error__button--try-again');
  var errorBtns = errorElement.querySelectorAll('.error__button');

  var onErrorBtnClick = function (evt) {
    evt.preventDefault();
    hideErrorElement();
    window.upLoadForm.hide();
  };
  errorBtns.forEach(function (it) {
    it.addEventListener('click', onErrorBtnClick);
  });

  var onDocumentErrorEscKeyDown = function (evt) {
    if (evt.keyCode === window.util.ESC_KEY_CODE) {
      hideErrorElement();
    }
  };
  var showError = function (errorMessage) {
    errorTitleElement.textContent = errorMessage;
    errorElement.style.display = 'flex';
    document.addEventListener('keydown', onDocumentErrorEscKeyDown);
    errorTryAgainBtn.focus();
  };
  var hideErrorElement = function () {
    errorElement.style.display = 'none';
    document.removeEventListener('keydown', onDocumentErrorEscKeyDown);
  };

  window.onError = function (errorMessage) {
    showError(errorMessage);
  };
})();
