// Initialize Linked List
const taskList = new LinkedList();

// DOM Elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const addAtPriorityBtn = document.getElementById('addAtPriorityBtn');
const priorityInsertGroup = document.getElementById('priorityInsertGroup');
const insertPriorityInput = document.getElementById('insertPriorityInput');
const confirmInsertBtn = document.getElementById('confirmInsertBtn');
const cancelInsertBtn = document.getElementById('cancelInsertBtn');
const removeBtn = document.getElementById('removeBtn');
const clearBtn = document.getElementById('clearBtn');
const searchBtn = document.getElementById('searchBtn');
const deletePriorityInput = document.getElementById('deletePriorityInput');
const deleteByPriorityBtn = document.getElementById('deleteByPriorityBtn');
const linkedListDisplay = document.getElementById('linkedListDisplay');
const taskListDisplay = document.getElementById('taskList');
const totalTasksSpan = document.getElementById('totalTasks');
const operationCountSpan = document.getElementById('operationCount');
const searchModal = document.getElementById('searchModal');
const closeModal = document.querySelector('.close');
const searchInput = document.getElementById('searchInput');
const performSearchBtn = document.getElementById('performSearchBtn');
const searchResult = document.getElementById('searchResult');

// Event Listeners
addBtn.addEventListener('click', addTask);
addAtPriorityBtn.addEventListener('click', showInsertPriorityInput);
confirmInsertBtn.addEventListener('click', insertTaskAtPriority);
cancelInsertBtn.addEventListener('click', hideInsertPriorityInput);
removeBtn.addEventListener('click', removeFirstTask);
clearBtn.addEventListener('click', clearAllTasks);
searchBtn.addEventListener('click', openSearchModal);
deleteByPriorityBtn.addEventListener('click', deleteByPriority);
closeModal.addEventListener('click', closeSearchModal);
performSearchBtn.addEventListener('click', performSearch);

// Allow Enter key to add task
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        if (priorityInsertGroup.style.display === 'flex') {
            insertTaskAtPriority();
        } else {
            addTask();
        }
    }
});

// Allow Enter key for insert priority input
insertPriorityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        insertTaskAtPriority();
    }
});

// Priority input removed - now auto-increments

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === searchModal) {
        closeSearchModal();
    }
});

// Show insert priority input
function showInsertPriorityInput() {
    priorityInsertGroup.style.display = 'flex';
    insertPriorityInput.focus();
}

// Hide insert priority input
function hideInsertPriorityInput() {
    priorityInsertGroup.style.display = 'none';
    insertPriorityInput.value = '';
}

// Add task to linked list (at the end with auto-incrementing priority)
function addTask() {
    const taskName = taskInput.value.trim();
    
    if (!taskName) {
        alert('Please enter a task name!');
        return;
    }
    
    // Auto-increment priority: find the highest priority and add 1
    // This ensures continuous numbering even after deletions
    const tasks = taskList.toArray();
    const maxPriority = tasks.length > 0 
        ? Math.max(...tasks.map(t => t.priority)) 
        : 0;
    const priority = maxPriority + 1;
    
    taskList.addLast(taskName, priority);
    taskInput.value = '';
    updateDisplay();
}

// Insert task at specific priority position
function insertTaskAtPriority() {
    const taskName = taskInput.value.trim();
    const priority = parseInt(insertPriorityInput.value);
    
    if (!taskName) {
        alert('Please enter a task name!');
        return;
    }
    
    if (!priority || priority < 1) {
        alert('Please enter a valid priority number!');
        return;
    }
    
    // Check if priority already exists
    const tasks = taskList.toArray();
    const existingPriority = tasks.find(t => t.priority === priority);
    if (existingPriority) {
        if (!confirm(`Priority ${priority} already exists. Insert anyway? (It will be placed before existing priority ${priority})`)) {
            return;
        }
    }
    
    taskList.insertAtPriority(taskName, priority);
    taskInput.value = '';
    hideInsertPriorityInput();
    updateDisplay();
}

// Remove first task (complete the first task)
function removeFirstTask() {
    if (taskList.isEmpty()) {
        alert('The list is already empty!');
        return;
    }
    
    taskList.removeFirst();
    updateDisplay();
}

