'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var picturesElement = document.querySelector('.pictures');
  var renderPicture = function (data) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = data.url;
    pictureElement.querySelector('.picture__likes').textContent = '' + data.likes;
    pictureElement.querySelector('.picture__comments').textContent = '' + data.comments.length;
    return pictureElement;
  };

  var appendPhotosFragment = function (dataArray) {
    var fragment = document.createDocumentFragment();
    dataArray.forEach(function (it) {
      fragment.appendChild(renderPicture(it));
    });
    picturesElement.appendChild(fragment);
  };
  picturesElement.addEventListener('click', function (evt) {
    var src = evt.target.getAttribute('src');
    if (src) {
      window.data.currentPhoto = window.data.photos.find(function (it) {
        return it.url === src;
      });
      window.bigPicture.activate(window.data.currentPhoto);
    }
  });
  window.picture = {
    addPhoto: appendPhotosFragment,
  };
})();
