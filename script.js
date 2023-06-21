var taskInput = document.getElementById("taskInput");
var addBtn = document.getElementById("addBtn");
var task = document.getElementById("task");

// Event listner function
addBtn.addEventListener("click", addTask);
task.addEventListener("click", toggleCompleted);

// Load tasks from local storage on page load
document.addEventListener("DOMContentLoaded", function() {
  var savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(function(taskText) {
    addTaskToList(taskText);
  });
});

// onclick function
function addTask() {
  var taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  addTaskToList(taskText);
  saveTasksToLocalStorage();
  taskInput.value = "";
}

function addTaskToList(taskText) {
  var li = document.createElement("li");
  var taskTextSpan = document.createElement("span");
  taskTextSpan.innerText = taskText;
  var deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";

  li.appendChild(taskTextSpan);
  li.appendChild(deleteButton);
  task.appendChild(li);
}

function toggleCompleted(event) {
  var target = event.target;
  if (target.tagName === "SPAN") {
    target.classList.toggle("completed");
    saveTasksToLocalStorage();
  } else if (target.tagName === "BUTTON") {
    target.parentElement.remove();
    saveTasksToLocalStorage();
  }
}

function saveTasksToLocalStorage() {
  var tasks = [];
  var taskElements = document.querySelectorAll("#task li span");
  taskElements.forEach(function(taskElement) {
    tasks.push(taskElement.innerText);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
