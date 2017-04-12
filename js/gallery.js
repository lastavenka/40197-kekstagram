'use strict';

(function () {
  var picturesGallery = document.querySelectorAll('.picture');

  for (var i = 0; i < picturesGallery.length; i++) {
    picturesGallery[i].addEventListener('click', function (evt) {
      evt.preventDefault();
      window.openGalleryOverlay(evt);
    });

    picturesGallery[i].addEventListener('keydown', function (evt) {
      window.utils.onEnterPress(evt, window.openGalleryOverlay);
    });
  }
})();
