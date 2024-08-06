var taskIdCounter = 0;
var tasks = [];
var taskInput = document.querySelector('.task-input');
var addTaskBtn = document.querySelector('.add-task-button');
var tasksContainer = document.querySelector('.tasks');
document.addEventListener('DOMContentLoaded', function () {
    renderAllTasks();
    addTaskBtn.addEventListener('click', addTask);
});
function addTask() {
    var taskText = taskInput.value.trim();
    if (taskText !== '') {
        var newTask = {
            id: taskIdCounter++,
            text: taskText,
            completed: false
        };
        tasks.push(newTask);
        renderTask(newTask);
        taskInput.value = '';
        taskInput.focus();
    }
}
function renderTask(task) {
    var taskElement = document.createElement('div');
    taskElement.classList.add('task');
    taskElement.id = "task-".concat(task.id);
    var taskContent = document.createElement('span');
    taskContent.textContent = task.text;
    taskContent.classList.add('task-content');
    var taskInputField = document.createElement('input');
    taskInputField.type = 'text';
    taskInputField.classList.add('task-edit-input');
    taskInputField.value = task.text;
    taskInputField.style.display = 'none';
    var buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttons-container');
    var editBtn = document.createElement('button');
    editBtn.classList.add('edit-task-button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', function () {
        if (taskContent.style.display !== 'none') {
            taskContent.style.display = 'none';
            taskInputField.style.display = 'inline-block';
            editBtn.textContent = 'Save';
            taskInputField.focus();
        }
        else {
            var newTaskText = taskInputField.value.trim();
            if (newTaskText !== '') {
                task.text = newTaskText;
                taskContent.textContent = newTaskText;
            }
            taskContent.style.display = 'inline-block';
            taskInputField.style.display = 'none';
            editBtn.textContent = 'Edit';
        }
    });
    var deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-task-button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', function () {
        tasks.splice(tasks.indexOf(task), 1);
        var taskToRemove = document.getElementById(taskElement.id);
        if (taskToRemove) {
            tasksContainer.removeChild(taskToRemove);
        }
    });
    buttonsContainer.appendChild(editBtn);
    buttonsContainer.appendChild(deleteBtn);
    taskElement.appendChild(taskContent);
    taskElement.appendChild(taskInputField);
    taskElement.appendChild(buttonsContainer);
    tasksContainer.appendChild(taskElement);
}
function renderAllTasks() {
    tasksContainer.innerHTML = '';
    tasks.forEach(function (task) { return renderTask(task); });
}
