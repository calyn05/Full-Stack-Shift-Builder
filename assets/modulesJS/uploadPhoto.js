// Upload photo and save to local storage

import { sortUsers, loggedOut } from "./login.js";
import { getFromLocalStorage } from "./register.js";
import {
  profileImage,
  profileImageNav,
  profileImageUpload,
} from "./profile.js";

// Get user input and send to local storage

function saveImageToLocalStorage(file) {
  const users = getFromLocalStorage();
  const userLoggedIn = users.find((user) => {
    return user.loggedIn === true;
  });
  console.log(file);
  console.log(userLoggedIn);
  userLoggedIn.image = file;
  localStorage.setItem("users", JSON.stringify(users));
  showProfileImage();
}

function imageToBase64(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    saveImageToLocalStorage(reader.result);
  };
}

function showProfileImage() {
  const users = getFromLocalStorage();
  const userLoggedIn = users.find((user) => {
    return user.loggedIn === true;
  });
  profileImage.src = userLoggedIn.image;
  profileImageNav.src = userLoggedIn.image;
}

export { imageToBase64, showProfileImage, profileImage, profileImageUpload };
