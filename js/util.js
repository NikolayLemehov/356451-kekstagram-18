'use strict';

(function () {
  window.util = {
    ESC_KEY_CODE: 27,
    shuffle: function (array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var swap = array[j];
        array[j] = array[i];
        array[i] = swap;
      }
      return array;
    },
    removeCollection: function (collection) {
      collection.forEach(function (it) {
        it.remove();
      });
    },
  };
})();
