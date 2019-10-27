'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var picturesElement = document.querySelector('.pictures');

  var renderPicture = function (data) {
    var element = pictureTemplate.cloneNode(true);
    element.querySelector('.picture__img').src = data.url;
    element.querySelector('.picture__likes').textContent = '' + data.likes;
    element.querySelector('.picture__comments').textContent = '' + data.comments.length;
    return element;
  };
  var appendPhotosFragment = function (dataArray) {
    var fragment = document.createDocumentFragment();
    dataArray.forEach(function (it) {
      fragment.appendChild(renderPicture(it));
    });
    window.util.removeCollection(picturesElement.querySelectorAll('.picture'));
    picturesElement.appendChild(fragment);
  };
  var findAndOpenBigPicture = function (src) {
    window.data.currentPhoto = window.data.photos.find(function (it) {
      return it.url === src;
    });
    window.activateBigPicture(window.data.currentPhoto);
  };
  var onPicturesClick = function (evt) {
    var picture = evt.path.find(function (it) {
      return (it.classList) ? it.classList.contains('picture') : false;
    });
    if (picture) {
      findAndOpenBigPicture(picture.querySelector('.picture__img').getAttribute('src'));
    }
  };
  picturesElement.addEventListener('click', onPicturesClick);

  window.picture = {
    section: picturesElement,
    render: appendPhotosFragment,
    onClick: onPicturesClick,
  };
})();
