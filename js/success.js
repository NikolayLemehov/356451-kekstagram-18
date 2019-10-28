'use strict';

(function () {
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var addSuccess = function () {
    var element = successTemplate.cloneNode(true);
    element.style.display = 'none';
    window.mainElement.appendChild(element);
    return window.mainElement.querySelector('.success');
  };
  var successElement = addSuccess();
  var btnElement = successElement.querySelector('.success__button');
  btnElement.addEventListener('click', function () {
    hideSuccess();
  });
  successElement.addEventListener('click', function (evt) {
    if (evt.target === successElement) {
      hideSuccess();
    }
  });

  var showSuccess = function () {
    successElement.style.display = 'flex';
    document.addEventListener('keydown', onDocumentSuccessEscKeyDown);
    btnElement.focus();
  };
  var hideSuccess = function () {
    successElement.style.display = 'none';
    document.removeEventListener('keydown', onDocumentSuccessEscKeyDown);
  };
  var onDocumentSuccessEscKeyDown = function (evt) {
    if (evt.keyCode === window.util.ESC_KEY_CODE) {
      hideSuccess();
    }
  };

  window.success = {
    onLoad: function (data) {
      window.data.photos = data;
      window.filter.updatePicture();
      window.filter.show();
    },
    onSave: function () {
      showSuccess();
      window.hideUpLoadForm();
    },
  };
})();
