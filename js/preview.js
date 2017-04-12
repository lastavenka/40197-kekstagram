'use strict';

window.openGalleryOverlay = function (evt) {
  var galleryOverlay = document.querySelector('.gallery-overlay');

  (function () {
    galleryOverlay.querySelector('.gallery-overlay-image').src = evt.currentTarget.querySelector('img').src;
    galleryOverlay.querySelector('.likes-count').textContent = evt.currentTarget.querySelector('.picture-likes').textContent;
    galleryOverlay.querySelector('.comments-count').textContent = evt.currentTarget.querySelector('.picture-comments').textContent;
  })(evt);

  window.utils.showElement(galleryOverlay);
  document.addEventListener('keydown', function (e) {
    window.utils.onEscPress(e, window.closeGalleryOverlay);
  });
};

window.closeGalleryOverlay = function () {
  var galleryOverlay = document.querySelector('.gallery-overlay');

  window.utils.hideElement(galleryOverlay);
  document.removeEventListener('keydown', function (evt) {
    window.utils.onEscPress(evt, window.closeGalleryOverlay);
  });
};

document.querySelector('.gallery-overlay-close').addEventListener('click', window.closeGalleryOverlay);
document.querySelector('.gallery-overlay-close').addEventListener('keydown', function (evt) {
  window.utils.onEnterPress(evt, window.closeGalleryOverlay);
});
