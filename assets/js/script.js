// VARIABLES

// form ref
const formEl = document.querySelector("#task-form");

// tasks to do list ref
const tasksToDoEl = document.querySelector("#tasks-to-do");


// FUNCTIONS

// function for creating task list elements
const createTaskHandler = () => {
    event.preventDefault();
    let taskNameInput = document.querySelector("input[name='task-name']").value;
    let taskTypeInput = document.querySelector("select[name='task-type']").value;
    console.log(taskTypeInput);

    // create list items
    let listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // create div to hold task info and add to list item
    let taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    // add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-input'>" + taskTypeInput + "</span>";
    console.log(taskInfoEl);
    listItemEl.appendChild(taskInfoEl);
    
    tasksToDoEl.appendChild(listItemEl); 
};


// WORK SPACE

formEl.addEventListener("submit", createTaskHandler);
