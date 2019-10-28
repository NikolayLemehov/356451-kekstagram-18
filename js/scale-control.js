'use strict';

(function () {
  var Scale = {
    MAX: 100,
    MIN: 25,
    STEP: 25,
    START: 100,
  };
  var currentScale = Scale.START;
  var scaleControlSmallerBtnElement = document.querySelector('.scale__control--smaller');
  var scaleControlBiggerBtnElement = document.querySelector('.scale__control--bigger');
  var scaleControlValueInputElement = document.querySelector('.scale__control--value');
  var previewImgElement = document.querySelector('.img-upload__preview img');

  var getImgScale = function (scale) {
    previewImgElement.style.transform = 'scale(' + (scale / 100) + ')';
    scaleControlValueInputElement.setAttribute('value', scale + '%');
    currentScale = scale;
  };

  scaleControlSmallerBtnElement.addEventListener('click', function () {
    var nextScale = currentScale - Scale.STEP;
    if (nextScale >= Scale.MIN) {
      getImgScale(nextScale);
    }
  });
  scaleControlBiggerBtnElement.addEventListener('click', function () {
    var nextScale = currentScale + Scale.STEP;
    if (currentScale + Scale.STEP <= Scale.MAX) {
      getImgScale(nextScale);
    }
  });

  scaleControlValueInputElement.setAttribute('value', currentScale + '%');

  window.resetScaleControl = function () {
    getImgScale(Scale.START);
  };
})();
