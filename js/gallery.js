'use strict';

window.gallery = (function () {

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
