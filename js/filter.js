'use strict';

(function () {
  var RANDOM_PHOTO_NUMBER = 10;
  var imgFiltersElement = document.querySelector('.img-filters');
  var filterPopularBtn = imgFiltersElement.querySelector('#filter-popular');
  var filterRandomBtn = imgFiltersElement.querySelector('#filter-random');
  var filterDiscussedBtn = imgFiltersElement.querySelector('#filter-discussed');

  var activeFilter = filterPopularBtn.getAttribute('id');
  var switchFilter = function (btn) {
    if (btn.getAttribute('id') !== activeFilter) {
      btn.classList.add('img-filters__button--active');
      imgFiltersElement.querySelector('#' + activeFilter).classList.remove('img-filters__button--active');
      activeFilter = btn.getAttribute('id');
    }
  };

  filterPopularBtn.addEventListener('click', function () {
    switchFilter(filterPopularBtn);
    debounceUpdatePicture();
  });
  filterRandomBtn.addEventListener('click', function () {
    switchFilter(filterRandomBtn);
    debounceUpdatePicture();
  });
  filterDiscussedBtn.addEventListener('click', function () {
    switchFilter(filterDiscussedBtn);
    debounceUpdatePicture();
  });

  var sortByPopular = function (photos) {
    photos.sort(function (left, right) {
      var rankDiff = right.likes - left.likes;
      if (rankDiff === 0) {
        rankDiff = right.comments.length - left.comments.length;
      }
      return rankDiff;
    });
  };
  var sortByRandom = function (photos) {
    return window.util.shuffle(photos).slice(-RANDOM_PHOTO_NUMBER);
  };
  var sortByDiscussed = function (photos) {
    photos.sort(function (left, right) {
      var rankDiff = right.comments.length - left.comments.length;
      if (rankDiff === 0) {
        rankDiff = right.likes - left.likes;
      }
      return rankDiff;
    });
  };

  var updatePicture = function () {
    var filtredPicture = window.data.photos.slice();
    switch (activeFilter) {
      case (filterPopularBtn.getAttribute('id')):
        sortByPopular(filtredPicture);
        break;
      case (filterRandomBtn.getAttribute('id')):
        filtredPicture = sortByRandom(filtredPicture);
        break;
      case (filterDiscussedBtn.getAttribute('id')):
        sortByDiscussed(filtredPicture);
        break;
    }
    window.picture.render(filtredPicture);
  };
  var debounceUpdatePicture = window.debounce(updatePicture);

  window.filter = {
    show: function () {
      imgFiltersElement.classList.remove('img-filters--inactive');
    },
    updatePicture: updatePicture,
  };
})();
