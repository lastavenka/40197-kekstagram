'use strict';

(function () {
  var createPicturesList = function (arr, renderFunction, container) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(renderFunction(arr[i]));
    }
    container.appendChild(fragment);
  };

  var pictures = document.querySelector('.pictures');
  var picturesNumber = 25;
  createPicturesList(window.getPictures(picturesNumber), window.renderPicture, pictures);
})();
