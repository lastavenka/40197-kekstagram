'use strict';

var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!'];
var picturesNumber = 25;
var likesMin = 15;
var likesMax = 200;

function getRandom(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

var getPictures = function (arrSize) {
  var picturesList = [];

  for (var i = 0; i < arrSize; i++) {
    picturesList[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandom(likesMin, likesMax),
      comments: COMMENTS[getRandom(0, COMMENTS.length - 1)]
    };
  }
  return picturesList;
};

var pictureTemplate = document.querySelector('#picture-template').content;
var renderPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('img').src = picture.url;
  pictureElement.querySelector('.picture-likes').textContent = picture.likes;
  pictureElement.querySelector('.picture-comments').textContent = COMMENTS.length;
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
createPicturesList(getPictures(picturesNumber), renderPicture, pictures);

var uploadOverlay = document.querySelector('.upload-overlay');
uploadOverlay.classList.add('invisible');

var uploadForm = document.querySelector('#upload-select-image');
uploadForm.classList.remove('invisible');

var picturesGallery = document.querySelectorAll('.picture');
var galleryOverlay = document.querySelector('.gallery-overlay');
var galleryClose = galleryOverlay.querySelector('.gallery-overlay-close');
var uploadFile = uploadForm.elements.filename;
var uploadCancel = uploadOverlay.querySelector('#upload-cancel');
var uploadSubmit = uploadOverlay.querySelector('#upload-submit');

var ENTER_KEY_CODE = 13;
var isActivationEvent = function (evt) {
  return evt.keyCode === ENTER_KEY_CODE;
};

var onEscPress = function (evt) {
  if (evt.keyCode === 27) {
    closeGalleryOverlay();
    var uploadComment = uploadOverlay.querySelector('.upload-form-description');
    if (document.activeElement !== uploadComment) {
      closeUploadOverlay();
    }
  }
};

var openGalleryOverlay = function () {
  galleryOverlay.classList.remove('invisible');
  document.addEventListener('keydown', onEscPress);
};

var closeGalleryOverlay = function () {
  galleryOverlay.classList.add('invisible');
  document.removeEventListener('keydown', onEscPress);
};

var setGalleryOverlay = function (evt) {
  galleryOverlay.querySelector('.gallery-overlay-image').src = evt.currentTarget.querySelector('img').src;
  galleryOverlay.querySelector('.likes-count').textContent = evt.currentTarget.querySelector('.picture-likes').textContent;
  galleryOverlay.querySelector('.comments-count').textContent = evt.currentTarget.querySelector('.picture-comments').textContent;
};

for (var i = 0; i < picturesGallery.length; i++) {
  picturesGallery[i].addEventListener('click', function (evt) {
    evt.preventDefault();
    setGalleryOverlay(evt);
    openGalleryOverlay();
  });

  picturesGallery[i].addEventListener('keydown', function (evt) {
    evt.preventDefault();
    if (isActivationEvent(evt)) {
      setGalleryOverlay(evt);
      openGalleryOverlay();
    }
  });
}

galleryClose.addEventListener('click', function () {
  closeGalleryOverlay();
});

galleryClose.addEventListener('keydown', function (evt) {
  if (isActivationEvent(evt)) {
    closeGalleryOverlay();
  }
});

var openUploadOverlay = function () {
  uploadForm.classList.add('invisible');
  uploadOverlay.classList.remove('invisible');
  document.addEventListener('keydown', onEscPress);
};

var closeUploadOverlay = function () {
  uploadForm.classList.remove('invisible');
  uploadOverlay.classList.add('invisible');
  document.removeEventListener('keydown', onEscPress);
};

uploadFile.addEventListener('change', function () {
  openUploadOverlay();
});

uploadCancel.addEventListener('click', function () {
  closeUploadOverlay();
});

uploadCancel.addEventListener('keydown', function (evt) {
  if (isActivationEvent(evt)) {
    closeUploadOverlay();
  }
});

uploadSubmit.addEventListener('click', function () {
  closeUploadOverlay();
});

uploadSubmit.addEventListener('keydown', function (evt) {
  if (isActivationEvent(evt)) {
    closeUploadOverlay();
  }
});
