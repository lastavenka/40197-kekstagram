'use strict';

(function () {
  var URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/kekstagram/data';
  var pictures = [];

  var getPictureData = function (picture) {
    var pictureElement = document.querySelector('#picture-template').content.cloneNode(true);

    pictureElement.querySelector('img').src = picture.url;
    pictureElement.querySelector('.picture-likes').textContent = picture.likes;
    pictureElement.querySelector('.picture-comments').textContent = picture.comments.length;
    return pictureElement;
  };

  var renderPictures = function (data) {
    var picturesContainer = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();

    picturesContainer.innerHTML = '';
    data.forEach(function (item) {
      fragment.appendChild(getPictureData(item));
    });
    picturesContainer.appendChild(fragment);

    var picturesGallery = document.querySelectorAll('.picture');

    picturesGallery.forEach(function (item) {
      item.addEventListener('click', function (evt) {
        evt.preventDefault();
        window.preview.openGalleryOverlay(evt);
      });

      item.addEventListener('keydown', function (evt) {
        window.utils.onEnterPress(evt, window.preview.openGalleryOverlay);
      });
    });
  };

  var onError = function (errorMessage) {
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

  var onLoad = function (data) {
    pictures = data;
    renderPictures(pictures);
    window.utils.showElement(document.querySelector('.filters'));
  };

  window.load(URL, onLoad, onError);

  var showPopularPictures = function () {
    renderPictures(pictures);
  };

  var showNewPictures = function () {
    var sortRandom = function () {
      return Math.random() - 0.5;
    };
    var newPictures = pictures.slice().sort(sortRandom).slice(0, 10);

    renderPictures(newPictures);
  };

  var showDiscussedPictures = function () {
    var sortCompare = function (a, b) {
      var shift = b.comments.length - a.comments.length;
      return shift;
    };
    var discussedPictures = pictures.slice().sort(sortCompare);

    renderPictures(discussedPictures);
  };

  document.querySelector('.filters').addEventListener('click', function (evt) {
    switch (evt.target.value) {
      case 'popular':
        window.utils.debounce(showPopularPictures);
        break;
      case 'new':
        window.utils.debounce(showNewPictures);
        break;
      case 'discussed':
        window.utils.debounce(showDiscussedPictures);
        break;
    }
  });
})();
