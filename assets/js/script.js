// VARIABLES
let taskIdCounter = 0;
const pageContentEl = document.querySelector("#page-content");

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
    
    // verify values
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }
    
    formEl.reset();
    // package up data as object
    let taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    // send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
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
    tasksToDoEl.appendChild(listItemEl);

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
};

const editTask = taskId => {
    // get list element
    let taskSelected = document.querySelector(`.task-item[data-task-id='${taskId}']`);
    
    // get content from name and type
    let taskName = taskSelected.querySelector("h3.task-name").textContent;
    console.log(taskName);

    let taskType = taskSelected.querySelector("span.task-type").textContent;
    console.log(taskType);

    // update save button text
    document.querySelector("#save-task").textContent = "Save Task";

    // assign task id to form element
    formEl.setAttribute(`data-task-id`, taskId);
}

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
        console.log("You clicked a delete button!");
        // get the element's task id
        let taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

// EVENT LISTENERS  

// add task form
formEl.addEventListener("submit", taskFormHandler);

// task buttons
pageContentEl.addEventListener("click", taskButtonHandler);
