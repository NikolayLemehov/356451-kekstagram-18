'use strict';

(function () {
  var SHOWED_COMMENTS = {
    START: 0,
    STEP: 5,
  };
  var showedCommentsNumber = SHOWED_COMMENTS.START;
  var commentsCollection;
  var socialCommentsElement = document.querySelector('.social__comments');
  var displayStyleComment = getComputedStyle(socialCommentsElement.querySelector('.social__comment')).display;

  var commentsShowElement = document.querySelector('.social__comment-count .comments-show');
  var commentsLoaderBtn = document.querySelector('.comments-loader');

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
    if (collection.length > showedCommentsNumber + SHOWED_COMMENTS.STEP) {
      for (var i = showedCommentsNumber; i < showedCommentsNumber + SHOWED_COMMENTS.STEP; i++) {
        collection[i].style.display = displayStyleComment;
      }
      showedCommentsNumber += SHOWED_COMMENTS.STEP;
      commentsShowElement.textContent = showedCommentsNumber;
    } else {
      for (var j = showedCommentsNumber; j < collection.length; j++) {
        collection[j].style.display = displayStyleComment;
      }
      showedCommentsNumber = collection.length;
      commentsShowElement.textContent = collection.length;
      commentsLoaderBtn.classList.add('hidden');
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
    reset: function () {
      commentsLoaderBtn.classList.remove('hidden');
      showedCommentsNumber = SHOWED_COMMENTS.START;
    },
  };
})();
