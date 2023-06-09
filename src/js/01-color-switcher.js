/* eslint-disable no-unused-vars */
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const body = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;

startBtn.addEventListener('click', () => {
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startBtn.disabled = true;
  stopBtn.disabled = false;
  startBtn.style.cursor = 'default';
  stopBtn.style.cursor = 'pointer';
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
  startBtn.style.cursor = 'pointer';
  stopBtn.style.cursor = 'default';
});
