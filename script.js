// script.js
let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let laps = [];

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const clearLapsBtn = document.getElementById('clearLapsBtn');
const lapList = document.getElementById('lapList');

startStopBtn.addEventListener('click', startStop);
lapBtn.addEventListener('click', recordLap);
resetBtn.addEventListener('click', reset);
clearLapsBtn.addEventListener('click', clearLaps);

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 1);
        startStopBtn.innerHTML = 'Stop';
        running = true;
    } else {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        startStopBtn.innerHTML = 'Start';
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    display.innerHTML = '00:00:00:000';
    startStopBtn.innerHTML = 'Start';
    running = false;
    difference = 0;
    laps = [];
    renderLaps();
}

function recordLap() {
    if (running) {
        laps.push(display.innerHTML);
        renderLaps();
    }
}

function clearLaps() {
    laps = [];
    renderLaps();
}

function renderLaps() {
    lapList.innerHTML = '';
    laps.forEach((lap, index) => {
        const li = document.createElement('li');
        li.innerText = `Lap ${index + 1}: ${lap}`;
        lapList.appendChild(li);
    });
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000));

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 100) ? "0" + milliseconds : milliseconds;
    milliseconds = (milliseconds < 10) ? "00" + milliseconds : milliseconds;

    display.innerHTML = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}
