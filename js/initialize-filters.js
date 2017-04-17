'use strict';

window.initializeFilters = (function (filterbox, callback) {
  filterbox.addEventListener('click', function (evt) {
    if (evt.target.nodeName.toLowerCase() === 'input') {
      var filterInput = evt.target;
      callback('filter-' + filterInput.value);
    }
  });
});
