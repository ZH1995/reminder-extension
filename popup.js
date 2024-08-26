document.getElementById('addTask').addEventListener('click', function() {
    const task = document.getElementById('task').value;
    if (task) {
      chrome.storage.sync.get('tasks', function(data) {
        let tasks = data.tasks || [];
  
        tasks.push({ task: task, completed: false });
  
        chrome.storage.sync.set({ tasks: tasks }, function() {
          displayTasks();
          document.getElementById('task').value = '';
        });
      });
    }
  });
  
  function displayTasks() {
    chrome.storage.sync.get('tasks', function(data) {
        const tasks = data.tasks || [];
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';
    
        tasks.forEach(function(taskItem, index) {
          const listItem = document.createElement('li');
          listItem.textContent = taskItem.task;
    
          if (taskItem.completed) {
            listItem.classList.add('completed');
          } 
    
          const completeButton = document.createElement('button');
          completeButton.textContent = taskItem.completed ? '已完成' : '完成';
          completeButton.addEventListener('click', function() {
            completeTask(index);
          });
    
          const deleteButton = document.createElement('button');
          deleteButton.textContent = '删除';
          deleteButton.className = 'delete-button';
          deleteButton.addEventListener('click', function() {
            deleteTask(index);
          });
    
          listItem.appendChild(completeButton);
          listItem.appendChild(deleteButton);
          taskList.appendChild(listItem);
        });
      });
  }
  
  function completeTask(index) {
    chrome.storage.sync.get('tasks', function(data) {
      let tasks = data.tasks || [];
      tasks[index].completed = true;
      chrome.storage.sync.set({ tasks: tasks }, function() {
        displayTasks();
      });
    });
  }
  
  // 删除任务的功能
  function deleteTask(index) {
    chrome.storage.sync.get('tasks', function(data) {
      let tasks = data.tasks || [];
      tasks.splice(index, 1); // 删除指定索引的任务
      chrome.storage.sync.set({ tasks: tasks }, function() {
        displayTasks();
      });
    });
  }
  
  displayTasks();
  