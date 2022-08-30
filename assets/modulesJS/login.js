import { getFromLocalStorage } from "./register.js";

// login USER

const loginForm = document.getElementById("login-form");
const loginEmail = document.getElementById("email");
const loginPassword = document.getElementById("login-password");
const loginText = document.getElementById("login-page__text");
const loginBtn = document.getElementById("login-button");
const loginEmailLabel = document.getElementById("login-email__label");
const loginPasswordLabel = document.getElementById("login-password__label");
const loginTime = 60 * 60 * 1000;

function loginUser(e) {
  e.preventDefault();
  const users = getFromLocalStorage();

  if (loginEmail.value === "") {
    loginEmailLabel.innerText = "Email or username required !";
    loginEmailLabel.style.color = "red";
    setTimeout(() => {
      loginEmailLabel.innerText = "Email or username";
      loginEmailLabel.style.color = "var(--main-text__color)";
    }, 3000);
    return;
  } else {
    const user = users.find((user) => {
      return (
        user.email === loginEmail.value || user.username === loginEmail.value
      );
    });
    if (user && user.password === loginPassword.value) {
      capitalizeUserName(user);
      loginText.innerText = `Welcome ${user.firstName}`;
      user.loggedIn = true;
      sortUsers(users);
      loggedOut(users);
      localStorage.setItem("users", JSON.stringify(users));
      setTimeout(() => {
        loginForm.reset();
      }, 2000);
      setTimeout(() => {
        window.location.href = "./pages/homepage.html";
      }, 2000);
    } else if (
      user &&
      user.password !== loginPassword.value &&
      loginPassword.value.length > 0
    ) {
      loginPasswordLabel.innerText = "Incorrect password !";
      loginPasswordLabel.style.color = "red";
      setTimeout(() => {
        loginPasswordLabel.innerText = "Password";
        loginPasswordLabel.style.color = "var(--main-txt__color)";
      }, 3000);
      return;
    } else if (user && loginPassword.value.length < 1) {
      loginPasswordLabel.innerText = "Please enter your password !";
      loginPasswordLabel.style.color = "red";
      setTimeout(() => {
        loginPasswordLabel.innerText = "Password";
        loginPasswordLabel.style.color = "var(--main-txt__color)";
      }, 3000);
      return;
    } else {
      loginText.innerText = "User not found !";
      setTimeout(() => {
        loginText.innerText = "Login";
      }, 3000);
      return;
    }
  }
}

// Sort users by loggedIn status

function sortUsers(users) {
  users
    .sort((a, b) => {
      return a.loggedIn - b.loggedIn;
    })
    .reverse();
}

// Using local storage to store users, only one user can be logged in at a time

function loggedOut(users) {
  if (users.length < 1) {
    return;
  } else {
    for (let i = 1; i < users.length; i++) {
      if (users[i].loggedIn === true) {
        users[i].loggedIn = false;
      }
      localStorage.setItem("users", JSON.stringify(users));
    }
  }
}

function capitalizeUserName(user) {
  user.firstName =
    user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1);
  user.lastName =
    user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1);
  return user;
}

export {
  loginUser,
  sortUsers,
  loggedOut,
  capitalizeUserName,
  loginForm,
  loginTime,
};
