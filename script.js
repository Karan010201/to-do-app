document.addEventListener('DOMContentLoaded', function () {
    const input = document.querySelector('#inputField');
    const addBtn = document.querySelector('#addBtn');
    const taskContainer = document.querySelector('#tasks');

    // Load tasks from localStorage
    const loadTasks = () => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.forEach(({ text, completed }) => {
            const list = document.createElement('li');
            list.textContent = text;
            if (completed) list.style.textDecoration = 'line-through';
            taskContainer.appendChild(createTaskElement(list));
        });
    };

    // Save tasks to localStorage
    const saveTasks = () => {
        const tasks = Array.from(taskContainer.children).map(task => ({
            text: task.firstChild.textContent.trim(),
            completed: task.style.textDecoration === 'line-through',
        }));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Create Task Element
    const createTaskElement = (list) => {
        const editTaskDiv = document.createElement('div');
        editTaskDiv.classList.add('task-actions');

        const createButton = (icon, callback) => {
            const btn = document.createElement('button');
            btn.innerHTML = icon;
            btn.classList.add('btn');
            btn.addEventListener('click', callback);
            return btn;
        };

        const completeTask = createButton('<i class="fa-solid fa-check"></i>', () => {
            list.style.textDecoration = 'line-through';
            saveTasks();
        });

        const editTask = createButton('<i class="fa-solid fa-pen-to-square"></i>', () => {
            const updateTask = prompt('Edit Task:').trim();
            if (!updateTask) {
                alert('Please enter a valid task.');
                return;
            }
            list.firstChild.textContent = updateTask;
            saveTasks();
        });

        const deleteTask = createButton('<i class="fa-solid fa-trash"></i>', () => {
            list.remove();
            saveTasks();
        });

        editTaskDiv.append(completeTask, editTask, deleteTask);
        list.appendChild(editTaskDiv);

        return list;
    };

    // Add a new task
    const addTask = () => {
        const inputTask = input.value.trim();
        if (!inputTask) {
            alert('Please enter a valid task.');
            return;
        }
        const list = document.createElement('li');
        list.textContent = inputTask;
        taskContainer.appendChild(createTaskElement(list));
        input.value = '';
        saveTasks();
    };

    addBtn.addEventListener('click', addTask);
    input.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') addTask();
    });

    loadTasks(); // Load tasks on page load
});
