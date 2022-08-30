import { getFromLocalStorage } from "./register.js";
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
      location.reload();
    });
  } else {
    return;
  }
}

// Confirm password field visibility
const confirmPasswordField = document.getElementById(
  "confirm-update-password-container"
);
const profilePassContainer = document.getElementById(
  "profile-password-container"
);

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

export {
  getUserFromLocalStorage,
  confirmInputVisible,
  updatePassword,
  updateProfileForm,
};
