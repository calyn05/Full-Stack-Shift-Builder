import { loadingModal } from "./modulesJS/loadingModal.js";
import {
  localStorageColorTheme,
  toggleColorTheme,
  colorThemeSelection,
  removeThemeText,
} from "./modulesJS/colorTheme.js";
import { registerForm, registerUser } from "./modulesJS/register.js";
import { loginForm, loginUser } from "./modulesJS/login.js";
import {
  updateProfileForm,
  getUserFromLocalStorage,
  confirmInputVisible,
  updatePassword,
} from "./modulesJS/profile.js";
import {
  checkIfLoggedIn,
  personalPages,
  logUserOut,
  checkIfUserHasShifts,
  tableSection,
  showHomepageProfileImage,
  homepageProfileImage,
} from "./modulesJS/homepage.js";
import {
  addShift,
  addShiftForm,
  monthlyProfit,
  showProfileImageAddShift,
  profileImageAddShift,
  checkUniqueName,
  checkDate,
  inputDate,
  name,
  addWorkplace,
  workLocationInput,
} from "./modulesJS/addShift.js";
import {
  profileImageUpload,
  profileImage,
  imageToBase64,
  showProfileImage,
} from "./modulesJS/uploadPhoto.js";

window.addEventListener("load", loadingModal);
window.addEventListener("DOMContentLoaded", localStorageColorTheme);
colorThemeSelection.addEventListener("click", toggleColorTheme);

// Mobile nav toggle

const mobileNavBtn = document.querySelector(".mobile-nav__toggle");

function toggleMobileNav() {
  const mobileNav = document.querySelector("#primary-navigation");
  if (mobileNavBtn.getAttribute("aria-expanded") === "false") {
    mobileNavBtn.setAttribute("aria-expanded", "true");
    mobileNav.setAttribute("data-visible", "true");
  } else {
    mobileNavBtn.setAttribute("aria-expanded", "false");
    mobileNav.setAttribute("data-visible", "false");
  }
}

function checkMobileNav() {
  if (mobileNavBtn) {
    mobileNavBtn.addEventListener("click", toggleMobileNav);
  } else {
    return;
  }
}

window.addEventListener("DOMContentLoaded", checkMobileNav);

// Register user

function checkRegisterForm() {
  if (registerForm) {
    registerForm.addEventListener("submit", registerUser);
  } else {
    return;
  }
}

window.addEventListener("DOMContentLoaded", checkRegisterForm);

// Login user

function checkLoginForm() {
  if (loginForm) {
    loginForm.addEventListener("submit", loginUser);
  } else {
    return;
  }
}

window.addEventListener("DOMContentLoaded", checkLoginForm);

// show password

const showPassword = document.querySelectorAll(".show-password");
showPassword.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const password = e.target.previousElementSibling;
    if (password.getAttribute("type") === "password") {
      password.setAttribute("type", "text");
      btn.innerText = "Hide";
    } else {
      password.setAttribute("type", "password");
      btn.innerText = "Show";
    }
  });
});

// Homepage

function checkPersonalPages() {
  personalPages.forEach((page) => {
    if (window.location.pathname === page) {
      checkIfLoggedIn();
    }
  });
}

window.addEventListener("DOMContentLoaded", checkPersonalPages);
window.addEventListener("load", () => {
  if (window.location.pathname === "/pages/homepage.html") {
    checkIfUserHasShifts();
  } else {
    return;
  }
});

// Log out user

function checkLogOutBtn() {
  const logOutBtn = document.querySelector("#log-out-btn");
  if (logOutBtn) {
    logOutBtn.addEventListener("click", () => {
      logUserOut();
    });
  } else {
    return;
  }
}

window.addEventListener("DOMContentLoaded", checkLogOutBtn);

// Update profile

function checkUpdateProfileForm() {
  if (updateProfileForm) {
    getUserFromLocalStorage();
  } else {
    return;
  }
}

function checkInputPasswordVisible() {
  if (updatePassword) {
    updatePassword.addEventListener("click", confirmInputVisible);
  } else {
    return;
  }
}

window.addEventListener("DOMContentLoaded", checkInputPasswordVisible);
window.addEventListener("DOMContentLoaded", checkUpdateProfileForm);
window.addEventListener("load", removeThemeText);

// Add shift

function checkAddShiftForm() {
  if (addShiftForm) {
    inputDate.addEventListener("keyup", checkDate);
    inputDate.addEventListener("change", checkDate);
    name.addEventListener("keyup", checkUniqueName);
    workLocationInput.addEventListener("focus", addWorkplace);
    addShiftForm.addEventListener("submit", addShift);
  } else {
    return;
  }
}

window.addEventListener("DOMContentLoaded", checkAddShiftForm);

// check for table

function checkMonthlyProfit() {
  if (tableSection) {
    monthlyProfit();
  } else {
    return;
  }
}

window.addEventListener("DOMContentLoaded", checkMonthlyProfit);

// Upload profile image

function checkProfileImageUpload() {
  if (profileImageUpload) {
    profileImageUpload.addEventListener("change", imageToBase64);
  } else {
    return;
  }
}

function checkForProfileImage() {
  if (profileImage) {
    window.onload = showProfileImage();
  } else {
    return;
  }
}

function checkForAddShiftProfileImg() {
  if (profileImageAddShift) {
    window.onload = showProfileImageAddShift();
  } else {
    return;
  }
}

function checkForHomepageProfileImg() {
  if (homepageProfileImage) {
    window.onload = showHomepageProfileImage();
  } else {
    return;
  }
}

window.addEventListener("DOMContentLoaded", checkProfileImageUpload);
window.addEventListener("DOMContentLoaded", checkForProfileImage);
window.addEventListener("DOMContentLoaded", checkForAddShiftProfileImg);
window.addEventListener("DOMContentLoaded", checkForHomepageProfileImg);
