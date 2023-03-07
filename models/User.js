"use strict";
// User class constructor
class User {
  constructor(
    firstName,
    lastName,
    username,
    password,
    newsPerPage,
    newsCategory,
    newsCountry
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.newsPerPage = newsPerPage;
    this.newsCategory = newsCategory;
    this.newsCountry = newsCountry;
  }
}

// Parse user data from local storage
function parseUser(userData) {
  const user = new User(
    userData.firstName,
    userData.lastName,
    userData.username,
    userData.password,
    userData.newsPerPage,
    userData.newsCategory,
    userData.newsCountry
  );

  return user;
}

//#region Initialize user array from local storage into variable
let userArr = localStorage.getItem("userStorage")
  ? JSON.parse(localStorage.getItem("userStorage")).map((user) =>
      parseUser(user)
    )
  : [];
//#endregion

//#region Initialize current user into variable
let currentUser = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : [];
console.log(currentUser);
//#endregion
