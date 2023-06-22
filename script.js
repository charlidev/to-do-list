// Info date
const dateNumber = document.getElementById('dateNumber');
const dateText = document.getElementById('dateText');
const dateMonth = document.getElementById('dateMonth');
const dateYear = document.getElementById('dateYear');

// Tasks Container
const tasksContainer = document.getElementById('tasksContainer');

const setDate = () => {
    const date = new Date();
    dateNumber.textContent = date.toLocaleString('es', { day: 'numeric' });
    dateText.textContent = date.toLocaleString('es', { weekday: 'long' });
    dateMonth.textContent = date.toLocaleString('es', { month: 'short' });
    dateYear.textContent = date.toLocaleString('es', { year: 'numeric' });
};

const loadTasks = () => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasksContainer.innerHTML = savedTasks;
        addClickEventToTasks();
    }
};

const saveTasks = () => {
    localStorage.setItem('tasks', tasksContainer.innerHTML);
};

const addClickEventToTasks = () => {
    const tasks = document.querySelectorAll('.task');
    tasks.forEach(task => {
        task.addEventListener('click', changeTaskState);
    });
};

const addNewTask = event => {
    event.preventDefault();
    const { value } = event.target.taskText;
    if (!value) return;
    const task = document.createElement('div');
    task.classList.add('task', 'roundBorder');
    task.textContent = value;
    tasksContainer.prepend(task);
    event.target.reset();
    addClickEventToTasks();
    saveTasks();
};

const changeTaskState = event => {
    event.target.classList.toggle('done');
    saveTasks();
};

const order = () => {
    const done = [];
    const toDo = [];
    tasksContainer.childNodes.forEach(el => {
        el.classList.contains('done') ? done.push(el) : toDo.push(el);
    });
    return [...toDo, ...done];
};

const renderOrderedTasks = () => {
    order().forEach(el => tasksContainer.appendChild(el));
};

window.addEventListener('DOMContentLoaded', () => {
    setDate();
    loadTasks();
});

