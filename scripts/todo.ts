interface TodoItem {
    id: number;
    text: string;
    completed: boolean;
}

let taskIdCounter = 0;
const tasks: TodoItem[] = [];

const taskInput = document.querySelector('.task-input') as HTMLInputElement;
const addTaskBtn = document.querySelector('.add-task-button') as HTMLButtonElement;
const tasksContainer = document.querySelector('.tasks') as HTMLDivElement;

document.addEventListener('DOMContentLoaded', () => {
    renderAllTasks();
    addTaskBtn.addEventListener('click', addTask);
});

function addTask(): void {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const newTask: TodoItem = {
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

function renderTask(task: TodoItem): void {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    taskElement.id = `task-${task.id}`;

    const taskContent = document.createElement('span');
    taskContent.textContent = task.text;
    taskContent.classList.add('task-content');

    const taskInputField = document.createElement('input');
    taskInputField.type = 'text';
    taskInputField.classList.add('task-edit-input');
    taskInputField.value = task.text;
    taskInputField.style.display = 'none';

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttons-container');

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-task-button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => {
        if (taskContent.style.display !== 'none') {
            taskContent.style.display = 'none';
            taskInputField.style.display = 'inline-block';
            editBtn.textContent = 'Save';
            taskInputField.focus();
        } else {
            const newTaskText = taskInputField.value.trim();
            if (newTaskText !== '') {
                task.text = newTaskText;
                taskContent.textContent = newTaskText;
            }
            taskContent.style.display = 'inline-block';
            taskInputField.style.display = 'none';
            editBtn.textContent = 'Edit';
        }
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-task-button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        tasks.splice(tasks.indexOf(task), 1);
        const taskToRemove = document.getElementById(taskElement.id);
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

function renderAllTasks(): void {
    tasksContainer.innerHTML = '';
    tasks.forEach(task => renderTask(task));
}
