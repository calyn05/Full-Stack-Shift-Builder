import { getFromLocalStorage, emailRegex, passwordRegex } from "./register.js";
import { capitalizeUserName } from "./login.js";

const updateProfileForm = document.getElementById("update-form");
const updateEmail = document.getElementById("update-email");
const updateUsername = document.getElementById("update-username");
const updateAge = document.getElementById("update-age");
const updateFirstName = document.getElementById("update-fname");
const updateLastName = document.getElementById("update-lname");
const updatePassword = document.getElementById("update-password");
const updateConfirmPassword = document.getElementById(
  "confirm-update__password"
);

// Confirm password field visibility
const confirmPasswordField = document.getElementById(
  "confirm-update-password-container"
);
const profilePassContainer = document.getElementById(
  "profile-password-container"
);

// Validate update form

const updateEmailLabel = document.getElementById("update-email-label");
const updateUsernameLabel = document.getElementById("update-username-label");
const updateAgeLabel = document.getElementById("update-age-label");
const updateFirstNameLabel = document.getElementById("update-fname-label");
const updateLastNameLabel = document.getElementById("update-lname-label");
const updatePasswordLabel = document.getElementById("update-password-label");
const updateConfirmPasswordLabel = document.getElementById(
  "confirm-update-password-label"
);
const updateProfileBtn = document.getElementById("update-button");

// Profile image upload variables

const profileImage = document.getElementById("profile-image");
const profileImageNav = document.getElementById("profile-image-nav");
const profileImageUpload = document.getElementById("profile-image-upload");
const openImageUpload = document.getElementById("open-image-upload");

function validateUpdatePassword() {
  if (!passwordRegex.test(updatePassword.value)) {
    updatePasswordLabel.innerText = "Invalid password";
    updatePasswordLabel.style.color = "red";
    updateProfileBtn.setAttribute("disabled", "true");
  } else {
    updatePasswordLabel.innerText = "Password";
    updatePasswordLabel.style.color = "var(--main-txt__color)";
    updateProfileBtn.removeAttribute("disabled");
  }
}

function validateUpdateConfirmPassword() {
  if (updatePassword.value !== updateConfirmPassword.value) {
    updateConfirmPasswordLabel.innerText = "Passwords don't match";
    updateConfirmPasswordLabel.style.color = "red";
    updateProfileBtn.setAttribute("disabled", "true");
  } else {
    updateConfirmPasswordLabel.innerText = "Confirm password";
    updateConfirmPasswordLabel.style.color = "var(--main-txt__color)";
    updateProfileBtn.removeAttribute("disabled");
  }
}

function validateUpdateEmail() {
  if (emailRegex.test(updateEmail.value)) {
    updateEmailLabel.innerText = "Email";
    updateEmailLabel.style.color = "var(--main-txt__color)";
    updateProfileBtn.removeAttribute("disabled");
  } else {
    updateEmailLabel.innerText = "Invalid email";
    updateEmailLabel.style.color = "red";
    updateProfileBtn.setAttribute("disabled", "true");
  }
}

function validateUpdateUsername() {
  if (updateUsername.value.length < 6) {
    updateUsernameLabel.innerText = "At least 6 characters";
    updateUsernameLabel.style.color = "red";
    updateProfileBtn.setAttribute("disabled", "true");
  } else {
    updateUsernameLabel.innerText = "Username";
    updateUsernameLabel.style.color = "var(--main-txt__color)";
    updateProfileBtn.removeAttribute("disabled");
  }
}

function validateUpdateAge() {
  if (updateAge.value < 18) {
    updateAgeLabel.innerText = "Too young";
    updateAgeLabel.style.color = "red";
    updateProfileBtn.setAttribute("disabled", "true");
  } else {
    updateAgeLabel.innerText = "Age";
    updateAgeLabel.style.color = "var(--main-txt__color)";
    updateProfileBtn.removeAttribute("disabled");
  }
}

function validateUpdateFirstName() {
  if (updateFirstName.value.length < 3) {
    updateFirstNameLabel.innerText = "At least 3 characters";
    updateFirstNameLabel.style.color = "red";
    updateProfileBtn.setAttribute("disabled", "true");
  } else {
    updateFirstNameLabel.innerText = "First name";
    updateFirstNameLabel.style.color = "var(--main-txt__color)";
    updateProfileBtn.removeAttribute("disabled");
  }
}

