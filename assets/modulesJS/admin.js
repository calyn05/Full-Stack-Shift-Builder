// Admin

const admin = {
  email: "admin@localhost.com",
  username: "admin007",
  password: "01Admin&",
  role: "admin",
  loggedIn: false,
};

function saveAdminToLocalStorage(admin) {
  localStorage.setItem("admin", JSON.stringify(admin));
}

function getAdminFromLocalStorage() {
  if (localStorage.getItem("admin") === null) {
    return [];
  } else {
    return JSON.parse(localStorage.getItem("admin"));
  }
}
