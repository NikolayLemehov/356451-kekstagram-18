'use strict';

(function () {
  window.success = {
    onLoad: function (data) {
      window.data.photos = data;
      window.picture.addPhoto(window.data.photos);
    },
    onSave: function () {
    },
  };
})();
