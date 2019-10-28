'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var uploadFileElement = document.querySelector('input#upload-file');
  var imgUploadPreviewElement = document.querySelector('.img-upload__preview img');
  var effectsPreviewCollection = document.querySelectorAll('.effects__list .effects__preview');

  uploadFileElement.addEventListener('change', function () {
    var file = uploadFileElement.files[0];
    var fileName = file.name.toLowerCase();
    var typeCoincidence = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (typeCoincidence) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        imgUploadPreviewElement.src = reader.result;
        getPreviewImage(reader.result);
      });
      reader.readAsDataURL(file);
    }
  });
  var getPreviewImage = function (src) {
    effectsPreviewCollection.forEach(function (it) {
      it.style.backgroundImage = 'url(' + src + ')';
    });
  };
})();
