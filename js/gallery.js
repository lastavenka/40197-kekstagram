'use strict';

window.gallery = (function () {
  var picturesGallery = document.querySelectorAll('.picture');

  for (var i = 0; i < picturesGallery.length; i++) {
    picturesGallery[i].addEventListener('click', function (evt) {
      evt.preventDefault();
      window.preview.openGalleryOverlay(evt);
    });

    picturesGallery[i].addEventListener('keydown', function (evt) {
      window.utils.onEnterPress(evt, window.preview.openGalleryOverlay);
    });
  }

  var closeGalleryOverlay = function () {
    var galleryOverlay = document.querySelector('.gallery-overlay');

    window.utils.hideElement(galleryOverlay);
    document.removeEventListener('keydown', function (evt) {
      window.utils.onEscPress(evt, window.closeGalleryOverlay);
    });
  };

  return {
    closeGalleryOverlay: closeGalleryOverlay
  };
})();
