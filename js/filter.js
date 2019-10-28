'use strict';

(function () {
  var RANDOM_PHOTO_NUMBER = 10;
  var imgFiltersElement = document.querySelector('.img-filters');
  var filterPopularBtnElement = imgFiltersElement.querySelector('#filter-popular');
  var filterRandomBtnElement = imgFiltersElement.querySelector('#filter-random');
  var filterDiscussedBtnElement = imgFiltersElement.querySelector('#filter-discussed');

  var activeFilterId = filterPopularBtnElement.getAttribute('id');
  var switchFilter = function (btnElement) {
    if (btnElement.getAttribute('id') !== activeFilterId) {
      btnElement.classList.add('img-filters__button--active');
      imgFiltersElement.querySelector('#' + activeFilterId)
        .classList.remove('img-filters__button--active');
      activeFilterId = btnElement.getAttribute('id');
    }
  };

  filterPopularBtnElement.addEventListener('click', function () {
    switchFilter(filterPopularBtnElement);
    debounceUpdatePicture();
  });
  filterRandomBtnElement.addEventListener('click', function () {
    switchFilter(filterRandomBtnElement);
    debounceUpdatePicture();
  });
  filterDiscussedBtnElement.addEventListener('click', function () {
    switchFilter(filterDiscussedBtnElement);
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
    switch (activeFilterId) {
      case (filterPopularBtnElement.getAttribute('id')):
        sortByPopular(filtredPicture);
        break;
      case (filterRandomBtnElement.getAttribute('id')):
        filtredPicture = sortByRandom(filtredPicture);
        break;
      case (filterDiscussedBtnElement.getAttribute('id')):
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
