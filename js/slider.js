'use strict';

(function () {
  var COEFFICIENT_MAX = 1;
  var findCheckedElement = function (collection) {
    return Array.from(collection).find(function (it) {
      return it.checked === true;
    });
  };
  var convertProportion = function (coefficient, from, to) {
    return (to - from) * coefficient + from;
  };
  var effectMap = {
    'none': function () {
      return '';
    },
    'chrome': function (coefficient) {
      return 'grayscale(' + coefficient + ')';
    },
    'sepia': function (coefficient) {
      return 'sepia(' + coefficient + ')';
    },
    'marvin': function (coefficient) {
      return 'invert(' + (coefficient * 100) + '%)';
    },
    'phobos': function (coefficient) {
      return 'blur(' + convertProportion(coefficient, 0, 3) + 'px)';
    },
    'heat': function (coefficient) {
      return 'brightness(' + convertProportion(coefficient, 1, 3);
    },
  };
  // var effectsList = document.querySelector('.effects__list');
  var effectsRadios = document.querySelectorAll('.effects__list .effects__item .effects__radio');

  var imgUploadPreviewElement = document.querySelector('.img-upload__preview');
  var effectLevelLineElement = document.querySelector('.effect-level__line');
  var effectLevelPinElement = effectLevelLineElement.querySelector('.effect-level__pin');

  var getValuePinAndDepth = function (value) {
    effectLevelPinElement.style.left = value + 'px';
    effectLevelDepthElement.style.width = value + 'px';
  };

  effectLevelPinElement.addEventListener('mousedown', function (evt) {
    var startCoordsX = evt.clientX;
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = moveEvt.clientX - startCoordsX;
      var left = effectLevelPinElement.offsetLeft + shift;
      if (Math.round(left) >= 0 && Math.round(left) <= effectLevelLineElement.offsetWidth) {
        getValuePinAndDepth(left);
        startCoordsX = moveEvt.clientX;
      }
      var coefficient = window.util.convertPixelToInteger(getComputedStyle(effectLevelPinElement).left) /
        window.util.convertPixelToInteger(getComputedStyle(effectLevelLineElement).width);
      var checkedElement = findCheckedElement(effectsRadios);
      imgUploadPreviewElement.style.filter = effectMap[checkedElement.getAttribute('value')](coefficient);
    };
    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var effectLevelDepthElement = effectLevelLineElement.querySelector('.effect-level__depth');
  var addChangeEffectsRadioHandler = function (element) {
    element.addEventListener('change', function (evt) {
      imgUploadPreviewElement.style.filter = effectMap[evt.target.getAttribute('value')](COEFFICIENT_MAX);
      getValuePinAndDepth(effectLevelLineElement.offsetWidth);
    });
  };

  effectsRadios.forEach(function (it) {
    addChangeEffectsRadioHandler(it);
  });
})();
