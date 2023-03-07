"use strict";
//#region Selection
const loginModal = document.querySelector("#login-modal");
const mainContent = document.querySelector("#main-content");
const welcomeMessage = document.querySelector("#welcome-message");

const logoutBtn = document.querySelector("#btn-logout");
//#endregion

//#region Conditioning to show login modal or main content
if (currentUser.username) {
  loginModal.classList.add("hidden");
  welcomeMessage.textContent = `Welcome ${currentUser.firstName}!`;
} else {
  mainContent.classList.add("hidden");
}
//#endregion

// Logout button
logoutBtn.addEventListener("click", function () {
  // ask user for confirmation before proceeding
  if (!confirm("Are you sure you want to logout?")) return;

  localStorage.removeItem("currentUser");
  window.location.href = "../pages/login.html";
});
