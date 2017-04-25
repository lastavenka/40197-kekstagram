'use strict';

window.preview = (function () {
  var onGalleryOverlayOpen = function (evt) {
    var galleryOverlay = document.querySelector('.gallery-overlay');

    var setGalleryOverlay = function () {
      galleryOverlay.querySelector('.gallery-overlay-image').src = evt.currentTarget.querySelector('img').src;
      galleryOverlay.querySelector('.likes-count').textContent = evt.currentTarget.querySelector('.picture-likes').textContent;
      galleryOverlay.querySelector('.comments-count').textContent = evt.currentTarget.querySelector('.picture-comments').textContent;
    };
    setGalleryOverlay();

    window.utils.showElement(galleryOverlay);
    document.addEventListener('keydown', function (e) {
      window.utils.onEscPress(e, window.gallery.onGalleryOverlayClose);
    });
  };

  var galleryOverlayCloseButton = document.querySelector('.gallery-overlay-close');
  galleryOverlayCloseButton.addEventListener('click', window.gallery.onGalleryOverlayClose);
  galleryOverlayCloseButton.addEventListener('keydown', function (evt) {
    window.utils.onEnterPress(evt, window.gallery.onGalleryOverlayClose);
  });

  return {
    onGalleryOverlayOpen: onGalleryOverlayOpen
  };
})();
