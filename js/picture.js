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
  var findAndOpenBigPicture = function (src) {
    window.data.currentPhoto = window.data.photos.find(function (it) {
      return it.url === src;
    });
    window.bigPicture.activate(window.data.currentPhoto);
  };
  var onPicturesClick = function (evt) {
    console.log('click picturesElement', evt.target, evt.currentTarget);
    switch (true) {
      case (evt.target.classList.contains('picture__img')):
        console.log('click if', evt.target);
        findAndOpenBigPicture(evt.target.getAttribute('src'));
        break;
      case (evt.target.classList.contains('picture__comments') || evt.target.classList.contains('picture__likes')):
        console.log('click if', evt.path[2]);
        findAndOpenBigPicture(evt.path[2].querySelector('.picture__img').getAttribute('src'));
        break;
      case (evt.target.classList.contains('picture__info')):
        console.log('click if', evt.path[1]);
        findAndOpenBigPicture(evt.path[1].querySelector('.picture__img').getAttribute('src'));
        break;
    }
  };
  picturesElement.addEventListener('click', onPicturesClick);

  window.picture = {
    addPhoto: appendPhotosFragment,
    picturesElement: picturesElement,
    onPicturesClick: onPicturesClick,
  };
})();
