import {
  resetPasswordContainer,
  resetPasswordEmail,
  resetPassInputContainer,
  resetNewPassword,
  resetNewPasswordConfirm,
  resetNewPasswordLabel,
  resetNewPasswordConfirmLabel,
  resetHeadingText,
  resetParagraph,
  requestResetForm,
  deleteAllData,
  requestResetEmail,
  resetPasswordForm,
  requestResetBtn,
  cancelRequestBtn,
} from "./login.js";
import { getFromLocalStorage, passwordRegex } from "./register.js";

const adminLogOutBtn = document.getElementById("admin-logout-btn");
const adminMessagesNr = document.getElementById("admin-messages-nr");
const adminUsernameContainer = document.getElementById(
  "admin-username-container"
);
const adminMainText = document.getElementById("admin-home-heading");
const messageList = document.getElementById("admin-message-list");
const resetBtn = document.getElementById("reset-button");
const adminNoUsers = document.getElementById("admin-no-users");
const usersContainer = document.getElementById("admin-users-container");
const adminPageUserImage = document.querySelectorAll("admin-user__image");
const adminUsersSection = document.getElementById("admin-users-section");
const adminMessagesContainer = document.getElementById(
  "admin-messages-container"
);
const closeMessagesBoxBtn = document.getElementById("close-messages-box");

//  confirmations delete all data

const deleteConfirmationBox = document.getElementById(
  "delete-confirmation-box"
);
const deleteConfirmationBoxContainer = document.getElementById(
  "delete-confirmation-box-container"
);
const deleteConfirmationBtn = document.getElementById(
  "delete-confirmation-btn"
);
const cancelDeleteBtn = document.getElementById("cancel-delete-btn");
const deleteBoxHeadingTxt = document.getElementById("delete-user-heading-txt");

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
  adminUsersSection.setAttribute("aria-hidden", "true");
  adminMessagesContainer.setAttribute("aria-hidden", "false");
  closeMessagesBoxBtn.setAttribute("aria-hidden", "false");
  const admin = getAdminFromLocalStorage();
  const messages = admin.messages;
  if (messages.length > 0) {
    messages.forEach((message) => {
      const messageItem = document.createElement("li");
      messageItem.classList.add("admin-message__item");
      messageItem.innerHTML = `
      <div class="admin-message-item__header flex-column">
        <h3 class="admin-message-item__title fs-600 fw-700">${message.content}</h3>
        <p class="admin-message__from fs-500 fw-500">${message.email}</p>
      </div>
      `;
      adminMainText.innerText = "Messages";
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
        const deleteBtn = document.getElementById("delete-message-btn");

        // confirm user message

        const users = getFromLocalStorage();
        const user = users.find((user) => user.email === message.email);
        const userMessages = user.messages;
        const userMessage = userMessages.find(
          (userMessage) => userMessage.content === message.content
        );

        confirmChangeBtn.addEventListener("click", () => {
          userMessage.confirmation = true;
          localStorage.setItem("users", JSON.stringify(users));
          messageItemContent.setAttribute("aria-hidden", "true");
          admin.messages.splice(admin.messages.indexOf(message), 1);
          localStorage.setItem("admin", JSON.stringify(admin));
          messageItem.remove();
          messageList.setAttribute("aria-hidden", "false");
          window.location.reload();
        });

        // delete message

        deleteBtn.addEventListener("click", () => {
          console.log(admin.messages.indexOf(message));
          admin.messages.splice(admin.messages.indexOf(message), 1);
          localStorage.setItem("admin", JSON.stringify(admin));
          messageItem.remove();
          messageList.setAttribute("aria-hidden", "false");
          window.location.reload();
        });
      });
    });
  } else {
    return;
  }
}

// check for message confirmation and reset password

function checkForMessageConfirmation() {
  const users = getFromLocalStorage();
  const user = users.find((user) => user.email === requestResetEmail.value);
  if (user) {
    if (user.messages) {
      const userMessages = user.messages;
      const userMessage = userMessages.find(
        (userMessage) => userMessage.content === "Reset password"
      );
      if (userMessage === undefined) {
        resetParagraph.innerText = "No reset password request";
      } else {
        if (userMessage.confirmation === true) {
          requestResetForm.setAttribute("aria-hidden", "true");
          resetPasswordForm.setAttribute("aria-hidden", "false");
          resetPassInputContainer.setAttribute("aria-hidden", "false");
          resetBtn.disabled = true;
          resetPasswordEmail.value = requestResetEmail.value;
          resetPasswordEmail.disabled = true;
          resetHeadingText.innerText = "Reset confirmed";
          resetParagraph.innerText = "Enter your new password";
          resetHeadingText.style.color = "green";
          resetNewPassword.addEventListener("input", () => {
            validateResetPassword();
          });
          resetNewPasswordConfirm.addEventListener("input", () => {
            validateConfirmResetPassword();
          });
        } else {
          resetParagraph.innerHTML = `Request not confirmed yet. 
           <span class="delete-user__data" id="delete-all-data">Delete all user data?</span>`;
          deleteAllData.setAttribute("aria-hidden", "false");
          requestResetBtn.setAttribute("aria-hidden", "true");
          if (deleteAllData) {
            deleteAllData.addEventListener("click", (e) => {
              e.preventDefault();
              openDeleteConfirmationBox();
            });
          }
        }
      }
    } else {
      return;
    }
  } else {
    return;
  }
}

