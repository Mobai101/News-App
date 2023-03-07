"use strict";
//#region Selection
const titleInput = document.querySelector("#input-task");
const todoList = document.querySelector("#todo-list");

const addBtn = document.querySelector("#btn-add");
const closeBtn = document.querySelector(".close");
//#endregion

// Task class constructor
class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}

// Parse Task from local storage
function parseTask(taskdata) {
  const task = new Task(taskdata.task, taskdata.owner, taskdata.isDone);
  return task;
}

// Render Task
function renderTasks(TaskArr1) {
  // clear list
  todoList.innerHTML = "";

  // Filtered User Task Arr
  UserTaskArr = TaskArr1.filter((task) => task.owner === currentUser.username);

  // loop over UserTaskArr to render task
  UserTaskArr.forEach((task) => {
    todoList.insertAdjacentHTML(
      "beforeend",
      `
    <li ${task.isDone ? 'class="checked"' : ""} data-task="${task.task}">${
        task.task
      }<span class="close" data-task="${task.task}">×</span></li>
    `
    );
  });
}

//#region Initialize
// guard clause for user not logged in
if (!currentUser.username) window.location.href = "../index.html";

// Get taskArr from local storage
const taskArr = localStorage.getItem("taskStorage")
  ? JSON.parse(localStorage.getItem("taskStorage")).map((task) =>
      parseTask(task)
    )
  : [];

// User Task filtered from taskArr
let UserTaskArr;

// Render Task
renderTasks(taskArr);
console.log(UserTaskArr);
//#endregion

// Add button
addBtn.addEventListener("click", function () {
  // Check if title is inputted
  if (!titleInput.value) {
    alert("Please input title of task!");
  }

  // Check if task already existed
  else if (
    UserTaskArr.find(
      (task) =>
        task.task === titleInput.value && task.owner === currentUser.username
    )
  ) {
    alert("Task already existed!");
  }

  // Proceed to add task to array
  else {
    // create newTask and add to TaskArr
    const newTask = new Task(titleInput.value, currentUser.username, false);
    taskArr.unshift(newTask);
    localStorage.setItem("taskStorage", JSON.stringify(taskArr));

    // Render Task
    renderTasks(taskArr);

    // Clear input field
    titleInput.value = "";
  }
});

// Click task to undone & delete Task
todoList.addEventListener("click", function (e) {
  // Click task to update isDone
  if (e.target.tagName === "LI") {
    const selectedTask = taskArr.find(
      (task) =>
        task.task == e.target.dataset.task &&
        task.owner === currentUser.username
    );
    selectedTask.isDone = !selectedTask.isDone;

    // Re render the list
    renderTasks(taskArr);
    localStorage.setItem("taskStorage", JSON.stringify(taskArr));
  }

  // Delete task
  else if (e.target.tagName === "SPAN") {
    if (!confirm("Are you sure you want to remove this task?")) return;

    const taskIndex = taskArr.findIndex(
      (task) =>
        task.task == e.target.dataset.task &&
        task.owner === currentUser.username
    );
    taskArr.splice(taskIndex, 1);

    // Re render the list
    renderTasks(taskArr);
    localStorage.setItem("taskStorage", JSON.stringify(taskArr));
  }
});
