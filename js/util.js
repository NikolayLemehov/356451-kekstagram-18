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
    createArraySerialIntegerSrc: function (quantity, srcItems) {
      var array = [];
      for (var i = 0; i < quantity; i++) {
        array.push(srcItems[0] + (i + 1) + srcItems[1]);
      }
      return array;
    },
    concatenateItemArray: function (array) {
      var string = '' + array[0];
      if (array.length > 1) {
        for (var i = 1; i < array.length; i++) {
          string = string + ' ' + array[i];
        }
      }
      return string;
    },
    convertPixelToInteger: function (string) {
      return Number(string.slice(0, -2));
    },
    findRandomItemArray: function (array) {
      return array[this.findRandomInteger(0, array.length - 1)];
    },
    findRandomSliceArray: function (array) {
      return array.slice(this.findRandomInteger(0, array.length - 1));
    },
    findSliceShuffleArray: function (array, sliceNumber) {
      if (sliceNumber < array.length) {
        return this.shuffle(array.slice()).slice(array.length - this.findRandomInteger(1, sliceNumber));
      }
      return this.shuffle(array.slice()).slice(this.findRandomInteger(0, array.length - 1));
    },
    removeCollection: function (collection) {
      for (var i = 0; i < collection.length; i++) {
        collection[i].remove();
      }
    },
  };
})();
