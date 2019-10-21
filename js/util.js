'use strict';

(function () {
  window.util = {
    ESC_KEY_CODE: 27,
    findRandomInteger: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },
    shuffle: function (array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var swap = array[j];
        array[j] = array[i];
        array[i] = swap;
      }
      return array;
    },
    convertPixelToInteger: function (string) {
      return Number(string.slice(0, -2));
    },
    removeCollection: function (collection) {
      for (var i = 0; i < collection.length; i++) {
        collection[i].remove();
      }
    },
  };
})();
