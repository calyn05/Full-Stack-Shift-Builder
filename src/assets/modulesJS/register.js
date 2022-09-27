import { sortUsers, loggedOut, capitalizeUserName } from "./login.js";

// Get user input and send to local storage

const users = [];
const registerEmail = document.getElementById("register-email");
const userName = document.getElementById("register-username");
let age = document.getElementById("age");
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const password = document.getElementById("register-password");
const confirmPassword = document.getElementById("confirm-password");
const registerForm = document.getElementById("register-form");
const registerBtn = document.getElementById("register-button");
const registerText = document.getElementById("register-text");

const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

const registerEmailLabel = document.getElementById("register-email-label");
const registerUsernameLabel = document.getElementById(
  "register-username-label"
);
const registerAgeLabel = document.getElementById("register-age-label");
const firstNameLabel = document.getElementById("first-name-label");
const lastNameLabel = document.getElementById("last-name-label");
const registerPasswordLabel = document.getElementById(
  "register-password-label"
);
const confirmPasswordLabel = document.getElementById("confirm-password-label");
const registerErrorText = document.getElementById("register-error-text");

function validatePassword() {
  if (!passwordRegex.test(password.value)) {
    registerErrorText.innerText = `Password must be at least 6 characters, 
       - contain at least one uppercase letter, 
       - one lowercase letter, 
      - one number,
      -  and a special character`;
    registerErrorText.setAttribute("aria-hidden", "false");
    registerBtn.disabled = true;
    registerPasswordLabel.innerText = "Invalid password";
    registerPasswordLabel.style.color = "red";
  } else {
    registerErrorText.innerText = "";
    registerErrorText.style.color = "var(--main-txt__color)";
    registerErrorText.setAttribute("aria-hidden", "true");
    registerBtn.disabled = false;
    registerPasswordLabel.innerText = "Password";
    registerPasswordLabel.style.color = "var(--main-txt__color)";
  }
}

function validateConfirmPassword() {
  if (password.value !== confirmPassword.value) {
    registerBtn.disabled = true;
    confirmPasswordLabel.innerText = "Passwords don't match";
    confirmPasswordLabel.style.color = "red";
  } else {
    registerBtn.disabled = false;
    confirmPasswordLabel.innerText = "Confirm password";
    confirmPasswordLabel.style.color = "var(--main-txt__color)";
  }
}

function validateEmail() {
  if (emailRegex.test(registerEmail.value)) {
    registerBtn.disabled = false;
    registerEmailLabel.innerText = "Email";
    registerEmailLabel.style.color = "var(--main-txt__color)";
  } else {
    registerBtn.disabled = true;
    registerEmailLabel.innerText = "Invalid email address";
    registerEmailLabel.style.color = "red";
  }
}

function validateUsername() {
  if (userName.value.length < 6) {
    registerErrorText.innerText = "Username must be at least 6 characters";
    registerErrorText.setAttribute("aria-hidden", "false");
    registerBtn.disabled = true;
    registerUsernameLabel.innerText = "At least 6 characters";
    registerUsernameLabel.style.color = "red";
  } else {
    registerErrorText.innerText = "";
    registerErrorText.setAttribute("aria-hidden", "true");
    registerBtn.disabled = false;
    registerUsernameLabel.innerText = "Username";
    registerUsernameLabel.style.color = "var(--main-txt__color)";
  }
}

function validateAge() {
  if (age.value < 18) {
    registerErrorText.innerText = "You must be at least 18 years old";
    registerErrorText.setAttribute("aria-hidden", "false");
    registerBtn.disabled = true;
    registerAgeLabel.innerText = "Too young";
    registerAgeLabel.style.color = "red";
  } else if (age.value > 65) {
    registerErrorText.innerText = "You must be under 65 years old";
    registerErrorText.setAttribute("aria-hidden", "false");
    registerBtn.disabled = true;
    registerAgeLabel.innerText = "Too old";
    registerAgeLabel.style.color = "red";
  } else {
    registerErrorText.innerText = "";
    registerErrorText.setAttribute("aria-hidden", "true");
    registerBtn.disabled = false;
    registerAgeLabel.innerText = "Age";
    registerAgeLabel.style.color = "var(--main-txt__color)";
  }
}

