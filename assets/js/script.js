// VARIABLES

// save task button ref
const buttonEl = document.querySelector("#save-task");

// tasks to do list ref
const tasksToDoEl = document.querySelector("#tasks-to-do");


// FUNCTIONS

// function for creating task list elements
const createTaskHandler = () => {
    let listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = prompt("What task would you like to add?");
    tasksToDoEl.appendChild(listItemEl);
}


// WORK SPACE
buttonEl.addEventListener("click", createTaskHandler);