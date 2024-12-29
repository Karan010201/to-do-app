let inputTask = document.querySelector('.heading');
let addBtn = document.querySelector('#addBtn');
let taskList = document.querySelector('.list');

addBtn.addEventListener('click' , function () {
    let task = inputTask.value.trim();
    if(task === '') {
        alert('Empty task, Please enter a task');
        return;
    }

    //creating a list item element
    let list = document.createElement('li');
    list.textContent = task;
    // console.log(list);

    //append the list item to the task list
    taskList.appendChild(list);

    //creating a delete task button
    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete Task';

    list.appendChild(deleteBtn);

    deleteBtn.addEventListener('click' , function() {
        list.remove();
    });
    inputTask.value = '';

})