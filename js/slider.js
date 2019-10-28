'use strict';

(function () {
  var COEFFICIENT_MAX = 1;
  var Percent = {
    MIN: 0,
    MAX: 100,
  };
  var PhobosCoefficient = {
    MIN: 0,
    MAX: 3,
  };
  var HeatCoefficient = {
    MIN: 1,
    MAX: 3,
  };
  var NONE_EFFECT = 'none';
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
      return 'invert(' + (coefficient * Percent.MAX) + '%)';
    },
    'phobos': function (coefficient) {
      return 'blur(' + convertProportion(coefficient, PhobosCoefficient.MIN, PhobosCoefficient.MAX) + 'px)';
    },
    'heat': function (coefficient) {
      return 'brightness(' + convertProportion(coefficient, HeatCoefficient.MIN, HeatCoefficient.MAX);
    },
  };
  var imgElement = document.querySelector('.img-upload__preview');
  var lineElement = document.querySelector('.effect-level__line');
  var pinElement = lineElement.querySelector('.effect-level__pin');
  var depthElement = lineElement.querySelector('.effect-level__depth');
  var rangeElement = document.querySelector('.effect-level__value');

  var getMaxValuePinAndDepth = function () {
    pinElement.style.left = Percent.MAX + '%';
    depthElement.style.width = Percent.MAX + '%';
  };

  var checkedElementValue = '';
  lineElement.addEventListener('mousedown', function (downEvt) {
    var coefficient = lineElement.getBoundingClientRect().width / rangeElement.max;
    var getPinPosition = function (evt) {
      rangeElement.value = (evt.clientX - lineElement.getBoundingClientRect().left) / coefficient;
      pinElement.style.left = rangeElement.value * coefficient + 'px';
      depthElement.style.width = rangeElement.value * coefficient + 'px';
      imgElement.style.filter = effectMap[checkedElementValue](rangeElement.value / Percent.MAX);
    };
    getPinPosition(downEvt);

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      getPinPosition(moveEvt);
    };
    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var fieldsetElement = document.querySelector('.effect-level');
  var getOrigin = function () {
    imgElement.style.filter = '';
    fieldsetElement.style.display = 'none';
    rangeElement.value = Percent.MIN;
  };
  var getEffect = function (evt) {
    imgElement.style.filter = effectMap[evt.target.value](COEFFICIENT_MAX);
    getMaxValuePinAndDepth();
    rangeElement.value = Percent.MAX;
    fieldsetElement.style.display = 'block';
  };
  var addOnEffectsRadioChange = function (element) {
    element.addEventListener('change', function (evt) {
      checkedElementValue = evt.target.value;
      if (evt.target.value === NONE_EFFECT) {
        getOrigin();
      } else {
        getEffect(evt);
      }
    });
  };

  var radioCollection = document.querySelectorAll('.effects__list .effects__item .effects__radio');
  radioCollection.forEach(function (it) {
    addOnEffectsRadioChange(it);
  });

  getOrigin();

  window.getOriginSlider = getOrigin;
})();
