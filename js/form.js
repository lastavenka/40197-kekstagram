'use strict';

(function () {
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadForm = document.querySelector('#upload-select-image');
  var uploadFile = uploadForm.elements.filename;
  var uploadCancel = uploadOverlay.querySelector('#upload-cancel');
  var uploadOverlayForm = document.querySelector('#upload-filter');
  var uploadComment = uploadOverlay.querySelector('.upload-form-description');
  var imagePreview = uploadOverlay.querySelector('.filter-image-preview');
  var filterControls = uploadOverlay.querySelector('.upload-filter-controls');
  var currentFilter;

  var onUploadOverlayOpen = function () {
    window.utils.hideElement(uploadForm);
    window.utils.showElement(uploadOverlay);
    document.addEventListener('keydown', function (evt) {
      window.utils.onEscPress(evt, onUploadOverlayClose);
    });
    uploadComment.addEventListener('invalid', window.utils.onError);
    uploadComment.addEventListener('keydown', window.utils.onTextareaFocus);
  };

  var onUploadOverlayClose = function () {
    window.utils.hideElement(uploadOverlay);
    window.utils.showElement(uploadForm);
    document.removeEventListener('keydown', function (evt) {
      window.utils.onEscPress(evt, onUploadOverlayClose);
    });
    uploadComment.removeEventListener('invalid', window.utils.onError);
    uploadComment.removeEventListener('keydown', window.utils.onTextareaFocus);
    setUploadDefault();
  };

  uploadFile.addEventListener('change', onUploadOverlayOpen);
  uploadCancel.addEventListener('click', onUploadOverlayClose);
  uploadCancel.addEventListener('keydown', function (evt) {
    window.utils.onEnterPress(evt, onUploadOverlayClose);
  });

  var setUploadDefault = function () {
    imagePreview.classList.remove(currentFilter);
    uploadOverlay.querySelector('.upload-resize-controls-value').value = '100%';
    imagePreview.removeAttribute('style');
    uploadComment.value = '';
    uploadOverlay.querySelector('#upload-filter-none').checked = true;
    filterLevelValue.style.width = '100%';
    window.utils.hideElement(filterLevel);
  };

  uploadOverlayForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    onUploadOverlayClose();
    setUploadDefault();
  });

  var resizeControlIncrease = uploadOverlay.querySelector('.upload-resize-controls-button-inc');
  var resizeControlDecrease = uploadOverlay.querySelector('.upload-resize-controls-button-dec');
  var resizeControl = uploadOverlay.querySelector('.upload-resize-controls-value');
  var resizeStep = 25;
  var resizeMin = 25;
  var resizeMax = 100;

  var onImageResize = function (value) {
    imagePreview.style.transform = 'scale(' + value / 100 + ')';
    resizeControl.value = value + '%';
  };

  window.initializeScale(resizeControlIncrease, resizeControlDecrease, resizeControl, resizeMin, resizeMax, resizeStep, onImageResize);

  var onFilterClick = function (filter) {
    imagePreview.classList.remove(currentFilter);
    if (filter !== 'filter-none') {
      currentFilter = filter;
      imagePreview.classList.add(currentFilter);
      window.utils.showElement(filterLevel);
      setDefaultFilterLevel();
    } else {
      window.utils.hideElement(filterLevel);
      imagePreview.style.filter = '';
    }
  };

  window.initializeFilters(filterControls, onFilterClick);

  var filterLevelPin = filterControls.querySelector('.upload-filter-level-pin');
  var filterLevelLine = filterControls.querySelector('.upload-filter-level-line');
  var filterLevelValue = filterControls.querySelector('.upload-filter-level-val');
  var filterLevel = filterControls.querySelector('.upload-filter-level');
  window.utils.hideElement(filterLevel);

  var onFilterLevelChange = function (evt) {
    evt.preventDefault();

    var startX = evt.clientX;
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = startX - moveEvt.clientX;
      startX = moveEvt.clientX;

      var leftEdge = filterLevelLine.offsetLeft - evt.target.offsetWidth;
      var rightEdge = filterLevelLine.offsetLeft + filterLevelLine.offsetWidth - evt.target.offsetWidth;

      if ((evt.target.offsetLeft - shift) < leftEdge) {
        evt.target.style.left = leftEdge + 'px';
      }

      if ((evt.target.offsetLeft - shift) > rightEdge) {
        evt.target.style.left = rightEdge + 'px';
      }

      var handleX = evt.target.offsetLeft - shift;
      evt.target.style.left = handleX + 'px';
      var level = handleX * 100 / filterLevelLine.offsetWidth;
      filterLevelValue.style.width = level + '%';
      setFilterLevel(level);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  filterLevelPin.addEventListener('mousedown', onFilterLevelChange);

  var setFilterLevel = function (level) {
    switch (currentFilter) {
      case 'filter-chrome':
        imagePreview.style.filter = 'grayscale(' + level / 100 + ')';
        break;
      case 'filter-sepia':
        imagePreview.style.filter = 'sepia(' + level / 100 + ')';
        break;
      case 'filter-marvin':
        imagePreview.style.filter = 'invert(' + level + '%)';
        break;
      case 'filter-phobos':
        imagePreview.style.filter = 'blur(' + level * 3 / 100 + 'px)';
        break;
      case 'filter-heat':
        imagePreview.style.filter = 'brightness(' + level * 3 / 100 + ')';
        break;
    }
  };

  var setDefaultFilterLevel = function () {
    filterLevelValue.style.width = '100%';
    filterLevelPin.style.left = filterLevelLine.offsetLeft + filterLevelLine.offsetWidth - filterLevelPin.offsetWidth + 'px';
    imagePreview.style.filter = '';
  };
})();
