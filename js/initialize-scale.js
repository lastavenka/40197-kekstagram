'use strict';

window.initializeScale = function (controlInc, controlDec, scaleValue, min, max, step, callback) {
  controlInc.addEventListener('click', function () {
    var currentValue = parseInt(scaleValue.value, 10);
    if (currentValue !== max) {
      currentValue += step;
    }
    callback(currentValue);
  });

  controlDec.addEventListener('click', function () {
    var currentValue = parseInt(scaleValue.value, 10);
    if (currentValue !== min) {
      currentValue -= step;
    }
    callback(currentValue);
  });
};
