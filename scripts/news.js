"use strict";

//#region Selection
const newsContainer = document.querySelector("#news-container");
const pageNum = document.querySelector("#page-num");

const previousBtn = document.querySelector("#btn-prev");
const nextBtn = document.querySelector("#btn-next");
//#endregion Selection

// guard clause for user not logged in
if (!currentUser.username) window.location.href = "../index.html";

//#region current page
let currentPage;
if (!window.location.search) {
  currentPage = 1;
} else {
  currentPage = new URLSearchParams(window.location.search).get("page");
}
pageNum.innerHTML = currentPage;

// Hiding previous button on page 1
if (currentPage == 1) previousBtn.classList.add("hidden");
//#endregion current page

// Async function to fetch news and render news
async function renderNews(category, pageSize, page, country) {
  if (!currentUser.username) return;
  try {
    // fetch and get data from API
    const response =
      await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=cc5b57fe2d6f4175b0a50990b81cb245
    `);
    if (!response.ok) throw new Error(`Cannot get news! ${response.status}`);
    const result = await response.json();
    console.log(result);

    // Hide next button on last page
    if (result.totalResults / pageSize <= page) nextBtn.classList.add("hidden");

    // Render news to screen
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
  } catch (error) {
    alert(error);
  }
}

// Render news to screen
renderNews(
  currentUser.newsCategory,
  currentUser.newsPerPage,
  currentPage,
  currentUser.newsCountry
);

//#region Next/Previous button clicking
// Clicking previous button
previousBtn.addEventListener("click", function () {
  window.location.href = `?page=${+currentPage - 1}`;
});

// Clicking next button
nextBtn.addEventListener("click", function () {
  window.location.href = `?page=${+currentPage + 1}`;
});
//#endregion Next/Previous button
