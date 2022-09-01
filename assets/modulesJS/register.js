import { sortUsers, loggedOut } from "./login.js";

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

export { registerUser, registerForm, getFromLocalStorage, saveToLocalStorage };
