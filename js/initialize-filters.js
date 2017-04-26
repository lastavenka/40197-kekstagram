'use strict';

window.initializeFilters = (function (filterBox, cb) {
  filterBox.addEventListener('click', function (evt) {
    if (evt.target.nodeName.toLowerCase() === 'input') {
      var filterInput = evt.target;
      cb('filter-' + filterInput.value);
    }
  });
});
