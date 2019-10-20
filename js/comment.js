'use strict';

(function () {
  var socialCommentsElement = document.querySelector('.social__comments');
  var renderSocialComments = function (data) {
    var socialCommentElement = socialCommentsElement.querySelector('.social__comment').cloneNode(true);
    socialCommentElement.querySelector('.social__picture').src = data.avatar;
    socialCommentElement.querySelector('.social__picture').alt = data.name;
    socialCommentElement.querySelector('.social__text').textContent = data.message;
    return socialCommentElement;
  };

  var appendSocialComments = function (dataArray) {
    var fragment = document.createDocumentFragment();
    for (var item = 0; item < dataArray.length; item++) {
      fragment.appendChild(renderSocialComments(dataArray[item]));
    }
    while (socialCommentsElement.firstChild) {
      socialCommentsElement.removeChild(socialCommentsElement.firstChild);
    }
    socialCommentsElement.appendChild(fragment);
  };

  window.comment = {
    add: appendSocialComments,
  };
})();
