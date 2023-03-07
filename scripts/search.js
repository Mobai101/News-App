"use strict";
//#region Initiation
const newsContainer = document.querySelector("#news-container");
const pageNum = document.querySelector("#page-num");
const pagination = document.querySelector(".pagination");
const inputQuery = document.querySelector("#input-query");

const searchBtn = document.querySelector("#btn-submit");
const previousBtn = document.querySelector("#btn-prev");
const nextBtn = document.querySelector("#btn-next");

// guard clause for user not logged in
if (!currentUser.username) window.location.href = "../index.html";

// prevent using enter key on text field
window.addEventListener(
  "keydown",
  function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  },
  true
);

let query;

pagination.classList.add("hidden");
//#endregion Initiation

// Async function to fetch news and render news
async function renderNews(pageSize, page, query) {
  try {
    if (!query) return;
    // fetch and get data from API
    const response =
      await fetch(`https://newsapi.org/v2/everything?pageSize=${pageSize}&page=${page}&searchIn=title,description&q=${query}&apiKey=cc5b57fe2d6f4175b0a50990b81cb245
    `);

    if (!response.ok) throw new Error(`Cannot get news! ${response.status}`);
    const result = await response.json();
    console.log(result);

    // Hide next button on last page
    if (result.totalResults / pageSize <= page) nextBtn.classList.add("hidden");

    // Render news to screen
    newsContainer.innerHTML = "";
    result.articles.forEach((article) => {
      newsContainer.insertAdjacentHTML(
        "beforeend",
        `
      <div class="card flex-row flex-wrap">
            <div class="card mb-3" style="">
              <div class="row no-gutters">
                <div class="col-md-4">
                  <img src="${article.urlToImage}" class="card-img" alt="${article.title}">
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">
                      ${article.title}
                    </h5>
                    <p class="card-text">
                      ${article.description}
                    </p>
                    <a href="${article.url}" class="btn btn-primary" target="_blank">View</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          `
      );
    });
    pageNum.innerHTML = currentPage;
    pagination.classList.remove("hidden");
  } catch (error) {
    alert(error);
  }
}

//#region current page
let currentPage = 1;

// Hiding previous button on page 1
if (currentPage == 1) previousBtn.classList.add("hidden");
//#endregion current page

//#region Next/Previous button clicking
// Clicking previous button
previousBtn.addEventListener("click", function () {
  currentPage--;
  console.log(currentPage);

  nextBtn.classList.remove("hidden");
  previousBtn.classList.remove("hidden");

  // Hiding previous button on page 1
  if (currentPage == 1) previousBtn.classList.add("hidden");
  renderNews(currentUser.newsPerPage, currentPage, query);
});

// Clicking next button
nextBtn.addEventListener("click", function () {
  currentPage++;

  nextBtn.classList.remove("hidden");
  previousBtn.classList.remove("hidden");

  // Hiding previous button on page 1
  if (currentPage == 1) previousBtn.classList.add("hidden");
  renderNews(currentUser.newsPerPage, currentPage, query);
});
//#endregion Next/Previous button

// Click search button
searchBtn.addEventListener("click", function () {
  if (!inputQuery.value) {
    alert("Please input search query!");
    return;
  }

  currentPage = 1;
  previousBtn.classList.add("hidden");

  query = inputQuery.value;
  renderNews(currentUser.newsPerPage, currentPage, query);
});
