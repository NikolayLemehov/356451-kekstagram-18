'use strict';

(function () {
  var imgFiltersElement = document.querySelector('.img-filters');
  window.filter = {
    show: function () {
      imgFiltersElement.classList.remove('img-filters--inactive');
    }
  };
})();
