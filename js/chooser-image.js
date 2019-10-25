'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var uploadFileInput = document.querySelector('#upload-file');
  var imgUploadPreviewElement = document.querySelector('.img-upload__preview img');
  var effectsPreviewElements = document.querySelectorAll('.effects__list .effects__preview');

  uploadFileInput.addEventListener('change', function () {
    var file = uploadFileInput.files[0];
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
    effectsPreviewElements.forEach(function (it) {
      it.style.backgroundImage = 'url(' + src + ')';
    });
  };
})();
