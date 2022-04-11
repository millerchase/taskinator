// VARIABLES
let taskIdCounter = 0;
let tasks = [];
const pageContentEl = document.querySelector("#page-content");

// form ref
const formEl = document.querySelector("#task-form");

// tasks to list refs
const tasksToDoEl = document.querySelector("#tasks-to-do");
const tasksInProgressEl = document.querySelector("#tasks-in-progress");
const tasksCompletedEl = document.querySelector("#tasks-completed");

// FUNCTIONS

// receive and objectify form input
const taskFormHandler = event => {
    event.preventDefault();
    let taskNameInput = document.querySelector("input[name='task-name']").value;
    let taskTypeInput = document.querySelector("select[name='task-type']").value;
    
    // verify values
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }
    // reset form input
    formEl.reset();
    
    // check if input is an edit
    let isEdit = formEl.hasAttribute("data-task-id");
    if (isEdit) {
        let taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);

    } else { // not edit so create new object
        // package up data as object
        let taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do"
        };
        // send it as an argument to createTaskEl
        createTaskEl(taskDataObj);
    }
};

const completeEditTask = (taskName, taskType, taskId) => {
    // find the matching task list item
    let taskSelected = document.querySelector(`.task-item[data-task-id='${taskId}']`);
    
    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    // loop through tasks array and task object with new content
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    };

    saveTasks();

    alert("Task Updated!");

    // reset form
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task"
};

const createTaskEl = taskDataObj => {
    // create list items
    let listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    
    listItemEl.setAttribute("data-task-id", taskIdCounter);
    
    // create div to hold task info and add to list item
    let taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = `<h3 class='task-name'>${taskDataObj.name}</h3><span class='task-type'>${taskDataObj.type}</span>`;
    
    listItemEl.appendChild(taskInfoEl);
    
    // add task action to list element
    let taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
    
    // add entire list item to list
    switch (taskDataObj.status) {
        case "to do":
            listItemEl.querySelector("select[name='status-change']").selectedIndex = 0;
            tasksToDoEl.appendChild(listItemEl);
            break;
        case "in progress":
            listItemEl.querySelector("select[name='status-change']").selectedIndex = 1;
            tasksInProgressEl.appendChild(listItemEl);
            break;
        case "completed":
            listItemEl.querySelector("select[name='status-change']").selectedIndex = 2;
            tasksCompletedEl.appendChild(listItemEl);
            break;
        default:
            console.log("Something went wrong!");
    }

    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj);

    saveTasks();
    
    // increase task counter for next unique id
    taskIdCounter++;
};

const createTaskActions = taskId => {
    let actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-action";
    
    // create edit button
    let editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    
    actionContainerEl.appendChild(editButtonEl);
    
    // create delete button
    let deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    
    actionContainerEl.appendChild(deleteButtonEl);
    
    // create status changer
    let statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    
    actionContainerEl.appendChild(statusSelectEl);
    
    let statusChoices = ["To Do", "In Progress", "Completed"];
    
    for (let i = 0; i < statusChoices.length; i++) {
        // create option element
        let statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute('value', statusChoices[i]);
        
        // append options to select
        statusSelectEl.appendChild(statusOptionEl);
    }
    
    return actionContainerEl;
};

const deleteTask = taskId => {
    let taskSelected = document.querySelector(`.task-item[data-task-id='${taskId}']`);
    taskSelected.remove();

    // new array to hold updated list of tasks
    let updatedTaskArr = [];

    // loop through current tasks
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        }
    }
    // reassign tasks array
    tasks = updatedTaskArr;
    saveTasks();
};

const editTask = taskId => {
    // update save button text
    document.querySelector("#save-task").textContent = "Save Task";

    // assign task id to form element
    formEl.setAttribute(`data-task-id`, taskId);
};

const taskButtonHandler = event => {
    let targetEl = event.target;

    // edit button was clicked
    if (targetEl.matches(".edit-btn")) {
        // get the element's task id
        let taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }
    // delete button was clicked
    else if (targetEl.matches(".delete-btn")) {
        // get the element's task id
        let taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

const taskStatusChangeHandler = event => {
    // get the task item's id
    let taskId = event.target.getAttribute("data-task-id");

    // get the currently selected option's value and convert to lowercase
    let statusValue = event.target.value.toLowerCase();

    // find the parent task item element based on the id
    let taskSelected = document.querySelector(`.task-item[data-task-id='${taskId}']`);
    
    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    } else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    } else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }

    // loop through tasks and update object array
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].status = statusValue;
        }
    }
    saveTasks();
};

const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

const loadTasks = () => {
    let savedTasks =  localStorage.getItem("tasks");
    
    if (!savedTasks) {
        return false;
    }
    
    savedTasks = JSON.parse(savedTasks);
    
    for (let i = 0; i < savedTasks.length; i++) {
        
        console.log(createTaskEl(savedTasks[i]));
    }
};

// LOAD TASKS
loadTasks();

// EVENT LISTENERS  

// add task form
formEl.addEventListener("submit", taskFormHandler);

// task buttons
pageContentEl.addEventListener("click", taskButtonHandler);

// list progress update
pageContentEl.addEventListener("change", taskStatusChangeHandler);
