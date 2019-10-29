'use strict';

(function () {
  var Scale = {
    MAX: 100,
    MIN: 25,
    STEP: 25,
    START: 100,
  };
  var currentScale = Scale.START;
  var smallerBtnElement = document.querySelector('.scale__control--smaller');
  var biggerBtnElement = document.querySelector('.scale__control--bigger');
  var valueInputElement = document.querySelector('.scale__control--value');
  var previewImgElement = document.querySelector('.img-upload__preview img');

  var getImgScale = function (scale) {
    previewImgElement.style.transform = 'scale(' + (scale / Scale.MAX) + ')';
    valueInputElement.setAttribute('value', scale + '%');
    currentScale = scale;
  };

  smallerBtnElement.addEventListener('click', function () {
    var nextScale = currentScale - Scale.STEP;
    if (nextScale >= Scale.MIN) {
      getImgScale(nextScale);
    }
  });
  biggerBtnElement.addEventListener('click', function () {
    var nextScale = currentScale + Scale.STEP;
    if (currentScale + Scale.STEP <= Scale.MAX) {
      getImgScale(nextScale);
    }
  });

  valueInputElement.setAttribute('value', currentScale + '%');

  window.resetScaleControl = function () {
    getImgScale(Scale.START);
  };
})();
