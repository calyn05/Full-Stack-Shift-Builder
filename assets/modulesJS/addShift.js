import { getFromLocalStorage } from "./register.js";

const profileImageAddShift = document.getElementById("profile-image-add-shift");

// add shift to user

const addShiftForm = document.getElementById("add-shift__form");
const addShiftBtn = document.getElementById("ad-shift-submit-btn");
const addShiftText = document.getElementById("shift-added-text");
const addShiftMainContainer = document.getElementById("add-shift-main");
const tableDataProfitMonth = document.getElementById("highest-profit");

const date = document.getElementById("add-shift__date");
const startTime = document.getElementById("add-shift__start-time");
const endTime = document.getElementById("add-shift__end-time");

function showProfileImageAddShift() {
  const users = getFromLocalStorage();
  const userLoggedIn = users.find((user) => {
    return user.loggedIn === true;
  });
  profileImageAddShift.src = userLoggedIn.image;
}

// Verify dates are not already in use

function checkDateAndTime() {
  const users = getFromLocalStorage();
  const user = users.find((user) => {
    return user.loggedIn === true;
  });
  const userShifts = user.shifts;
  const shiftsDate = userShifts.find((shift) => {
    return shift.shiftDate === date;
  });
  console.log(shiftsDate);
}
window.addEventListener("load", () => {
  if (addShiftForm) {
    addShiftForm.addEventListener("submit", (e) => {
      e.preventDefault();
      checkDateAndTime();
    });
  }
});

function addShift(e) {
  e.preventDefault();
  const users = getFromLocalStorage();
  const user = users.find((user) => {
    return user.loggedIn === true;
  }).shifts;
  const shift = {
    shiftDate: document.getElementById("add-shift__date").value,
    shiftYear: parseInt(
      document.getElementById("add-shift__date").value.split("-")[0]
    ),
    shiftMonth: parseInt(
      document.getElementById("add-shift__date").value.split("-")[1]
    ),
    shiftDay: parseInt(
      document.getElementById("add-shift__date").value.split("-")[2]
    ),
    shiftStartTime: document.getElementById("add-shift__start-time").value,
    shiftEndTime: document.getElementById("add-shift__end-time").value,
    shiftHourlyWage: parseFloat(document.getElementById("hourly-wage").value),
    shiftWorkplace: document.getElementById("workplace").value,
    shiftName: document.getElementById("shift-name").value,
    shiftNotes: document.getElementById("shift-notes").value,
    shiftTotalProfit: calculateTotalProfit(),
    shiftAddTime: Date.now(),
  };
  setTimeout(() => {
    addShiftMainContainer.classList.add("screen-reader");
  }, 500);
  setTimeout(() => {
    addShiftText.classList.remove("screen-reader");
  }, 800);
  user.push(shift);
  localStorage.setItem("users", JSON.stringify(users));
  setTimeout(() => {
    window.location.href = "../pages/homepage.html";
  }, 2000);
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
    const totalProfit =
      (totalTime / (60 * 60 * 1000)) * Math.round(hourlyWage).toFixed(2);
    return parseFloat(totalProfit.toFixed(2));
  } else {
    const difference = endTime.getTime() - startTime.getTime();
    const totalProfit =
      (difference / 1000 / 60 / 60) * Math.round(hourlyWage).toFixed(2);
    return parseFloat(totalProfit.toFixed(2));
  }
}

function monthlyProfit() {
  const users = getFromLocalStorage();
  const user = users.find((user) => {
    return user.loggedIn === true;
  });
  const shifts = user.shifts;
  const profitPerMonth = {
    year: [],
    month: [],
    profit: [],
  };
  for (let i = 0; i < shifts.length; i++) {
    if (
      profitPerMonth.year.includes(shifts[i].shiftYear) &&
      profitPerMonth.month.includes(shifts[i].shiftMonth)
    ) {
      if (profitPerMonth.month.includes(shifts[i].shiftMonth)) {
        profitPerMonth.profit[
          profitPerMonth.year.indexOf(shifts[i].shiftYear)
        ].push(shifts[i].shiftTotalProfit);
      } else {
        profitPerMonth.month.push(shifts[i].shiftMonth);
        profitPerMonth.profit[
          profitPerMonth.year.indexOf(shifts[i].shiftYear)
        ].push(shifts[i].shiftTotalProfit);
      }
    } else {
      profitPerMonth.year.push(shifts[i].shiftYear);
      profitPerMonth.month.push(shifts[i].shiftMonth);
      profitPerMonth.profit.push([shifts[i].shiftTotalProfit]);
    }
  }

  let highestProfit = 0;
  let highestProfitYear = 0;
  let highestProfitMonth = 0;

  profitPerMonth.profit.forEach((profit, index) => {
    let totalProfit = 0;
    profit.forEach((profit) => {
      totalProfit += profit;
    });
    if (totalProfit > highestProfit) {
      highestProfit = totalProfit.toFixed(2);
      highestProfitYear = profitPerMonth.year[index];
      highestProfitMonth = profitPerMonth.month[index];
    }
  });

  user.mostProfitableMonth = {
    year: highestProfitYear,
    month: highestProfitMonth,
    profit: highestProfit,
  };

  user.monthlyProfits = {
    month: profitPerMonth.month,
    profit: profitPerMonth.profit,
  };
  localStorage.setItem("users", JSON.stringify(users));

  const dateString = highestProfitYear + "-" + highestProfitMonth;
  const date = new Date(dateString);
  const month = date.toLocaleString("default", { month: "long" });

  const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(highestProfit);

  tableDataProfitMonth.innerHTML = `
  ${month} - ${highestProfitYear} earning ${currency}
    `;
}

export {
  addShift,
  addShiftForm,
  monthlyProfit,
  profileImageAddShift,
  showProfileImageAddShift,
};
