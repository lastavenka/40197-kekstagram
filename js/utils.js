'use strict';

window.utils = (function () {
  var ENTER_KEY_CODE = 13;
  var ESCAPE_KEY_CODE = 27;

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
      element.classList.remove('invisible');
    },

    hideElement: function (element) {
      element.classList.add('invisible');
    },

    getRandom: function (min, max) {
      var rand = min + Math.random() * (max + 1 - min);
      rand = Math.floor(rand);
      return rand;
    },

    setInvalidBorder: function (evt) {
      evt.target.style.outlineColor = 'red';
    },

    stopBubbling: function (evt) {
      evt.stopPropagation();
    }
  };
})();
