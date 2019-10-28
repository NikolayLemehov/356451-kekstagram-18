'use strict';

(function () {
  var ShowedComment = {
    START: 0,
    STEP: 5,
  };
  var showedCommentsNumber = ShowedComment.START;
  var commentCollection;
  var socialCommentsElement = document.querySelector('.social__comments');
  var commentStyleDisplay = getComputedStyle(socialCommentsElement.querySelector('.social__comment')).display;

  var commentsShowElement = document.querySelector('.social__comment-count .comments-show');
  var loaderBtnElement = document.querySelector('.comments-loader');

  loaderBtnElement.addEventListener('click', function () {
    showCommentsInCollection(commentCollection);
  });

  var renderSocialComments = function (data) {
    var element = socialCommentsElement.querySelector('.social__comment').cloneNode(true);
    element.querySelector('.social__picture').src = data.avatar;
    element.querySelector('.social__picture').alt = data.name;
    element.querySelector('.social__text').textContent = data.message;
    element.style.display = 'none';
    return element;
  };

  var footerTextInputElement = document.querySelector('.social__footer-text');
  var showCommentsInCollection = function (collection) {
    var nextShowedComment = showedCommentsNumber + ShowedComment.STEP;
    if (collection.length > nextShowedComment) {
      for (var i = showedCommentsNumber; i < nextShowedComment; i++) {
        collection[i].style.display = commentStyleDisplay;
      }
      showedCommentsNumber = nextShowedComment;
      commentsShowElement.textContent = showedCommentsNumber;
    } else {
      for (var j = showedCommentsNumber; j < collection.length; j++) {
        collection[j].style.display = commentStyleDisplay;
      }
      showedCommentsNumber = collection.length;
      commentsShowElement.textContent = collection.length;
      loaderBtnElement.classList.add('hidden');
      footerTextInputElement.focus();
    }
  };

  var appendSocialComments = function (dataArray) {
    var fragment = document.createDocumentFragment();
    dataArray.forEach(function (it) {
      fragment.appendChild(renderSocialComments(it));
    });
    socialCommentsElement.innerHTML = '';
    socialCommentsElement.appendChild(fragment);
    commentCollection = socialCommentsElement.querySelectorAll('.social__comment');
    showCommentsInCollection(commentCollection);
  };

  window.comment = {
    add: appendSocialComments,
    reset: function () {
      loaderBtnElement.classList.remove('hidden');
      showedCommentsNumber = ShowedComment.START;
    },
  };
})();
