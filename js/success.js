'use strict';

(function () {
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var addSuccess = function () {
    var element = successTemplate.cloneNode(true);
    element.style.display = 'none';
    window.element.main.appendChild(element);
    return window.element.main.querySelector('.success');
  };
  var successElement = addSuccess();
  var successBtn = successElement.querySelector('.success__button');
  successBtn.addEventListener('click', function () {
    hideSuccess();
  });

  var showSuccess = function () {
    successElement.style.display = 'block';
    document.addEventListener('keydown', onDocumentSuccessEscKeyDown);
    document.addEventListener('click', onDocumentSuccessClick);
  };
  var hideSuccess = function () {
    successElement.style.display = 'none';
    document.removeEventListener('keydown', onDocumentSuccessEscKeyDown);
    document.removeEventListener('click', onDocumentSuccessClick);
  };
  var onDocumentSuccessEscKeyDown = function (evt) {
    if (evt.keyCode === window.util.ESC_KEY_CODE) {
      hideSuccess();
    }
  };
  var onDocumentSuccessClick = function (evt) {
    evt.preventDefault();
    hideSuccess();
  };

  window.success = {
    onLoad: function (data) {
      window.data.photos = data;
      window.picture.addPhoto(window.data.photos);
    },
    onSave: function () {
      showSuccess();
      window.upLoadForm.element.reset();
      window.slider.getOrigin();
      window.upLoadForm.hide();
    },
  };
})();
