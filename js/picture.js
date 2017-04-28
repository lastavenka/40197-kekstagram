'use strict';

(function () {
  var URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/kekstagram/data';
  var pictures = [];
  var DEBOUNCE_INTERVAL = 500;

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
        window.preview.onPreviewOpen(evt);
      });

      item.addEventListener('keydown', function (evt) {
        window.utils.onEnterPress(evt, window.preview.onGalleryOverlayOpen);
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

  var onFilterClick = function (evt) {
    var picturesList = [];
    var newPicturesCount = 10;
    var FILTER_VALUES = {
      new: 'new',
      popular: 'popular',
      discussed: 'discussed'
    };
    var sortRandom = function () {
      return Math.random() - 0.5;
    };
    var sortCompare = function (picture1, picture2) {
      if (picture2.comments.length !== picture1.comments.length) {
        return (picture2.comments.length - picture1.comments.length);
      }
      return (picture2.likes - picture1.likes);
    };

    switch (evt.target.value) {
      case FILTER_VALUES.popular:
        picturesList = pictures;
        break;
      case FILTER_VALUES.new:
        picturesList = pictures.slice().sort(sortRandom).slice(0, newPicturesCount);
        break;
      case FILTER_VALUES.discussed:
        picturesList = pictures.slice().sort(sortCompare);
        break;
    }

    window.utils.debounce(function () {
      renderPictures(picturesList);
    }, DEBOUNCE_INTERVAL);
  };

  document.querySelector('.filters').addEventListener('click', function (evt) {
    if (evt.target.nodeName === 'INPUT') {
      onFilterClick(evt);
    }
  });
})();
