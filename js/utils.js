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

    onEscPress: function (evt, applyFunction) {
      if (isKeyboardEvent(evt) && evt.keyCode === ESCAPE_KEY_CODE) {
        applyFunction();
      }
    },

    onEnterPress: function (evt, applyFunction) {
      if (isKeyboardEvent(evt) && evt.keyCode === ENTER_KEY_CODE) {
        applyFunction(evt);
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
      var randomValue = min + Math.random() * (max + 1 - min);
      randomValue = Math.floor(randomValue);
      return randomValue;
    },

    onError: function (evt) {
      evt.target.style.outlineColor = 'red';
    },

    onTextareaFocus: function (evt) {
      if (isKeyboardEvent(evt) && evt.keyCode === ESCAPE_KEY_CODE) {
        evt.stopPropagation();
      }
    },

    debounce: function (applyFunction, waitingInterval, immediateCalling) {
      if (!timeout) {
        applyFunction();
        immediateCalling = true;
      }

      timeout = true;

      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }

      lastTimeout = setTimeout(function () {
        if (!immediateCalling) {
          applyFunction();
        }
        timeout = false;
      }, waitingInterval);
    }
  };
})();
