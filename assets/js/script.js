// VARIABLES

// form ref
const formEl = document.querySelector("#task-form");

// tasks to do list ref
const tasksToDoEl = document.querySelector("#tasks-to-do");


// FUNCTIONS

// receive and objectify form input
const taskFormHandler = event => {
    event.preventDefault();
    let taskNameInput = document.querySelector("input[name='task-name']").value;
    let taskTypeInput = document.querySelector("select[name='task-type']").value;
    
    // package up data as object
    let taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    // send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
}

const createTaskEl = taskDataObj => {
    // create list items
    let listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // create div to hold task info and add to list item
    let taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = `<h3 class='task-name'>${taskDataObj.name}</h3><span class='task-input'>${taskDataObj.type}</span>`;

    listItemEl.appendChild(taskInfoEl);

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
}


// WORK SPACE

formEl.addEventListener("submit", taskFormHandler);
