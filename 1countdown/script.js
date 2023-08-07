const days = document.getElementById("days");
const hours = document.getElementById("hours");
const mins = document.getElementById("mins");
const secs = document.getElementById("secs");
const currentDate = document.querySelector(".current-date");
// const FutureDate = document.querySelector(".Future-date");

function startCountDown(){
  const TargetDate = new Date(currentDate.value);
    countdown(TargetDate);  
}

function updateCountdown(deadline) {
  const currentDate = new Date();  
  finalTime = deadline - currentDate;
  // finaltime is in miliseconds now calculate days hours mins secs

  let finalSec = Math.floor(finalTime / 1000) % 60;
  let finalMins = Math.floor(finalTime / 1000 / 60) % 60;
  let finalHours = Math.floor(finalTime / 1000 / 60 / 60) % 24;
  let finalDays = Math.floor(finalTime / 1000 / 60 / 60 / 24);

  days.textContent = finalDays;
  hours.textContent = finalHours;
  mins.textContent = finalMins;
  secs.textContent = finalSec;
}

function countdown(date) {
  setInterval(() => updateCountdown(date), 1000);
}
function ResetCountDown(){
  window.location.reload();
}

// const targetDate = new Date("JANUARY 01 2026");
// countdown(targetDate);
