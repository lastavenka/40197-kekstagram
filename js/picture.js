'use strict';

(function () {
  var URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/kekstagram/data';
  var renderPicture = function (picture) {
    var pictureElement = document.querySelector('#picture-template').content.cloneNode(true);

    pictureElement.querySelector('img').src = picture.url;
    pictureElement.querySelector('.picture-likes').textContent = picture.likes;
    pictureElement.querySelector('.picture-comments').textContent = picture.comments.length;
    return pictureElement;
  };

  var createPicturesList = function (pictures) {
    var picturesContainer = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pictures.length; i++) {
      fragment.appendChild(renderPicture(pictures[i]));
    }
    picturesContainer.appendChild(fragment);

    var picturesGallery = document.querySelectorAll('.picture');

    for (var f = 0; f < picturesGallery.length; f++) {
      picturesGallery[f].addEventListener('click', function (evt) {
        evt.preventDefault();
        window.preview.openGalleryOverlay(evt);
      });

      picturesGallery[f].addEventListener('keydown', function (evt) {
        window.utils.onEnterPress(evt, window.preview.openGalleryOverlay);
      });
    }
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.style.color = 'white';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load.loadPictures(URL, createPicturesList, errorHandler);
})();
