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
  var effectsRadios = document.querySelectorAll('.effects__list .effects__item .effects__radio');
  var imgUploadPreviewElement = document.querySelector('.img-upload__preview');
  var effectLevelLineElement = document.querySelector('.effect-level__line');
  var effectLevelPinElement = effectLevelLineElement.querySelector('.effect-level__pin');
  var effectLevelDepthElement = effectLevelLineElement.querySelector('.effect-level__depth');
  var effectLevelValueInput = document.querySelector('.effect-level__value');

  var getValuePinAndDepth = function (value) {
    effectLevelPinElement.style.left = value + 'px';
    effectLevelDepthElement.style.width = value + 'px';
  };
  var getMaxValuePinAndDepth = function () {
    effectLevelPinElement.style.left = '100%';
    effectLevelDepthElement.style.width = '100%';
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
      effectLevelValueInput.setAttribute('value', String(coefficient * 100));
    };
    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var effectLevelElement = document.querySelector('.effect-level');
  var getOrigin = function () {
    imgUploadPreviewElement.style.filter = '';
    effectLevelElement.style.display = 'none';
    effectLevelElement.setAttribute('disabled', 'disabled');
    effectLevelValueInput.setAttribute('value', '0');
  };
  getOrigin();
  var getEffect = function (evt) {
    imgUploadPreviewElement.style.filter = effectMap[evt.target.getAttribute('value')](COEFFICIENT_MAX);
    getMaxValuePinAndDepth();
    effectLevelElement.removeAttribute('disabled');
    effectLevelValueInput.setAttribute('value', '100');
    effectLevelElement.style.display = 'block';
  };
  var addOnEffectsRadioChange = function (element) {
    element.addEventListener('change', function (evt) {
      if (evt.target.getAttribute('value') === 'none') {
        getOrigin();
      } else {
        getEffect(evt);
      }
    });
  };

  effectsRadios.forEach(function (it) {
    addOnEffectsRadioChange(it);
  });

  window.getOriginSlider = getOrigin;
})();
