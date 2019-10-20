'use strict';

(function () {
  var SCALE = {
    MAX: 100,
    MIN: 25,
    STEP: 25,
    START: 100,
  };
  var currentScale = SCALE.START;
  var scaleControlSmallerBtn = document.querySelector('.scale__control--smaller');
  var scaleControlBiggerBtn = document.querySelector('.scale__control--bigger');
  var scaleControlValueInput = document.querySelector('.scale__control--value');
  var previewImg = document.querySelector('.img-upload__preview img');
  scaleControlSmallerBtn.addEventListener('click', function () {
    var nextScale = currentScale - SCALE.STEP;
    if (nextScale >= SCALE.MIN) {
      getImgScale(nextScale);
    }
  });
  scaleControlBiggerBtn.addEventListener('click', function () {
    var nextScale = currentScale + SCALE.STEP;
    if (currentScale + SCALE.STEP <= SCALE.MAX) {
      getImgScale(nextScale);
    }
  });
  var getImgScale = function (scale) {
    previewImg.style.transform = 'scale(' + (scale / 100) + ')';
    scaleControlValueInput.setAttribute('value', scale + '%');
    currentScale = scale;
  };
  scaleControlValueInput.setAttribute('value', currentScale + '%');
})();
