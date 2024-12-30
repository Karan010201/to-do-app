document.addEventListener('DOMContentLoaded', function () {
    const input = document.querySelector('#inputField');
    const addBtn = document.querySelector('#addBtn');
    const taskContainer = document.querySelector('#tasks');

    addBtn.addEventListener('click', function () {
        const inputTask = input.value.trim();
        if (!inputTask) {
            alert('Please enter a valid task.');
            return;
        }

        const list = document.createElement('li');
        list.textContent = inputTask;

        const editTaskDiv = document.createElement('div');
        editTaskDiv.classList.add('task-actions');

        // Create Buttons
        const createButton = (icon, callback) => {
            const btn = document.createElement('button');
            btn.innerHTML = icon;
            btn.classList.add('btn');
            btn.addEventListener('click', callback);
            return btn;
        };

        const completeTask = createButton('<i class="fa-solid fa-check"></i>', () => {
            list.style.textDecoration = 'line-through';
        });

        const editTask = createButton('<i class="fa-solid fa-pen-to-square"></i>', () => {
            const updateTask = prompt('Edit Task:').trim();
            if (!updateTask) {
                alert('Please enter a valid task.');
                return;
            }
            list.textContent = updateTask;
            list.appendChild(editTaskDiv);
        });

        const deleteTask = createButton('<i class="fa-solid fa-trash"></i>', () => {
            list.remove();
        });

        // Append Buttons to Div
        editTaskDiv.append(completeTask, editTask, deleteTask);
        list.appendChild(editTaskDiv);

        taskContainer.appendChild(list);
        input.value = '';
    });
});
