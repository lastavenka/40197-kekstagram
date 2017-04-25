'use strict';

window.initializeScale = function (controlInc, controlDec, scaleValue, min, max, step, cb) {
  controlInc.addEventListener('click', function () {
    var currentValue = parseInt(scaleValue.value, 10);
    if (currentValue !== max) {
      currentValue += step;
    }
    cb(currentValue);
  });

  controlDec.addEventListener('click', function () {
    var currentValue = parseInt(scaleValue.value, 10);
    if (currentValue !== min) {
      currentValue -= step;
    }
    cb(currentValue);
  });
};
