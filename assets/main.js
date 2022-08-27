import { loadingModal } from "./modulesJS/loadingModal.js";
import {
  localStorageColorTheme,
  toggleColorTheme,
} from "./modulesJS/colorTheme.js";

window.addEventListener("load", loadingModal);
window.addEventListener("DOMContentLoaded", localStorageColorTheme);

const colorThemeSelection = document.querySelector(".color-mode__container");
colorThemeSelection.addEventListener("click", toggleColorTheme);
