let interval;
let startTime;
let accumulatedTime = 0;
let isRunning = false;
let lapCounter = 1;

function displayTime(ms) {
  const minutes = Math.floor((ms / 60000) % 60).toString().padStart(2, '0');
  const seconds = Math.floor((ms / 1000) % 60).toString().padStart(2, '0');
  const milliseconds = Math.floor((ms % 1000) / 10).toString().padStart(2, '0');
  return `${minutes}:${seconds}:${milliseconds}`;
}

function updateDisplay() {
  const currentTime = Date.now() - startTime + accumulatedTime;
  document.getElementById('display').textContent = displayTime(currentTime);
}

function startStop() {
  const startButton = document.querySelector('.btn:nth-child(1)');
  if (isRunning) {
    clearInterval(interval);
    accumulatedTime += Date.now() - startTime;
    isRunning = false;
    startButton.textContent = 'Start';
  } else {
    startTime = Date.now() - accumulatedTime;
    interval = setInterval(updateDisplay, 10);
    isRunning = true;
    startButton.textContent = 'Pause';
  }
}

function reset() {
  clearInterval(interval);
  isRunning = false;
  accumulatedTime = 0;
  document.querySelector('.btn:nth-child(1)').textContent = 'Start';
  document.getElementById('display').textContent = '00:00:00';
  document.getElementById('lapTimes').textContent = '';
  lapCounter = 1;
}

function lap() {
  if (isRunning) {
    const currentTime = Date.now() - startTime + accumulatedTime;
    const lapTime = displayTime(currentTime);
    const lapTimesElement = document.getElementById('lapTimes');
    const lapElement = document.createElement('p');
    lapElement.textContent = `Lap ${lapCounter}: ${lapTime}`;
    lapTimesElement.appendChild(lapElement);
    lapCounter++;
  }
}
