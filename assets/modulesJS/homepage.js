import {
  loginTime,
  sortUsers,
  loggedOut,
  loginUser,
  capitalizeUserName,
} from "./login.js";
import { getFromLocalStorage } from "./register.js";
import { monthlyProfit } from "./addShift.js";

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
const closeSearchBtn = document.getElementById("cancel-search-button");
const searchShiftsBtn = document.getElementById("search-button");

// edit shift

const addShiftHomepageForm = document.getElementById("add-shift-homepage-form");
const editShiftModal = document.getElementById("edit-shift-modal");
const closeEditShiftModal = document.getElementById("close-modal-btn");
const editShiftForm = document.getElementById("edit-shift-form");
const editShiftInputContainer = document.getElementById(
  "edit-shift-input-container"
);
const editDate = document.getElementById("edit-shift__date");
const editStartTime = document.getElementById("edit-shift__start-time");
const editEndTime = document.getElementById("edit-shift__end-time");
const editHourlyWage = document.getElementById("edit-hourly-wage");
const editWorkplace = document.getElementById("edit-workplace");
const editShiftName = document.getElementById("edit-shift-name");
const editCommentArea = document.getElementById("edit-shift-notes");

const updateShiftBtn = document.getElementById("update-shift-btn");
const deleteShiftBtn = document.getElementById("delete-shift-btn");
const confirmDeleteBtn = document.getElementById("confirm-delete__shift--btn");
const cancelDeleteBtn = document.getElementById("cancel-delete-btn");
const deleteShiftModal = document.getElementById("delete-shift-modal");
const editBtnContainer = document.getElementById("edit-buttons-container");

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
  shifts
    .sort((a, b) => {
      return b.shiftAddTime - a.shiftAddTime;
    })
    .forEach((shift) => {
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
      shiftRow.addEventListener("click", (e) => {
        // click event for every table row
        e.preventDefault();
        editDate.value = shift.shiftDate;
        editStartTime.value = shift.shiftStartTime;
        editEndTime.value = shift.shiftEndTime;
        editHourlyWage.value = shift.shiftHourlyWage;
        editWorkplace.value = shift.shiftWorkplace;
        editShiftName.value = shift.shiftName;
        editCommentArea.value = shift.shiftNotes;

        editShiftModal.setAttribute("aria-hidden", "false");
        editShiftInputContainer.setAttribute("aria-hidden", "false");
      });
    });
}

// update shift

function updateShift(e) {
  e.preventDefault();
  const users = getFromLocalStorage();
  const user = users.find((user) => {
    return user.loggedIn === true;
  }).shifts;
  const userIndex = user.findIndex((shift) => {
      return shift.shiftName === editShiftName.value;
    }),
    shift = {
      shiftDate: editDate.value,
      shiftYear: parseInt(editDate.value.split("-")[0]),
      shiftMonth: parseInt(editDate.value.split("-")[1]),
      shiftDay: parseInt(editDate.value.split("-")[2]),
      shiftStartTime: editStartTime.value,
      shiftEndTime: editEndTime.value,
      shiftHourlyWage: parseFloat(editHourlyWage.value),
      shiftWorkplace: editWorkplace.value,
      shiftName: editShiftName.value,
      shiftNotes: editCommentArea.value,
      shiftTotalProfit: calculateUpdatedProfit(
        editDate.value,
        editStartTime.value,
        editEndTime.value,
        editHourlyWage.value
      ),
      shiftAddTime: Date.now(),
    };
  user[userIndex] = shift;
  localStorage.setItem("users", JSON.stringify(users));
  monthlyProfit();
}

function checkForModalOpened() {
  if (editShiftModal) {
    updateShiftBtn.addEventListener("click", updateShift);
    deleteShiftBtn.addEventListener("click", openDeleteModal);
    closeEditShiftModal.addEventListener("click", closeEditModal);
    if (confirmDeleteBtn) {
      confirmDeleteBtn.addEventListener("click", deleteShift);
      cancelDeleteBtn.addEventListener("click", closeDeleteModal);
    }
  } else {
    return false;
  }
}

