// Upload photo and save to local storage

import { getFromLocalStorage } from "./register.js";
import {
  profileImage,
  profileImageNav,
  profileImageUpload,
} from "./profile.js";
import { homepageProfileImage } from "./homepage.js";
import { profileImageAddShift } from "./addShift.js";

// Get user input and send to local storage

function saveImageToLocalStorage(file) {
  const users = getFromLocalStorage();
  const userLoggedIn = users.find((user) => {
    return user.loggedIn === true;
  });
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
  if (userLoggedIn.image) {
    profileImage.src = userLoggedIn.image;
    profileImageNav.src = userLoggedIn.image;
    profileImageUpload.src = userLoggedIn.image;
  } else {
    return;
  }
}

// Default image on load

function loadDefaultUserImage() {
  const users = getFromLocalStorage();
  const userLoggedIn = users.find((user) => {
    return user.loggedIn === true;
  });
  if (userLoggedIn.image) {
    return;
  } else {
    if (window.location.pathname === "/pages/profile.html") {
      profileImage.src = "../assets/images/manage-my-shifts-logo-dark.jpg";
      profileImageNav.src = "../assets/images/manage-my-shifts-logo-dark.jpg";
    }
  }
}

export {
  imageToBase64,
  showProfileImage,
  profileImage,
  profileImageUpload,
  loadDefaultUserImage,
};
