'use strict';

window.gallery = (function () {
  var onPreviewClose = function () {
    var preview = document.querySelector('.gallery-overlay');

    window.utils.hideElement(preview);
    document.removeEventListener('keydown', function (evt) {
      window.utils.onEscPress(evt, window.onPreviewClose);
    });
  };

  return {
    onPreviewClose: onPreviewClose
  };
})();
