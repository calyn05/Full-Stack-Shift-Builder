import {
  loginTime,
  sortUsers,
  loggedOut,
  loginUser,
  capitalizeUserName,
} from "./login.js";
import { getFromLocalStorage } from "./register.js";

const userNameText = document.getElementById("homepage-username");
const personalPages = [
  "/pages/homepage.html",
  "/pages/profile.html",
  "/pages/add-shift.html",
];
const noShifts = document.getElementById("no-shifts");
const searchSection = document.getElementById("search-section");
const searchByNameForm = document.getElementById("search-by-name");
const searchOptions = document.getElementById("search-options");
const searchByDateForm = document.getElementById("search-by-date");
const tableSection = document.getElementById("table-section");
const openSearchBtn = document.getElementById("open-search-btn");

// Check if the user is logged in
function checkIfLoggedIn() {
  const users = getFromLocalStorage();
  const user = users.find((user) => {
    return user.loggedIn === true;
  });
  if (user) {
    userNameText.innerText = user.username;
    personalPages.forEach((page) => {
      if (page === window.location.pathname) {
        const inactivityTime = loginTime;
        let timeOut = setTimeout(logUserOut, inactivityTime);
        window.addEventListener("load", () => {
          clearTimeout(timeOut);
          timeOut = setTimeout(logUserOut, inactivityTime);
        });
      }
    });
  } else {
    window.location.href = "../index.html";
  }
}

// Log the user out
function logUserOut() {
  const users = getFromLocalStorage();
  const user = users.find((user) => {
    return user.loggedIn === true;
  });
  if (user) {
    user.loggedIn = false;
    sortUsers(users);
    loggedOut(users);
    localStorage.setItem("users", JSON.stringify(users));
    window.location.href = "../index.html";
  }
}

//check if user has shifts added
function checkIfUserHasShifts() {
  const users = getFromLocalStorage();
  const shifts = users.find((user) => {
    return user.loggedIn === true;
  }).shifts;
  if (shifts.length > 0) {
    addShiftsToTable(shifts);
    displayTable();
  } else {
    tableSection.setAttribute("aria-hidden", "true");
    noShifts.setAttribute("aria-hidden", "false");
    openSearchBtn.setAttribute("aria-hidden", "true");
  }
}

// Add shifts to table

function addShiftsToTable(shifts) {
  const tableBody = document.getElementById("table-body");
  shifts.forEach((shift) => {
    const shiftRow = document.createElement("tr");
    shiftRow.innerHTML = `
    <td>${shift.shiftDate}</td>
    <td>${shift.shiftName}</td>
    <td>${shift.shiftStartTime}</td>
    <td>${shift.shiftEndTime}</td>
    <td>${shift.shiftHourlyWage}</td>
    <td>${shift.shiftWorkplace}</td>
    <td>${shift.shiftTotalProfit}</td>
    `;
    tableBody.appendChild(shiftRow);
  });
}

// display Table

function displayTable() {
  searchSection.setAttribute("aria-hidden", "true");
  tableSection.setAttribute("aria-hidden", "false");
  noShifts.setAttribute("aria-hidden", "true");
}

export { logUserOut, checkIfLoggedIn, personalPages, checkIfUserHasShifts };