function validateUpdateLastName() {
  if (updateLastName.value.length < 3) {
    updateLastNameLabel.innerText = "At least 3 characters";
    updateLastNameLabel.style.color = "red";
    updateProfileBtn.setAttribute("disabled", "true");
  } else {
    updateLastNameLabel.innerText = "Last name";
    updateLastNameLabel.style.color = "var(--main-txt__color)";
    updateProfileBtn.removeAttribute("disabled");
  }
}

function checkUpdateEmail() {
  const users = getFromLocalStorage("users");
  const currentUser = getFromLocalStorage("currentUser");
  const user = users.find((user) => user.email === updateEmail.value);
  if (user && user.email !== currentUser.email) {
    updateEmailLabel.innerText = "Email already in use";
    updateEmailLabel.style.color = "red";
    updateProfileBtn.setAttribute("disabled", "true");
  } else {
    updateEmailLabel.innerText = "Email";
    updateEmailLabel.style.color = "var(--main-txt__color)";
    updateProfileBtn.removeAttribute("disabled");
  }
}

function checkUpdateUsername() {
  const users = getFromLocalStorage("users");
  const currentUser = getFromLocalStorage("currentUser");
  const user = users.find((user) => user.username === updateUsername.value);
  if (user && user.username !== currentUser.username) {
    updateUsernameLabel.innerText = "Username already in use";
    updateUsernameLabel.style.color = "red";
    updateProfileBtn.setAttribute("disabled", "true");
  } else {
    updateUsernameLabel.innerText = "Username";
    updateUsernameLabel.style.color = "var(--main-txt__color)";
    updateProfileBtn.removeAttribute("disabled");
  }
}

function getUserFromLocalStorage() {
  const users = getFromLocalStorage();
  const userLoggedIn = users.find((user) => {
    return user.loggedIn === true;
  });

  if (userLoggedIn) {
    updateEmail.value = userLoggedIn.email;
    updateUsername.value = userLoggedIn.username;
    updateAge.value = userLoggedIn.age;
    capitalizeUserName(userLoggedIn);
    updateFirstName.value = userLoggedIn.firstName;
    updateLastName.value = userLoggedIn.lastName;
    updatePassword.value = userLoggedIn.password;
    updateProfileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      userLoggedIn.email = updateEmail.value;
      userLoggedIn.username = updateUsername.value;
      userLoggedIn.age = updateAge.value;
      userLoggedIn.firstName = updateFirstName.value;
      userLoggedIn.lastName = updateLastName.value;
      userLoggedIn.password = updatePassword.value;

      localStorage.setItem("users", JSON.stringify(users));
      setTimeout(() => {
        location.reload();
      }, 800);
    });
  } else {
    return;
  }
}

function confirmInputVisible() {
  window.addEventListener("click", (e) => {
    if (
      e.target.id === updatePassword.id ||
      e.target.id === updateConfirmPassword.id ||
      e.target.classList.contains("show-password")
    ) {
      confirmPasswordField.setAttribute("aria-hidden", "false");
      profilePassContainer.setAttribute("data-visible", "true");
    } else {
      confirmPasswordField.setAttribute("aria-hidden", "true");
      profilePassContainer.setAttribute("data-visible", "false");
    }
  });
}

function openImageUploadInput() {
  profileImageUpload.setAttribute("aria-hidden", "false");
  openImageUpload.setAttribute("aria-hidden", "true");
}

function checkForChangeBtn() {
  if (openImageUpload) {
    openImageUpload.addEventListener("click", (e) => {
      e.preventDefault();
      openImageUploadInput();
    });
  } else {
    return;
  }
}

window.addEventListener("load", checkForChangeBtn);

export {
  getUserFromLocalStorage,
  confirmInputVisible,
  updatePassword,
  updateProfileForm,
  profileImage,
  profileImageNav,
  profileImageUpload,
  validateUpdatePassword,
  validateUpdateConfirmPassword,
  validateUpdateEmail,
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
  checkUpdateEmail,
  checkUpdateUsername,
  updateProfileBtn,
};
