import { getFromLocalStorage } from "./register.js";

// add shift to user

const addShiftForm = document.getElementById("add-shift__form");

function addShift(e) {
  e.preventDefault();
  const users = getFromLocalStorage();
  const user = users.find((user) => {
    return user.loggedIn === true;
  }).shifts;
  const shift = {
    shiftDate: document.getElementById("add-shift__date").value,
    shiftStartTime: document.getElementById("add-shift__start-time").value,
    shiftEndTime: document.getElementById("add-shift__end-time").value,
    shiftHourlyWage: document.getElementById("hourly-wage").value,
    shiftWorkplace: document.getElementById("workplace").value,
    shiftName: document.getElementById("shift-name").value,
    shiftNotes: document.getElementById("shift-notes").value,
    shiftTotalProfit: calculateTotalProfit(),
  };
  user.push(shift);
  localStorage.setItem("users", JSON.stringify(users));
  //   setTimeout(() => {
  //     window.location.href = "../pages/homepage.html";
  //   }, 2000);
}

function calculateTotalProfit() {
  const startDate = document.getElementById("add-shift__date").value;
  const hourlyWage = document.getElementById("hourly-wage").value;
  const shiftStartTime = document.getElementById("add-shift__start-time").value;
  const shiftEndTime = document.getElementById("add-shift__end-time").value;

  const startTime = new Date(startDate + " " + shiftStartTime);
  let endTime = new Date(startDate + " " + shiftEndTime);

  const tomorrow = new Date(endTime);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (startTime.getTime() >= endTime.getTime()) {
    const totalTime = tomorrow.getTime() - startTime.getTime();
    const totalProfit = (totalTime / (60 * 60 * 1000)) * hourlyWage;
    return totalProfit;
  } else {
    const difference = endTime.getTime() - startTime.getTime();
    const totalProfit = (difference / 1000 / 60 / 60) * hourlyWage;
    return totalProfit;
  }
}

export { addShift, addShiftForm };
