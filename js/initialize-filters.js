'use strict';

window.initializeFilters = (function (filterbox, cb) {
  filterbox.addEventListener('click', function (evt) {
    if (evt.target.nodeName.toLowerCase() === 'input') {
      var filterInput = evt.target;
      cb('filter-' + filterInput.value);
    }
  });
});
