import { getFromLocalStorage } from "./register.js";
import { defaultProfileImage } from "./uploadPhoto.js";

const profileImageAddShift = document.getElementById("profile-image-add-shift");

// add shift to user

const addShiftForm = document.getElementById("add-shift__form");
const addShiftBtn = document.getElementById("add-shift-submit-btn");
const addShiftText = document.getElementById("shift-added-text");
const addShiftMainContainer = document.getElementById("add-shift-main");
const tableDataProfitMonth = document.getElementById("highest-profit");

const selectDateLabel = document.getElementById("select-date-label");
const uniqueNameLabel = document.getElementById("unique-name-label");

const inputDate = document.getElementById("add-shift__date");
const workLocationInput = document.getElementById("workplace");
const name = document.getElementById("shift-name");

const workplaceList = document.getElementById("workplace-options__list");
const workplaceOptionsContainer = document.getElementById("workplace-options");

function showProfileImageAddShift() {
  const users = getFromLocalStorage();
  const userLoggedIn = users.find((user) => {
    return user.loggedIn === true;
  });
  if (!userLoggedIn.image) {
    profileImageAddShift.src = defaultProfileImage;
  } else {
    profileImageAddShift.src = userLoggedIn.image;
  }
}

// Verify dates are not already in use and a unique name is used

function checkDate() {
  const users = getFromLocalStorage();
  const user = users.find((user) => {
    return user.loggedIn === true;
  });
  const userShifts = user.shifts;
  const dates = userShifts.map((shift) => {
    return shift.shiftDate;
  });

  if (dates.includes(inputDate.value)) {
    selectDateLabel.innerText = "You already have a shift at this date";
    selectDateLabel.style.color = "red";
    addShiftBtn.disabled = true;
  } else {
    selectDateLabel.innerText = "Select date";
    selectDateLabel.style.color = "var(--main-txt__color)";
    addShiftBtn.disabled = false;
  }
}

function checkUniqueName() {
  const users = getFromLocalStorage();
  const user = users.find((user) => {
    return user.loggedIn === true;
  });
  const userShifts = user.shifts;
  const names = userShifts.map((shift) => {
    return shift.shiftName;
  });
  if (name.value.length > 2) {
    if (names.includes(name.value)) {
      addShiftBtn.disabled = true;
      uniqueNameLabel.innerText = " Not unique";
      uniqueNameLabel.style.color = "red";
      return false;
    } else {
      uniqueNameLabel.innerText = "Unique";
      uniqueNameLabel.style.color = "green";
      addShiftBtn.disabled = false;
      return true;
    }
  }
}

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
  localStorage.setItem("users", JSON.stringify(users));

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

// Add shift workplace to workplace select

function addWorkplace() {
  const users = getFromLocalStorage();
  const user = users.find((user) => {
    return user.loggedIn === true;
  });

  const shifts = user.shifts;
  const workplaces = [];
  for (let i = 0; i < shifts.length; i++) {
    if (!workplaces.includes(shifts[i].shiftWorkplace)) {
      workplaces.push(shifts[i].shiftWorkplace);
    } else {
      continue;
    }
  }

  for (let i = 0; i < workplaces.length; i++) {
    const option = document.createElement("li");

    option.innerHTML = `
    <li>${workplaces[i]}</li>
    `;
    workplaceList.appendChild(option);
    workplaceOptionsContainer.setAttribute("aria-hidden", "false");
    option.addEventListener("click", () => {
      workplace.value = workplaces[i];
      workplaceOptionsContainer.setAttribute("aria-hidden", "true");
    });

    window.addEventListener("click", (e) => {
      if (e.target !== workplace) {
        workplaceOptionsContainer.setAttribute("aria-hidden", "true");
        option.remove();
      }
    });
  }
}

export {
  addShift,
  addShiftForm,
  monthlyProfit,
  profileImageAddShift,
  showProfileImageAddShift,
  checkUniqueName,
  checkDate,
  name,
  inputDate,
  addWorkplace,
  workLocationInput,
};
