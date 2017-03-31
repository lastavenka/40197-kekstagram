'use strict';

var COMMENTS = ['Всё отлично!',
                'В целом всё неплохо. Но не всё.',
                'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.',
                'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
                'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
                'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!'
               ];
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
      url: 'photos/' + (i+1) + '.jpg',
      likes: getRandom(likesMin, likesMax),
      comments: COMMENTS[getRandom(0, COMMENTS.length - 1)]
    };
  };
  return picturesList;
};

// Создание DOM-элемента на основе JS-объекта
var pictureTemplate = document.querySelector('#picture-template').content;
var renderPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);
  
  pictureElement.getElementsByTagName('img').src = picture.url;
  pictureElement.querySelector('.picture-likes').textContent = picture.likes;
  pictureElement.querySelector('.picture-comments').textContent = picture.comments;
  return pictureElement;
};

// Заполнение блока DOM-элементами на основе массива JS-объектов
var createPicturesList = function (arr, renderFunction, container) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderFunction(arr[i]));
  }
  container.appendChild(fragment);
};

var pictures = document.querySelector('.pictures');
createPicturesList(getPictures(picturesNumber), renderPicture, pictures);

var galleryOverlay = document.querySelector('.gallery-overlay');

galleryOverlay.classList.remove('invisible');
galleryOverlay.querySelector('.gallery-overlay-image').src = getPictures(picturesNumber)[0].url;
galleryOverlay.querySelector('.likes-count').textContent = getPictures(picturesNumber)[0].likes;
galleryOverlay.querySelector('.comments-count').textContent = getPictures(picturesNumber)[0].comments;
