!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},t={},o=e.parcelRequired7c6;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in t){var o=t[e];delete t[e];var r={id:e,exports:{}};return n[e]=r,o.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,n){t[e]=n},e.parcelRequired7c6=o);var r=o("h6c0i");function i(e,n){var t=Math.random()>.3;return new Promise((function(o,r){setTimeout((function(){t?o({position:e,delay:n}):r({position:e,delay:n})}),n)}))}refs={submitBtn:document.querySelector('[type="submit"]'),amountInput:document.querySelector('[name="amount"]'),delayInput:document.querySelector('[name="delay"]'),stepInput:document.querySelector('[name="step"]')},refs.submitBtn.addEventListener("click",(function(e){e.preventDefault();for(var n=parseInt(refs.amountInput.value),t=parseInt(refs.delayInput.value),o=parseInt(refs.stepInput.value),u=0;u<n;u+=1){i(u+1,t+o*u).then((function(e){var n=e.position,t=e.delay;r.Notify.success("Fulfilled promise ".concat(n," in ").concat(t,"ms"))})).catch((function(e){var n=e.position,t=e.delay;r.Notify.failure("Rejected promise ".concat(n," in ").concat(t,"ms"))}))}}))}();
//# sourceMappingURL=03-promises.6bd6037d.js.map