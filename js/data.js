'use strict';

window.data = (function () {
  var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var picturesNumber = 25;
  var likesMin = 15;
  var likesMax = 200;

  var getPictures = function (arrSize) {
    var picturesList = [];
    for (var i = 0; i < arrSize; i++) {
      picturesList[i] = {
        url: 'photos/' + (i + 1) + '.jpg',
        likes: window.utils.getRandom(likesMin, likesMax),
        comments: COMMENTS[window.utils.getRandom(0, COMMENTS.length - 1)]
      };
    }
    return picturesList;
  };

  return {
    comments: COMMENTS,
    picturesNumber: picturesNumber,
    getPictures: getPictures
  };
})();
