// Color theme selection
const colorThemeSelection = document.querySelector(".color-mode__container");
const colorThemeText = document.querySelector(".color-mode__container p");
const colorThemeIcon = document.querySelector(".color-mode__container img");
const logo = document.querySelector(".logo img");
const moonIcon = "../assets/images/icon-moon.svg";
const sunIcon = "../assets/images/icon-sun.svg";
const logoDark = "../assets/images/manage-my-shifts-logo-dark.jpg";
const logoLight = "../assets/images/manage-my-shifts-logo-light.jpg";

function localStorageColorTheme() {
  const colorTheme = localStorage.getItem("colorTheme");
  if (colorTheme === "dark-mode") {
    colorThemeText.textContent = "Light";
    document.body.classList.add("dark-mode");
    colorThemeIcon.src = sunIcon;
    logo.src = logoDark;
  } else if (colorTheme === "light-mode") {
    colorThemeText.textContent = "Dark";
    document.body.classList.add("light-mode");
    colorThemeIcon.src = moonIcon;
    logo.src = logoLight;
  } else {
    userPreferedColorTheme();
  }
}

function userPreferedColorTheme() {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    colorThemeText.textContent = "Light";
    document.body.classList.add("dark-mode");
    colorThemeIcon.src = sunIcon;
    logo.src = logoDark;
    localStorage.setItem("colorTheme", "dark-mode");
  } else {
    colorThemeText.textContent = "Dark";
    document.body.classList.add("light-mode");
    colorThemeIcon.src = moonIcon;
    logo.src = logoLight;
    localStorage.setItem("colorTheme", "light-mode");
  }
}

// toogleColorTheme
function toggleColorTheme() {
  if (document.body.classList.contains("dark-mode")) {
    document.body.classList.remove("dark-mode");
    document.body.classList.add("light-mode");
    colorThemeText.textContent = "Dark";
    colorThemeIcon.src = moonIcon;
    logo.src = logoLight;
    localStorage.setItem("colorTheme", "light-mode");
  } else {
    document.body.classList.add("dark-mode");
    document.body.classList.remove("light-mode");
    colorThemeText.textContent = "Light";
    colorThemeIcon.src = sunIcon;
    logo.src = logoDark;
    localStorage.setItem("colorTheme", "dark-mode");
  }
}

// Remove text for smartphones
function removeThemeText() {
  if (window.innerWidth < 512) {
    colorThemeText.textContent = "";
  }
}

export {
  localStorageColorTheme,
  toggleColorTheme,
  colorThemeSelection,
  removeThemeText,
};
