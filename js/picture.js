'use strict';

(function () {
  var renderPicture = function (picture) {
    var pictureElement = document.querySelector('#picture-template').content.cloneNode(true);

    pictureElement.querySelector('img').src = picture.url;
    pictureElement.querySelector('.picture-likes').textContent = picture.likes;
    pictureElement.querySelector('.picture-comments').textContent = window.data.comments.length;
    return pictureElement;
  };

  var createPicturesList = function (arr, renderFunction, container) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(renderFunction(arr[i]));
    }
    container.appendChild(fragment);
  };

  var pictures = document.querySelector('.pictures');
  createPicturesList(window.data.getPictures(window.data.picturesNumber), renderPicture, pictures);
})();
