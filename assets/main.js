import "../assets/style.css";

import { loadingModal } from "./modulesJS/loadingModal.js";
import {
  localStorageColorTheme,
  toggleColorTheme,
  colorThemeSelection,
  removeThemeText,
} from "./modulesJS/colorTheme.js";
import {
  registerForm,
  registerUser,
  registerEmail,
  userName,
  age,
  firstName,
  lastName,
  password,
  confirmPassword,
  validatePassword,
  validateConfirmPassword,
  validateEmail,
  validateUsername,
  validateAge,
  validateFirstName,
  validateLastName,
  checkEmail,
  checkUsername,
} from "./modulesJS/register.js";
import {
  loginForm,
  loginUser,
  logInAdmin,
  loginEmail,
  loginPassword,
  checkAdminState,
} from "./modulesJS/login.js";
import {
  updateProfileForm,
  getUserFromLocalStorage,
  confirmInputVisible,
  updatePassword,
  validateUpdatePassword,
  validateUpdateConfirmPassword,
  validateUpdateUsername,
  validateUpdateAge,
  validateUpdateFirstName,
  validateUpdateLastName,
  updateEmail,
  updateUsername,
  updateAge,
  updateFirstName,
  updateLastName,
  updateConfirmPassword,
  checkUpdateUsername,
  updateProfileBtn,
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
  loadDefaultUserImage,
} from "./modulesJS/uploadPhoto.js";

import {
  getAdminFromLocalStorage,
  logOutAdmin,
  adminLogOutBtn,
  checkAdminMessages,
  adminUsernameContainer,
  openMessageList,
  checkForMessageConfirmation,
  requestResetEmail,
  requestResetForm,
  displayUsers,
  adminPageUserImage,
  displayUserImages,
  closeMessagesBoxBtn,
} from "./modulesJS/admin.js";

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
    registerEmail.addEventListener("change", checkEmail);
    registerEmail.addEventListener("input", validateEmail);
    confirmPassword.addEventListener("input", validateConfirmPassword);
    userName.addEventListener("input", validateUsername);
    userName.addEventListener("change", checkUsername);
    age.addEventListener("input", validateAge);
    firstName.addEventListener("input", validateFirstName);
    lastName.addEventListener("input", validateLastName);
    password.addEventListener("input", validatePassword);
    confirmPassword.addEventListener("input", validatePassword);
  } else {
    return;
  }
}

window.addEventListener("DOMContentLoaded", checkRegisterForm);

// Login user

function checkLoginForm() {
  if (loginForm) {
    loginForm.addEventListener("submit", loginUser);
    getAdminFromLocalStorage();
    loginEmail.addEventListener("input", () => {
      if (loginEmail.value === "admin") {
        loginPassword.addEventListener("input", () => {
          if (loginPassword.value === "admin") {
            logInAdmin();
          }
        });
      }
    });
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
      loadDefaultUserImage();
    }
  });
}

window.addEventListener("DOMContentLoaded", checkPersonalPages);
window.addEventListener("load", () => {
  if (window.location.pathname === "/pages/homepage.html") {
    checkIfUserHasShifts();
    window.onload = showHomepageProfileImage();
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
    window.onload = showProfileImage();
    updateEmail.disabled = true;
    getUserFromLocalStorage();
    updateProfileBtn.setAttribute("disabled", "true");
    updateUsername.addEventListener("input", validateUpdateUsername);
    updateUsername.addEventListener("input", checkUpdateUsername);
    updateAge.addEventListener("input", validateUpdateAge);
    updateFirstName.addEventListener("input", validateUpdateFirstName);
    updateLastName.addEventListener("input", validateUpdateLastName);
    updatePassword.addEventListener("input", validateUpdatePassword);
    profileImageUpload.addEventListener("change", imageToBase64);
    if (updateConfirmPassword) {
      updateConfirmPassword.addEventListener(
        "input",
        validateUpdateConfirmPassword
      );
    }
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
    window.onload = showProfileImageAddShift();
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

// Admin page

function checkAdminPage() {
  if (window.location.pathname === "/pages/admin.html") {
    adminLogOutBtn.addEventListener("click", logOutAdmin);
    checkAdminState();
    checkAdminMessages();
    displayUsers();
    adminUsernameContainer.addEventListener("click", () => {
      openMessageList();
    });
    window.onload = displayUserImages();
    if (closeMessagesBoxBtn) {
      closeMessagesBoxBtn.addEventListener("click", () => {
        window.location.reload();
      });
    }
  } else {
    return;
  }
}

window.addEventListener("DOMContentLoaded", checkAdminPage);

// Reset password

function checkResetPasswordForm() {
  if (requestResetForm) {
    requestResetEmail.addEventListener("input", checkForMessageConfirmation);
  } else {
    return;
  }
}

window.addEventListener("DOMContentLoaded", checkResetPasswordForm);
