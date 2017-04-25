'use strict';

window.utils = (function () {
  var ENTER_KEY_CODE = 13;
  var ESCAPE_KEY_CODE = 27;
  var timeout;
  var lastTimeout;

  var isKeyboardEvent = function (evt) {
    return typeof evt.keyCode !== 'undefined';
  };

  return {
    isKeyboardEvent: isKeyboardEvent,

    onEscPress: function (evt, func) {
      if (isKeyboardEvent(evt) && evt.keyCode === ESCAPE_KEY_CODE) {
        func();
      }
    },

    onEnterPress: function (evt, func) {
      if (isKeyboardEvent(evt) && evt.keyCode === ENTER_KEY_CODE) {
        func(evt);
      }
    },

    showElement: function (element) {
      if (element.classList.contains('invisible')) {
        element.classList.remove('invisible');
      } else {
        element.classList.remove('hidden');
      }
    },

    hideElement: function (element) {
      element.classList.add('invisible');
    },

    getRandom: function (min, max) {
      var rand = min + Math.random() * (max + 1 - min);
      rand = Math.floor(rand);
      return rand;
    },

    onError: function (evt) {
      evt.target.style.outlineColor = 'red';
    },

    stopBubbling: function (evt) {
      if (isKeyboardEvent(evt) && evt.keyCode === ESCAPE_KEY_CODE) {
        evt.stopPropagation();
      }
    },

    debounce: function (func, wait, immediate) {
      if (!timeout) {
        func();
        immediate = true;
      }

      timeout = true;

      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }

      lastTimeout = setTimeout(function () {
        if (!immediate) {
          func();
        }
        timeout = false;
      }, wait);
    }
  };
})();
