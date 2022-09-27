// Upload photo and save to local storage
import defaultProfileImage from "../images/default-user-image.jpg";

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
    showProfileImage();
  }
  if (window.location.toString().includes("/pages/profile")) {
    profileImage.src = defaultProfileImage;
    profileImageNav.src = defaultProfileImage;
  }
}

export {
  imageToBase64,
  showProfileImage,
  profileImage,
  profileImageUpload,
  loadDefaultUserImage,
  defaultProfileImage,
};
