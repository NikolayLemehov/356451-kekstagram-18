'use strict';

(function () {
  var COEFFICIENT_MAX = 1;
  var findCheckedElement = function (collection) { // util
    for (var i = 0; i < collection.length; i++) {
      if (collection[i].checked) {
        return collection[i];
      }
    }
    return null;
  };
  var convertProportion = function (coefficient, from, to) { // util
    return (to - from) * coefficient + from;
  };
  var mapEffect = {// data
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
  var effectsList = document.querySelector('.effects__list');
  var effectsRadios = effectsList.querySelectorAll('.effects__item .effects__radio');

  var imgUploadPreviewElement = document.querySelector('.img-upload__preview');

  var effectLevelLineElement = document.querySelector('.effect-level__line');
  var effectLevelPinElement = effectLevelLineElement.querySelector('.effect-level__pin');
  effectLevelPinElement.addEventListener('mouseup', function () {
    var coefficient = window.util.convertPixelToInteger(getComputedStyle(effectLevelPinElement).left) /
      window.util.convertPixelToInteger(getComputedStyle(effectLevelLineElement).width);
    var checkedElement = findCheckedElement(effectsRadios);
    imgUploadPreviewElement.style.filter = mapEffect[checkedElement.getAttribute('value')](coefficient);
  });

  var addChangeEffectsRadioHandler = function (element) {
    element.addEventListener('change', function (evt) {
      imgUploadPreviewElement.style.filter = mapEffect[evt.target.getAttribute('value')](COEFFICIENT_MAX);
    });
  };

  effectsRadios.forEach(function (it) {
    addChangeEffectsRadioHandler(it);
  });
})();
