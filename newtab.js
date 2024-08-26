function displayTasks() {
    chrome.storage.sync.get('tasks', function(data) {
        const tasks = data.tasks || [];
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';

        tasks.forEach(function(taskItem, index) {
            if (!taskItem.completed) {
                const listItem = document.createElement('li');
                listItem.textContent = taskItem.task;

                const completeButton = document.createElement('button');
                completeButton.textContent = '完成';
                completeButton.addEventListener('click', function() {
                    completeTask(index);
                });

                listItem.appendChild(completeButton);
                taskList.appendChild(listItem);
            }
        });
    });
}

function completeTask(index) {
    chrome.storage.sync.get('tasks', function(data) {
        const tasks = data.tasks || [];
        tasks[index].completed = true;
        chrome.storage.sync.set({tasks: tasks}, function() {
            displayTasks();
        });
    });
}

document.getElementById('clearTasks').addEventListener('click', function() {
    chrome.storage.sync.set({tasks: []}, function() {
        displayTasks();
    });
});

displayTasks();
