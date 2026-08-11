let tasks = [];

// Get HTML elements
const taskInput = document.getElementById("taskInput");
const priority = document.getElementById("priority");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const allBtn = document.getElementById("allBtn");
const pendingBtn = document.getElementById("pendingBtn");
const completedBtn = document.getElementById("completedBtn");


// ===============================
// RENDER TASKS
// ===============================

function renderTasks(filter = "all") {

    taskList.innerHTML = "";

    for (let task of tasks) {

        // Filter tasks
        if (filter === "pending" && task.completed) {
            continue;
        }

        if (filter === "completed" && !task.completed) {
            continue;
        }


        // Create list item
        let li = document.createElement("li");

        li.textContent = task.task + " - " + task.priority;


        // If task is completed
            li.classList.add(task.priority.toLowerCase());
        if (task.completed) {
            li.classList.add("completed");
        
        }


        // ===============================
        // DELETE BUTTON
        // ===============================

        let deleteBtn = document.createElement("button");

        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", function() {

            tasks = tasks.filter(function(t) {
                return t.id !== task.id;
            });

            localStorage.setItem(
                "tasks",
                JSON.stringify(tasks)
            );

            renderTasks(filter);
        });


        // ===============================
        // COMPLETE BUTTON
        // ===============================

        let completeBtn = document.createElement("button");

        if (task.completed) {
            completeBtn.textContent = "Undo";
        } else {
            completeBtn.textContent = "Complete";
        }


        completeBtn.addEventListener("click", function() {

            task.completed = !task.completed;

            localStorage.setItem(
                "tasks",
                JSON.stringify(tasks)
            );

            renderTasks(filter);
        });


        // Add buttons to list item
        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);


        // Add list item to task list
        taskList.appendChild(li);
    }
}


// ===============================
// ADD TASK
// ===============================

addTaskBtn.addEventListener("click", function() {

    let task = taskInput.value;
    let selectedPriority = priority.value;


    // Check empty task
    if (task === "") {

        alert("Please enter a task");

        return;
    }


    // Create task object
    let newTask = {

        id: Date.now(),

        task: task,

        priority: selectedPriority,

        completed: false
    };


    // Add task to array
    tasks.push(newTask);


    // Save tasks
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );


    // Clear input
    taskInput.value = "";


    // Display tasks
    renderTasks();
});


// ===============================
// ALL TASKS
// ===============================

allBtn.addEventListener("click", function() {

    renderTasks("all");

});


// ===============================
// PENDING TASKS
// ===============================

pendingBtn.addEventListener("click", function() {

    renderTasks("pending");

});


// ===============================
// COMPLETED TASKS
// ===============================

completedBtn.addEventListener("click", function() {

    renderTasks("completed");

});


// ===============================
// LOAD SAVED TASKS
// ===============================

let savedTasks = localStorage.getItem("tasks");

if (savedTasks) {

    tasks = JSON.parse(savedTasks);

}


// Display tasks when page loads
renderTasks();