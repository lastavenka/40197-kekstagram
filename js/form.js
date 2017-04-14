'use strict';

(function () {
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadForm = document.querySelector('#upload-select-image');
  var uploadFile = uploadForm.elements.filename;
  var uploadCancel = uploadOverlay.querySelector('#upload-cancel');
  var uploadOverlayForm = document.querySelector('#upload-filter');
  var uploadComment = uploadOverlay.querySelector('.upload-form-description');
  var imagePreview = uploadOverlay.querySelector('.filter-image-preview');
  var resizeControls = uploadOverlay.querySelector('.upload-resize-controls');
  var filterControls = uploadOverlay.querySelector('.upload-filter-controls');
  var currentFilter;

  var openUploadOverlay = function () {
    uploadForm.classList.add('invisible');
    uploadOverlay.classList.remove('invisible');
    document.addEventListener('keydown', function (evt) {
      window.utils.onEscPress(evt, closeUploadOverlay);
    });
    uploadComment.addEventListener('invalid', window.utils.setInvalidBorder);
  };

  var closeUploadOverlay = function () {
    uploadForm.classList.remove('invisible');
    uploadOverlay.classList.add('invisible');
    document.removeEventListener('keydown', function (evt) {
      window.utils.onEscPress(evt, closeUploadOverlay);
    });
    uploadComment.removeEventListener('invalid', window.utils.setInvalidBorder);
  };

  uploadFile.addEventListener('change', openUploadOverlay);
  uploadCancel.addEventListener('click', closeUploadOverlay);
  uploadCancel.addEventListener('keydown', function (evt) {
    window.utils.onEnterPress(evt, closeUploadOverlay);
  });

  var setUploadDefault = function () {
    imagePreview.classList.remove(currentFilter);
    uploadOverlay.querySelector('.upload-resize-controls-value').value = '100%';
    imagePreview.removeAttribute('style');
    uploadComment.value = '';
    uploadOverlay.querySelector('#upload-filter-none').checked = true;
  };

  uploadOverlayForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    closeUploadOverlay();
    setUploadDefault();
  });

  uploadComment.addEventListener('keydown', function (evt) {
    window.utils.onEscPress(evt, window.utils.stopBubbling);
  });

  var addFilter = function (filter) {
    imagePreview.classList.remove(currentFilter);
    if (filter !== 'none') {
      currentFilter = filter;
      imagePreview.classList.add(currentFilter);
    }
  };

  filterControls.addEventListener('click', function (evt) {
    if (evt.target.nodeName.toLowerCase() === 'input') {
      var filterInput = evt.target;
      addFilter('filter-' + filterInput.value);
    }
  });

  var resizeImage = function (evt) {
    var resizeControlInc = uploadOverlay.querySelector('.upload-resize-controls-button-inc');
    var resizeControlDec = uploadOverlay.querySelector('.upload-resize-controls-button-dec');
    var resizeValue = uploadOverlay.querySelector('.upload-resize-controls-value');

    switch (evt.target) {
      case resizeControlInc:
        if (resizeValue.value !== '100%') {
          resizeValue.value = parseInt(resizeValue.value, 10) + 25 + '%';
        }
        break;
      case resizeControlDec:
        if (resizeValue.value !== '25%') {
          resizeValue.value = parseInt(resizeValue.value, 10) - 25 + '%';
        }
        break;
    }

    imagePreview.style.transform = 'scale(' + parseInt(resizeValue.value, 10) / 100 + ')';
  };

  resizeControls.addEventListener('click', function (evt) {
    if (evt.target.nodeName.toLowerCase() === 'button') {
      resizeImage(evt);
    }
  });
})();
