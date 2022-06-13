import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let deadLine = null;

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  timer: document.querySelector('.timer'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const inputOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.failure('Please, choose a date in the future!');
      return;
    }
    refs.startBtn.removeAttribute('disabled');
    deadLine = selectedDates[0];
  },
};

flatpickr(refs.input, inputOptions);

// // --------------------
// // Version 1 - Таймер - это объект со свойствами отвечающими 
// // за целевое значение, текущее время и и идентификатор счетчика,
// // а также методами start и stop.
// // Метод start при вызове ожидает в параметрах строку в формате dateFormat
// // --------------------

// const timer = {
//   deadLine: null,
//   timeBeforeDeadLine: null,
//   intervalId: null,

//   start(dataStr) {
//     this.deadLine = Date.parse(dataStr);
//     refs.startBtn.setAttribute('disabled', 'true');
//     refs.input.setAttribute('disabled', 'true');

//     this.intervalId = setInterval(() => {
//       if (this.timeBeforeDeadLine < 1000 && this.timeBeforeDeadLine) {
//         this.stop();
//         return;
//       }

//       const currentTime = Date.now();
//       this.timeBeforeDeadLine = this.deadLine - currentTime;
//       updateClockFace(convertMs(this.timeBeforeDeadLine));

//       if (
//         this.timeBeforeDeadLine <= 10000 &&
//         this.timeBeforeDeadLine &&
//         refs.timer.style.color !== 'red'
//       ) {
//         refs.timer.style.color = 'red';
//       }
//     }, 1000);
//   },

//   stop() {
//     clearInterval(this.intervalId);
//     this.timeBeforeDeadLine = 0;
//     refs.input.removeAttribute('disabled');
//     refs.timer.style.color = 'inherit';
//   },
// };

// function updateClockFace({ days, hours, minutes, seconds }) {
//   refs.days.textContent = days;
//   refs.hours.textContent = hours;
//   refs.minutes.textContent = minutes;
//   refs.seconds.textContent = seconds;
// }

// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = addLeadingZero(Math.floor(ms / day));
//   // Remaining hours
//   const hours = addLeadingZero(Math.floor((ms % day) / hour));
//   // Remaining minutes
//   const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
//   // Remaining seconds
//   const seconds = addLeadingZero(
//     Math.floor((((ms % day) % hour) % minute) / second)
//   );

//   return { days, hours, minutes, seconds };
// }

// function addLeadingZero(value) {
//   return String(value).padStart(2, '0');
// }

// refs.startBtn.addEventListener('click', () => timer.start(deadLine));

// //--------------------
// // Version 2 - Таймер - это экземпляр класса CountdownTimer
// // (при создании экземпляра определяется функция обработки результата работы
// // счетчика, исходя из того, что результатом является объект
// // формата { days, hours, minutes, seconds }, а также объект ссылок на
// // основные html-элементы таймера - { input, startBtn, timer } 
// // для стилизации и деактивации на время работы таймера).
// // Метод start при вызове ожидает в параметрах строку в формате dateFormat
// //--------------------

class CountdownTimer {
  constructor(onTick, { input, startBtn, timer }) {
    this.deadLine = null;
    this.timeBeforeDeadLine = null;
    this.intervalId = null;
    this.onTick = onTick;

    this.refs = {
      input,
      startBtn,
      timer,
    };
  }

  start(dataStr) {
    this.deadLine = Date.parse(dataStr);

    this.refs.startBtn.setAttribute('disabled', 'true');
    this.refs.input.setAttribute('disabled', 'true');

    this.intervalId = setInterval(() => {
      if (this.timeBeforeDeadLine <= 1000 && this.timeBeforeDeadLine) {
        this.stop();
        return;
      }

      const currentTime = Date.now();
      this.timeBeforeDeadLine = this.deadLine - currentTime;
      this.onTick(this.convertMs(this.timeBeforeDeadLine));

      // Стилизация приближения к завершению отсчета времени
      if (
        this.timeBeforeDeadLine <= 10000 &&
        this.timeBeforeDeadLine &&
        this.refs.timer.style.color !== 'red'
      ) {
        this.refs.timer.style.color = 'red';
      }
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
    this.timeBeforeDeadLine = 0;

    this.refs.input.removeAttribute('disabled');
    this.refs.timer.style.color = 'inherit';
  }

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = this.addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.addLeadingZero(
      Math.floor(((ms % day) % hour) / minute)
    );
    // Remaining seconds
    const seconds = this.addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  }

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new CountdownTimer(updateClockFace, {
  input: refs.input,
  startBtn: refs.startBtn,
  timer: refs.timer,
});

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}

refs.startBtn.addEventListener('click', () => timer.start(deadLine));