function closeEditModal() {
  editShiftModal.setAttribute("aria-hidden", "true");
}

function calculateUpdatedProfit() {
  const startTime = new Date(editDate.value + " " + editStartTime.value);
  let endTime = new Date(editDate.value + " " + editEndTime.value);

  const tomorrow = new Date(endTime);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (startTime.getTime() >= endTime.getTime()) {
    const totalTime = tomorrow.getTime() - startTime.getTime();
    const totalProfit =
      (totalTime / (60 * 60 * 1000)) *
      Math.round(editHourlyWage.value).toFixed(2);
    return parseFloat(totalProfit.toFixed(2));
  } else {
    const difference = endTime.getTime() - startTime.getTime();
    const totalProfit =
      (difference / 1000 / 60 / 60) *
      Math.round(editHourlyWage.value).toFixed(2);
    return parseFloat(totalProfit.toFixed(2));
  }
}

// Delete shift

function openDeleteModal(e) {
  e.preventDefault();
  deleteShiftModal.setAttribute("aria-hidden", "false");
  editShiftInputContainer.setAttribute("aria-hidden", "true");
  editBtnContainer.setAttribute("aria-hidden", "true");
}

function closeDeleteModal(e) {
  e.preventDefault();
  deleteShiftModal.setAttribute("aria-hidden", "true");
  editShiftInputContainer.setAttribute("aria-hidden", "false");
  editBtnContainer.setAttribute("aria-hidden", "false");
}

function deleteShift() {
  const users = getFromLocalStorage();
  const user = users.find((user) => {
    return user.loggedIn === true;
  }).shifts;
  const userIndex = user.findIndex((shift) => {
    return shift.shiftName === editShiftName.value;
  });
  user.splice(userIndex, 1);
  localStorage.setItem("users", JSON.stringify(users));
  monthlyProfit();
  deleteShiftModal.setAttribute("aria-hidden", "true");
  editShiftInputContainer.setAttribute("aria-hidden", "false");
  editBtnContainer.setAttribute("aria-hidden", "false");
  setTimeout(() => {
    window.location.reload();
  }, 900);
}

// display Table

function displayTable() {
  searchSection.setAttribute("aria-hidden", "true");
  tableSection.setAttribute("aria-hidden", "false");
  noShifts.setAttribute("aria-hidden", "true");
}

// Search shifts

function checkForSearchBtn() {
  if (openSearchBtn) {
    openSearchBtn.addEventListener("click", openSearchSection);
  } else {
    return false;
  }
}

function checkForSearchSection() {
  if (searchSection) {
    closeSearchBtn.addEventListener("click", closeSearchSection);
    searchShiftsBtn.addEventListener("click", searchShiftsByDate);
  } else {
    return false;
  }
}

function openSearchSection() {
  searchSection.setAttribute("aria-hidden", "false");
  tableSection.setAttribute("aria-hidden", "true");
  noShifts.setAttribute("aria-hidden", "true");
  addShiftHomepageForm.setAttribute("aria-hidden", "true");
  openSearchBtn.setAttribute("aria-hidden", "true");
}

function closeSearchSection() {
  searchSection.setAttribute("aria-hidden", "true");
  tableSection.setAttribute("aria-hidden", "false");
  noShifts.setAttribute("aria-hidden", "true");
  addShiftHomepageForm.setAttribute("aria-hidden", "false");
  openSearchBtn.setAttribute("aria-hidden", "false");
}

function searchShiftsByDate() {}

window.addEventListener("load", checkForModalOpened);

window.addEventListener("load", checkForSearchBtn);

window.addEventListener("load", checkForSearchSection);

export {
  logUserOut,
  checkIfLoggedIn,
  personalPages,
  checkIfUserHasShifts,
  tableSection,
};
