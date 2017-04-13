'use strict';

window.preview = (function () {
  var openGalleryOverlay = function (evt) {
    var galleryOverlay = document.querySelector('.gallery-overlay');

    var setGalleryOverlay = function () {
      galleryOverlay.querySelector('.gallery-overlay-image').src = evt.currentTarget.querySelector('img').src;
      galleryOverlay.querySelector('.likes-count').textContent = evt.currentTarget.querySelector('.picture-likes').textContent;
      galleryOverlay.querySelector('.comments-count').textContent = evt.currentTarget.querySelector('.picture-comments').textContent;
    };
    setGalleryOverlay();

    window.utils.showElement(galleryOverlay);
    document.addEventListener('keydown', function (e) {
      window.utils.onEscPress(e, window.gallery.closeGalleryOverlay);
    });
  };

  document.querySelector('.gallery-overlay-close').addEventListener('click', window.gallery.closeGalleryOverlay);
  document.querySelector('.gallery-overlay-close').addEventListener('keydown', function (evt) {
    window.utils.onEnterPress(evt, window.gallery.closeGalleryOverlay);
  });

  return {
    openGalleryOverlay: openGalleryOverlay
  };
})();
