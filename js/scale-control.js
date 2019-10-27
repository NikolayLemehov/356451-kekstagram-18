'use strict';

(function () {
  var Scale = {
    MAX: 100,
    MIN: 25,
    STEP: 25,
    START: 100,
  };
  var currentScale = Scale.START;
  var scaleControlSmallerBtn = document.querySelector('.scale__control--smaller');
  var scaleControlBiggerBtn = document.querySelector('.scale__control--bigger');
  var scaleControlValueInput = document.querySelector('.scale__control--value');
  var previewImg = document.querySelector('.img-upload__preview img');

  var getImgScale = function (scale) {
    previewImg.style.transform = 'scale(' + (scale / 100) + ')';
    scaleControlValueInput.setAttribute('value', scale + '%');
    currentScale = scale;
  };

  scaleControlSmallerBtn.addEventListener('click', function () {
    var nextScale = currentScale - Scale.STEP;
    if (nextScale >= Scale.MIN) {
      getImgScale(nextScale);
    }
  });
  scaleControlBiggerBtn.addEventListener('click', function () {
    var nextScale = currentScale + Scale.STEP;
    if (currentScale + Scale.STEP <= Scale.MAX) {
      getImgScale(nextScale);
    }
  });

  scaleControlValueInput.setAttribute('value', currentScale + '%');

  window.scaleControl = {
    reset: function () {
      getImgScale(Scale.START);
    },
  };
})();
