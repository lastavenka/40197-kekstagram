'use strict';

window.preview = (function () {
  var onPreviewOpen = function (evt) {
    var preview = document.querySelector('.gallery-overlay');

    var setPreview = function () {
      preview.querySelector('.gallery-overlay-image').src = evt.currentTarget.querySelector('img').src;
      preview.querySelector('.likes-count').textContent = evt.currentTarget.querySelector('.picture-likes').textContent;
      preview.querySelector('.comments-count').textContent = evt.currentTarget.querySelector('.picture-comments').textContent;
    };
    setPreview();

    window.utils.showElement(preview);
    document.addEventListener('keydown', function (e) {
      window.utils.onEscPress(e, window.gallery.onPreviewClose);
    });
  };

  var previewCloseButton = document.querySelector('.gallery-overlay-close');
  previewCloseButton.addEventListener('click', window.gallery.onPreviewClose);
  previewCloseButton.addEventListener('keydown', function (evt) {
    window.utils.onEnterPress(evt, window.gallery.onPreviewClose);
  });

  return {
    onPreviewOpen: onPreviewOpen
  };
})();
