

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".create-area");
    const taskInput = document.querySelector("textarea");
    const taskCard = document.createElement("div");
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");
    taskCard.classList.add("tasks");
    document.querySelector("#root").insertBefore(taskContainer, document.querySelector("footer"));



    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        savedTasks.forEach(task => addTask(task.content, task.completed));
    }


    function saveTasks() {
        const tasks = Array.from(document.querySelectorAll(".task")).map(task => ({
            content: task.querySelector("p").textContent,
            completed: task.querySelector("input").checked
        }));
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }


    function addTask(content, completed = false) {
        if (content.trim() === "") return;
        const taskDiv = document.createElement("div");
        
        taskDiv.classList.add("task");


        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("task-checkbox");
        checkbox.checked = completed;


        const taskText = document.createElement("p");
        taskText.textContent = content;


        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = '<img src="assets/delete.svg" alt="Delete" class="delete-icon">';
        deleteBtn.classList.add("delete-btn");


        checkbox.addEventListener("change", function () {
            taskText.style.textDecoration = checkbox.checked ? "line-through" : "none";
            saveTasks();
        });

        deleteBtn.addEventListener("click", function () {
            taskDiv.remove();
            saveTasks();
        });


        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(taskText);
        taskDiv.appendChild(deleteBtn);
        taskCard.appendChild(taskDiv);
        taskContainer.appendChild(taskCard);



        if (completed) {
            taskText.style.textDecoration = "line-through";
        }

        saveTasks();
    }


    form.addEventListener("submit", function (event) {
        event.preventDefault();
        addTask(taskInput.value);
        taskInput.value = "";
    });


    loadTasks();


    const date = new Date();
    document.getElementById("date").textContent = date.getFullYear();
});
