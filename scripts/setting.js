"use strict";

//#region Selection
const pageInput = document.querySelector("#input-page-size");
const categoryInput = document.querySelector("#input-category");
const countryInput = document.querySelector("#input-country");

const saveBtn = document.querySelector("#btn-submit");
//#endregion

//#region initialize
// guard clause for user not logged in
if (!currentUser.username) window.location.href = "../index.html";

pageInput.value = currentUser.newsPerPage;
categoryInput.value = currentUser.newsCategory;
countryInput.value = currentUser.newsCountry;
//#endregion

saveBtn.addEventListener("click", function () {
  // guard if user input illegal value
  if (pageInput.value <= 0 || pageInput.value > 20) {
    alert("News per page should be between 1 - 20");
    return;
  }

  // Updating UserArr
  const updatingUser = userArr.find(
    (user) => user.username === currentUser.username
  );
  updatingUser.newsPerPage = pageInput.value;
  updatingUser.newsCategory = categoryInput.value;
  updatingUser.newsCountry = countryInput.value;

  // Storing userArr to localStorage
  localStorage.setItem("userStorage", JSON.stringify(userArr));

  // Updating currentUser
  currentUser.newsPerPage = pageInput.value;
  currentUser.newsCategory = categoryInput.value;
  currentUser.newsCountry = countryInput.value;

  // Storing currentUser to localStorage
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  alert("Settings saved successfully!");
});
