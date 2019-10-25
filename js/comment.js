'use strict';

(function () {
  var ShowedComment = {
    START: 0,
    STEP: 5,
  };
  var showedCommentsNumber = ShowedComment.START;
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

  var socialFooterTextInput = document.querySelector('.social__footer-text');
  var showCommentsInCollection = function (collection) {
    var nextShowedComment = showedCommentsNumber + ShowedComment.STEP;
    if (collection.length > nextShowedComment) {
      for (var i = showedCommentsNumber; i < nextShowedComment; i++) {
        collection[i].style.display = displayStyleComment;
      }
      showedCommentsNumber = nextShowedComment;
      commentsShowElement.textContent = showedCommentsNumber;
    } else {
      for (var j = showedCommentsNumber; j < collection.length; j++) {
        collection[j].style.display = displayStyleComment;
      }
      showedCommentsNumber = collection.length;
      commentsShowElement.textContent = collection.length;
      commentsLoaderBtn.classList.add('hidden');
      socialFooterTextInput.focus();
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
      showedCommentsNumber = ShowedComment.START;
    },
  };
})();
