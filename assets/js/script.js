// VARIABLES

// form ref
const formEl = document.querySelector("#task-form");

// tasks to do list ref
const tasksToDoEl = document.querySelector("#tasks-to-do");


// FUNCTIONS

// function for creating task list elements
const createTaskHandler = () => {
    event.preventDefault();

    let listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = prompt("What task would you like to add?");
    tasksToDoEl.appendChild(listItemEl);
}


// WORK SPACE

formEl.addEventListener("submit", createTaskHandler);