function openDeleteConfirmationBox() {
  deleteConfirmationBox.setAttribute("aria-hidden", "false");
  deleteConfirmationBoxContainer.setAttribute("aria-hidden", "false");
  resetPasswordContainer.setAttribute("aria-hidden", "true");
  deleteConfirmationBtn.addEventListener("click", () => {
    deleteAllUserData();
  });

  cancelDeleteBtn.addEventListener("click", () => {
    deleteConfirmationBox.setAttribute("aria-hidden", "true");
    deleteConfirmationBoxContainer.setAttribute("aria-hidden", "true");
    resetPasswordContainer.setAttribute("aria-hidden", "false");
  });
}

// Delete all user data

function deleteAllUserData() {
  const users = getFromLocalStorage();
  const user = users.find((user) => user.email === requestResetEmail.value);
  const userIndex = users.indexOf(user);
  users.splice(userIndex, 1);
  localStorage.setItem("users", JSON.stringify(users));
  deleteBoxHeadingTxt.innerText = "User data deleted";
  deleteBoxHeadingTxt.style.color = "green";
  setTimeout(() => {
    window.location.reload();
  }, 2000);
}

window.addEventListener("load", () => {
  if (cancelRequestBtn) {
    cancelRequestBtn.addEventListener("click", () => {
      window.location.reload();
    });
  } else {
    return;
  }
});

// validate reset password

function validateResetPassword() {
  if (!passwordRegex.test(resetNewPassword.value)) {
    resetParagraph.innerText = `Password must be at least 6 characters, 
       - contain at least one uppercase letter, 
       - one lowercase letter, 
      - one number,
      -  and a special character`;
    resetParagraph.style.color = "red";
    resetNewPasswordLabel.innerText = "Invalid password";
    resetNewPasswordLabel.style.color = "red";
  } else {
    resetParagraph.innerText = `Enter your new password`;
    resetParagraph.style.color = "var(--main-txt__color)";
    resetNewPasswordLabel.innerText = "Password";
    resetNewPasswordLabel.style.color = "var(--main-txt__color)";
  }
}

function validateConfirmResetPassword() {
  if (resetNewPassword.value !== resetNewPasswordConfirm.value) {
    resetBtn.disabled = true;
    resetParagraph.innerText = `Passwords do not match`;
    resetParagraph.style.color = "red";
    resetNewPasswordConfirmLabel.innerText = "Invalid password";
    resetNewPasswordConfirmLabel.style.color = "red";
  } else {
    resetBtn.disabled = false;
    resetParagraph.innerText = `Enter your new password`;
    resetParagraph.style.color = "var(--main-txt__color)";
    resetNewPasswordConfirmLabel.innerText = "Password";
    resetNewPasswordConfirmLabel.style.color = "var(--main-txt__color)";
  }
}

// display users

function displayUsers() {
  const users = getFromLocalStorage();
  users.forEach((user) => {
    if (user) {
      const userItem = document.createElement("li");
      userItem.classList.add("user-item");
      userItem.setAttribute("aria-hidden", "true");
      userItem.innerHTML = `
      <div class="admin-user__data--box flex-column flow">
        <div class="user-item__data">
          <p class="user-item__data--name">${user.firstName}</p>
          <p class="user-item__data--name">${user.lastName}</p>
          <p class="user-item__data--email">${user.email}</p>
         </div>
        <div class="user-item__image">
          <img class="admin-user__image" src="" alt="user image" />
        </div>
        <div class="user-item__best--month">
          <p class="user-item__best--month--text">Best month</p>
          <p class="user-item__best--month--data">${user.mostProfitableMonth.month}</p>
          <p class="user-item__best--month--data">${user.mostProfitableMonth.year}</p>
          <p class="user-item__best--month--data">${user.mostProfitableMonth.profit}</p>
        </div>
    </div>
    `;
      usersContainer.appendChild(userItem);
      adminMainText.innerText = "Users";
      adminNoUsers.setAttribute("aria-hidden", "true");
    } else {
      adminMainText.innerText = "No users";
      adminNoUsers.setAttribute("aria-hidden", "false");
    }
  });
}

function displayUserImages() {
  const users = getFromLocalStorage();
  const userImages = document.querySelectorAll(".admin-user__image");
  userImages.forEach((image, index) => {
    image.src = users[index].image;
  });
}

export {
  getAdminFromLocalStorage,
  logOutAdmin,
  adminLogOutBtn,
  checkAdminMessages,
  adminUsernameContainer,
  openMessageList,
  checkForMessageConfirmation,
  resetBtn,
  requestResetEmail,
  requestResetForm,
  displayUsers,
  displayUserImages,
  adminPageUserImage,
  closeMessagesBoxBtn,
};
