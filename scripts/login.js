"use strict";
//#region Selection
const usernameInput = document.querySelector("#input-username");
const passwordInput = document.querySelector("#input-password");

const loginBtn = document.querySelector("#btn-submit");
//#endregion

// validate login data
function validateLogin(loginData) {
  if (!loginData.username) {
    alert("Please input username!");
    return false;
  } else if (!loginData.password) {
    alert("Please input Password!");
    return false;
  } else if (
    userArr.find(
      (user) =>
        user.username === loginData.username &&
        user.password === loginData.password
    )
  ) {
    return true;
  }
  alert("Username or Password incorrect!");
  return false;
}

// Login button
loginBtn.addEventListener("click", function () {
  // Store input data into variable
  const loginData = {
    username: usernameInput.value,
    password: passwordInput.value,
  };

  // Guard clause to validate data
  if (!validateLogin(loginData)) return;
  currentUser = userArr.find(
    (user) =>
      user.username === loginData.username &&
      user.password === loginData.password
  );

  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  window.location.href = "../index.html";
});
