'use strict';

(function () {
  var SHOWED_COMMENTS_STEP = 5;
  var showedCommentsNumber = 0;
  var commentsCollection;
  var socialCommentsElement = document.querySelector('.social__comments');
  var displayStyleComment = getComputedStyle(socialCommentsElement.querySelector('.social__comment')).display;

  var commentsShowElement = document.querySelector('.social__comment-count .comments-show');
  var commentsLoaderBtn = document.querySelector('.comments-loader');
  var displayStyleLoaderBtn = getComputedStyle(commentsLoaderBtn).display;

  commentsLoaderBtn.addEventListener('click', function () {
    showCommentsInCollection(commentsCollection);
  });

  var renderSocialComments = function (data) {
    var socialCommentElement = socialCommentsElement.querySelector('.social__comment').cloneNode(true);
    socialCommentElement.querySelector('.social__picture').src = data.avatar;
    socialCommentElement.querySelector('.social__picture').alt = data.name;
    socialCommentElement.querySelector('.social__text').textContent = data.message;
    socialCommentElement.style.display = 'none';
    return socialCommentElement;
  };

  var showCommentsInCollection = function (collection) {
    if (collection.length > showedCommentsNumber + SHOWED_COMMENTS_STEP) {
      for (var i = showedCommentsNumber; i < showedCommentsNumber + SHOWED_COMMENTS_STEP; i++) {
        collection[i].style.display = displayStyleComment;
      }
      showedCommentsNumber += SHOWED_COMMENTS_STEP;
      commentsShowElement.textContent = showedCommentsNumber;
    } else {
      for (var j = showedCommentsNumber; j < collection.length; j++) {
        collection[j].style.display = displayStyleComment;
      }
      showedCommentsNumber = 0;
      commentsShowElement.textContent = collection.length;
      commentsLoaderBtn.style.display = 'none';
    }
  };

  var appendSocialComments = function (dataArray) {
    var fragment = document.createDocumentFragment();
    dataArray.forEach(function (it) {
      fragment.appendChild(renderSocialComments(it));
    });
    socialCommentsElement.innerHTML = '';
    socialCommentsElement.appendChild(fragment);
    commentsCollection = socialCommentsElement.querySelectorAll('.social__comment');
    showCommentsInCollection(commentsCollection);
  };

  window.comment = {
    add: appendSocialComments,
    showLoaderBtn: function () {
      commentsLoaderBtn.style.display = displayStyleLoaderBtn;
    },
  };
})();
