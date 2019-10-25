'use strict';

(function () {
  var SUCCESS_CODE = 200;
  var MAXIMUM_EXPECTATION = 10000;
  var addServerListener = function (xhr, onSuccess, onError) {
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = MAXIMUM_EXPECTATION;
  };
  window.backend = {
    load: function (onSuccess, onError) {
      var URL = 'https://js.dump.academy/kekstagram/data';
      var xhr = new XMLHttpRequest();
      addServerListener(xhr, onSuccess, onError);
      xhr.open('GET', URL);
      xhr.send();
    },
    save: function (data, onSuccess, onError) {
      var URL = 'https://js.dump.academy/kekstagram';
      var xhr = new XMLHttpRequest();
      addServerListener(xhr, onSuccess, onError);
      xhr.open('POST', URL);
      xhr.send(data);
    },
  };
})();