function validateFirstName() {
  if (firstName.value.length < 3) {
    registerErrorText.innerText = "First name must be at least 3 characters";
    registerErrorText.setAttribute("aria-hidden", "false");
    registerBtn.disabled = true;
    firstNameLabel.innerText = "At least 3 characters";
    firstNameLabel.style.color = "red";
  } else {
    registerErrorText.innerText = "";
    registerErrorText.setAttribute("aria-hidden", "true");
    registerBtn.disabled = false;
    firstNameLabel.innerText = "First name";
    firstNameLabel.style.color = "var(--main-txt__color)";
  }
}

function validateLastName() {
  if (lastName.value.length < 3) {
    registerErrorText.innerText = "Last name must be at least 3 characters";
    registerErrorText.setAttribute("aria-hidden", "false");
    registerBtn.disabled = true;
    lastNameLabel.innerText = "At least 3 characters";
    lastNameLabel.style.color = "red";
  } else {
    registerErrorText.innerText = "";
    registerErrorText.setAttribute("aria-hidden", "true");
    registerBtn.disabled = false;
    lastNameLabel.innerText = "Last name";
    lastNameLabel.style.color = "var(--main-txt__color)";
  }
}

// check if email already exists

function checkEmail() {
  const email = registerEmail.value;
  const users = getFromLocalStorage("users");
  const user = users.find((user) => user.email === email);
  if (user) {
    registerText.innerText = "Email already exists";
    setTimeout(() => {
      registerText.innerText = "Register";
    }, 3000);
    registerBtn.disabled = true;
    registerEmailLabel.innerText = "Email already exists";
    registerEmailLabel.style.color = "red";
  } else {
    registerText.innerText = "Register";
    registerBtn.disabled = false;
    registerEmailLabel.innerText = "Email";
    registerEmailLabel.style.color = "var(--main-txt__color)";
  }
}

// check if username already exists

function checkUsername() {
  const username = userName.value;
  const users = getFromLocalStorage("users");
  const user = users.find((user) => user.username === username);
  if (user) {
    registerText.innerText = "Username already exists";
    setTimeout(() => {
      registerText.innerText = "Register";
    }, 3000);
    registerBtn.disabled = true;
    registerUsernameLabel.innerText = "Username already exists";
    registerUsernameLabel.style.color = "red";
  } else {
    registerText.innerText = "Register";
    registerBtn.disabled = false;
    registerUsernameLabel.innerText = "Username";
    registerUsernameLabel.style.color = "var(--main-txt__color)";
  }
}

function registerUser(e) {
  e.preventDefault();
  const user = {
    email: registerEmail.value,
    username: userName.value,
    loggedIn: true,
    age: age.value,
    firstName: firstName.value,
    lastName: lastName.value,
    password: password.value,
    shifts: [],
    mostProfitableMonth: {},
    monthlyProfits: [],
  };

  users.push(user);
  saveToLocalStorage(user);
  capitalizeUserName(user);
  registerText.innerText = `Welcome ${user.firstName}`;
  setTimeout(() => {
    window.location.href = "./homepage.html";
  }, 2000);
}

//save to local storage

function saveToLocalStorage(user) {
  const users = getFromLocalStorage();
  users.push(user);
  sortUsers(users);
  loggedOut(users);
  localStorage.setItem("users", JSON.stringify(users));
}

function getFromLocalStorage() {
  if (localStorage.getItem("users") === null) {
    return [];
  } else {
    return JSON.parse(localStorage.getItem("users"));
  }
}

export {
  registerUser,
  registerForm,
  getFromLocalStorage,
  saveToLocalStorage,
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
  emailRegex,
  passwordRegex,
};
