import { validateMessage } from "./login.js";
import { getFromLocalStorage } from "./register.js";

const adminLogOutBtn = document.getElementById("admin-logout-btn");
const adminMessagesNr = document.getElementById("admin-messages-nr");
const adminUsernameContainer = document.getElementById(
  "admin-username-container"
);
const messageList = document.getElementById("admin-message-list");

const admin = {
  email: "admin@localhost.com",
  username: "admin",
  password: "admin",
  loggedIn: false,
  messages: [],
};

function getAdminFromLocalStorage() {
  if (localStorage.getItem("admin") === null) {
    localStorage.setItem("admin", JSON.stringify(admin));
  } else {
    return JSON.parse(localStorage.getItem("admin"));
  }
}

function logOutAdmin() {
  const admin = getAdminFromLocalStorage();
  if (admin.loggedIn === true || localStorage.getItem("admin") === null) {
    admin.loggedIn = false;
    localStorage.setItem("admin", JSON.stringify(admin));
    window.location.pathname = "../index.html";
  } else {
    return;
  }
}

function checkAdminMessages() {
  const admin = getAdminFromLocalStorage();
  if (admin.messages.length > 0) {
    adminMessagesNr.innerText = admin.messages.length;
    adminMessagesNr.style.color = "red";
  } else {
    adminMessagesNr.innerText = admin.messages.length;
    return;
  }
}

function openMessageList() {
  const admin = getAdminFromLocalStorage();
  const messages = admin.messages;
  if (messages.length > 0) {
    messageList.innerHTML = "";
    messages.forEach((message) => {
      const messageItem = document.createElement("li");
      messageItem.classList.add("admin-message__item");
      messageItem.innerHTML = `
      <div class="admin-message-item__header flex-column">
        <h3 class="admin-message-item__title fs-600 fw-700">${message.content}</h3>
        <p class="admin-message__from fs-500 fw-500">${message.email}</p>
      </div>
      `;
      messageList.appendChild(messageItem);

      // open message

      messageItem.addEventListener("click", () => {
        const messageItemContent = document.getElementById(
          "messages-confirmation-box"
        );
        const messageHeading = document.getElementById("message-heading");
        const messageReceivedFrom = document.getElementById(
          "message-received-from"
        );

        messageItemContent.setAttribute("aria-hidden", "false");
        messageList.setAttribute("aria-hidden", "true");

        messageHeading.innerText = message.content;
        messageReceivedFrom.innerText = message.email;

        const confirmChangeBtn = document.getElementById("confirm-message-btn");
        const deleteBtn = document.getElementById("delte-message-btn");

        confirmChangeBtn.addEventListener("click", () => {
          admin.messages.confirmation = true;
          localStorage.setItem("admin", JSON.stringify(admin));
          messages.splice(messages.indexOf(message), 1);
          localStorage.setItem("admin", JSON.stringify(admin));
          messageItemContent.setAttribute("aria-hidden", "true");
          messageList.setAttribute("aria-hidden", "false");
          checkAdminMessages();
          const users = getFromLocalStorage();
          users.forEach((user) => {
            if (user.email === message.email) {
              user.messages.confirmation = true;
              localStorage.setItem("users", JSON.stringify(users));
            }
          });
        });
      });
    });
  } else {
    return;
  }
}

export {
  getAdminFromLocalStorage,
  logOutAdmin,
  adminLogOutBtn,
  checkAdminMessages,
  adminUsernameContainer,
  openMessageList,
};
