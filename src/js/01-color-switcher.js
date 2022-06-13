const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let intervalId = null;
let isActive = false;

startBtn.addEventListener('click', startColorSwitcher);
stopBtn.addEventListener('click', stopColorSwitcher);

function startColorSwitcher() { 
   isActive = true;
   startBtn.setAttribute('disabled', 'true') 
   intervalId = setInterval(changeColor, 1000);
}

function stopColorSwitcher() {
    if (!isActive) {
        return;
    };
    isActive = false;
    clearInterval(intervalId);
    startBtn.removeAttribute('disabled');
};

function changeColor() {
    document.body.style.backgroundColor = getRandomHexColor()
};

function getRandomHexColor() {
return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};