var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},o=e.parcelRequired7c6;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in n){var o=n[e];delete n[e];var r={id:e,exports:{}};return t[e]=r,o.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){n[e]=t},e.parcelRequired7c6=o);var r=o("iQIUW");function i(e,t){const n=Math.random()>.3;return new Promise(((o,r)=>{setTimeout((()=>{n?o({position:e,delay:t}):r({position:e,delay:t})}),t)}))}refs={submitBtn:document.querySelector('[type="submit"]'),amountInput:document.querySelector('[name="amount"]'),delayInput:document.querySelector('[name="delay"]'),stepInput:document.querySelector('[name="step"]')},refs.submitBtn.addEventListener("click",(function(e){e.preventDefault();const t=parseInt(refs.amountInput.value);let n=parseInt(refs.delayInput.value);const o=parseInt(refs.stepInput.value);for(let e=0;e<t;e+=1){i(e+1,n+o*e).then((({position:e,delay:t})=>{r.Notify.success(`Fulfilled promise ${e} in ${t}ms`)})).catch((({position:e,delay:t})=>{r.Notify.failure(`Rejected promise ${e} in ${t}ms`)}))}}));
//# sourceMappingURL=03-promises.2a010647.js.map
