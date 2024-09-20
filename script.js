let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapCounter = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function formatTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateDisplay();
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

startStopBtn.addEventListener('click', () => {
    if (isRunning) {
        stopTimer();
        startStopBtn.textContent = 'Start';
    } else {
        startTimer();
        startStopBtn.textContent = 'Stop';
    }
    isRunning = !isRunning;
});

resetBtn.addEventListener('click', () => {
    stopTimer();
    elapsedTime = 0;
    updateDisplay();
    isRunning = false;
    startStopBtn.textContent = 'Start';
    laps.innerHTML = '';
    lapCounter = 0;
});

lapBtn.addEventListener('click', () => {
    if (isRunning) {
        const lapTime = document.createElement('li');
        lapTime.textContent = `Lap ${++lapCounter}: ${formatTime(elapsedTime)}`;
        laps.appendChild(lapTime);
    }
});

updateDisplay();
