"use strict";
//#region Selection
const firstNameInput = document.querySelector("#input-firstname");
const lastNameInput = document.querySelector("#input-lastname");
const usernameInput = document.querySelector("#input-username");
const passwordInput = document.querySelector("#input-password");
const confirmPassInput = document.querySelector("#input-password-confirm");

const registerBtn = document.querySelector("#btn-submit");
//#endregion

function validateRegister(data) {
  if (!data.firstName) {
    alert("Please input First Name!");
    return false;
  } else if (!data.lastName) {
    alert("Please input last Name!");
    return false;
  } else if (!data.username) {
    alert("Please input username!");
    return false;
  } else if (!data.password) {
    alert("Please input Password!");
    return false;
  } else if (!data.confirmPass) {
    alert("Please confirm Password!");
    return false;
  } else if (userArr.some((user) => user.username === data.username)) {
    alert("Username already exist!");
    return false;
  } else if (data.password !== data.confirmPass) {
    alert("Confirmation does not match!");
    return false;
  } else if (data.password.length <= 8) {
    alert("Password must have at least 9 character!");
    return false;
  }
  return true;
}

// Register Button
registerBtn.addEventListener("click", function (e) {
  // Store user input into data object
  const data = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    username: usernameInput.value,
    password: passwordInput.value,
    confirmPass: confirmPassInput.value,
    newsPerPage: 5,
    newsCategory: "General",
    newsCountry: "us",
  };

  // Validating input fields
  if (validateRegister(data)) {
    // creating new user instance based on inputted values
    const newUser = new User(
      data.firstName,
      data.lastName,
      data.username,
      data.password,
      data.newsPerPage,
      data.newsCategory,
      data.newsCountry
    );
    userArr.push(newUser);
    localStorage.setItem("userStorage", JSON.stringify(userArr));
    alert("Account registered successfully!");
    window.location.href = "../pages/login.html";
  }
});