// Delete task by priority
function deleteByPriority() {
    const priority = parseInt(deletePriorityInput.value);
    
    if (!priority || priority < 1) {
        alert('Please enter a valid priority number!');
        return;
    }
    
    if (taskList.isEmpty()) {
        alert('The list is already empty!');
        deletePriorityInput.value = '';
        return;
    }
    
    const removedNode = taskList.removeByPriority(priority);
    
    if (removedNode) {
        alert(`Task "${removedNode.data}" with priority ${priority} has been deleted!`);
        deletePriorityInput.value = '';
    } else {
        alert(`No task found with priority ${priority}!`);
        deletePriorityInput.value = '';
    }
    
    updateDisplay();
}

// Clear all tasks
function clearAllTasks() {
    if (taskList.isEmpty()) {
        alert('The list is already empty!');
        return;
    }
    
    if (confirm('Are you sure you want to clear all tasks?')) {
        taskList.clear();
        updateDisplay();
    }
}

// Open search modal
function openSearchModal() {
    searchModal.style.display = 'block';
    searchInput.value = '';
    searchResult.innerHTML = '';
    searchResult.className = 'search-result';
    searchInput.focus();
}

// Close search modal
function closeSearchModal() {
    searchModal.style.display = 'none';
}

// Perform search
function performSearch() {
    const searchTerm = searchInput.value.trim();
    
    if (!searchTerm) {
        alert('Please enter a task name to search!');
        return;
    }
    
    const result = taskList.search(searchTerm);
    
    if (result) {
        searchResult.className = 'search-result found';
        searchResult.innerHTML = `
            <strong>Task Found!</strong><br>
            Task: ${result.node.data}<br>
            Priority: ${result.node.priority}<br>
            Position: ${result.index + 1} (0-indexed: ${result.index})
        `;
        
        // Highlight the found node in visualization
        highlightNode(result.index);
    } else {
        searchResult.className = 'search-result not-found';
        searchResult.innerHTML = `
            <strong>Task Not Found!</strong><br>
            "${searchTerm}" is not in the linked list.
        `;
    }
}

// Highlight a specific node
function highlightNode(index) {
    const nodes = document.querySelectorAll('.node');
    nodes.forEach((node, i) => {
        if (i === index) {
            node.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            node.style.transform = 'scale(1.1)';
            setTimeout(() => {
                node.style.background = '';
                node.style.transform = '';
            }, 2000);
        }
    });
}

// Update the display
function updateDisplay() {
    updateVisualization();
    updateTaskList();
    updateStats();
}

// Update linked list visualization
function updateVisualization() {
    linkedListDisplay.innerHTML = '';
    
    if (taskList.isEmpty()) {
        linkedListDisplay.innerHTML = '<div class="empty-state"><p>No tasks yet. Add your first task to start!</p></div>';
        return;
    }
    
    let current = taskList.head;
    let index = 0;
    
    while (current) {
        // Create node element
        const nodeDiv = document.createElement('div');
        nodeDiv.className = 'node';
        nodeDiv.innerHTML = `
            <div class="node-data">
                <div class="node-task">${escapeHtml(current.data)}</div>
                <div class="node-priority">Priority: ${current.priority}</div>
            </div>
            <div class="node-pointer">${current.next ? '↓' : 'NULL'}</div>
        `;
        
        linkedListDisplay.appendChild(nodeDiv);
        
        // Add arrow if not last node
        if (current.next) {
            const arrow = document.createElement('span');
            arrow.className = 'arrow';
            arrow.textContent = '→';
            linkedListDisplay.appendChild(arrow);
        }
        
        current = current.next;
        index++;
    }
}

// Update task list (traversal order)
function updateTaskList() {
    taskListDisplay.innerHTML = '';
    
    if (taskList.isEmpty()) {
        taskListDisplay.innerHTML = '<p class="empty-message">No tasks in the list</p>';
        return;
    }
    
    const tasks = taskList.toArray();
    
    tasks.forEach((task) => {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        taskItem.innerHTML = `
            <span class="task-item-index">#${task.index + 1}</span>
            <div class="task-item-info">
                <div class="task-item-name">${escapeHtml(task.data)}</div>
                <div class="task-item-priority">Priority: ${task.priority}</div>
            </div>
        `;
        taskListDisplay.appendChild(taskItem);
    });
}

// Update statistics
function updateStats() {
    totalTasksSpan.textContent = taskList.getSize();
    operationCountSpan.textContent = taskList.getOperationCount();
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize display
updateDisplay();