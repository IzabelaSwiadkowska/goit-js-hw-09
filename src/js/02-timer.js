/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const selector = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const daysValue = document.querySelector('span[data-days]');
const hoursValue = document.querySelector('span[data-hours]');
const minutesValue = document.querySelector('span[data-minutes]');
const secondsValue = document.querySelector('span[data-seconds]');
let timerId = null;
let chosenDate = null;

btnStart.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.failure('Please choose a date in the future');
    } else {
      btnStart.disabled = false;
      chosenDate = selectedDates[0].getTime();
    }
  },
};

flatpickr(selector, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
function countdown() {
  timerId = setInterval(() => {
    btnStart.disabled = true;
    let difference = chosenDate - new Date();
    if (difference > 0) {
      let convertedTime = convertMs(difference);
      daysValue.textContent = addLeadingZero(convertedTime.days);
      hoursValue.textContent = addLeadingZero(convertedTime.hours);
      minutesValue.textContent = addLeadingZero(convertedTime.minutes);
      secondsValue.textContent = addLeadingZero(convertedTime.seconds);
    } else {
      Notify.success('Countdown finised');
      clearInterval(timerId);
    }
  }, 1000);
}
btnStart.addEventListener('click', countdown);
