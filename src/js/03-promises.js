import { Notify } from 'notiflix/build/notiflix-notify-aio';

refs = {
  submitBtn: document.querySelector('[type="submit"]'),
  amountInput: document.querySelector('[name="amount"]'),
  delayInput: document.querySelector('[name="delay"]'),
  stepInput: document.querySelector('[name="step"]'),
};

refs.submitBtn.addEventListener('click', onClickHandler);

function onClickHandler(e) {
  e.preventDefault();
  const amount = parseInt(refs.amountInput.value);
  let delay = parseInt(refs.delayInput.value);
  const step = parseInt(refs.stepInput.value);

  for (let i = 0; i < amount; i += 1) {
    const currentDelay = delay + step * i;
    const position = i + 1;
    createPromise(position, currentDelay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
