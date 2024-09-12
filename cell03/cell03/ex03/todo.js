document.addEventListener('DOMContentLoaded', function() {
    const ftList = document.getElementById('ft_list');
    const newBtn = document.getElementById('newBtn');

    loadTodos();

    newBtn.addEventListener('click', function() {
        const todo = prompt('Enter a new TO DO:');
        if (todo && todo.trim() !== '') {
            addTodo(todo);
            saveTodos();
        }
    });

    function addTodo(todo) {
        const div = document.createElement('div');
        div.className = 'todo-item';
        
        const todoText = document.createElement('span');
        todoText.textContent = todo;
        div.appendChild(todoText);

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';
        removeBtn.addEventListener('click', function() {
            if (confirm('Do you want to remove this TO DO?')) {
                ftList.removeChild(div);
                saveTodos();
            }
        });
        div.appendChild(removeBtn);

        ftList.insertBefore(div, ftList.firstChild);
    }

    function saveTodos() {
        const todos = Array.from(ftList.children).map(div => div.firstChild.textContent);
        document.cookie = `todos=${JSON.stringify(todos)}; expires=${new Date(Date.now() + 86400000).toUTCString()}`;
    }

    function loadTodos() {
        const cookie = document.cookie.split('; ').find(row => row.startsWith('todos='));
        if (cookie) {
            const todos = JSON.parse(cookie.split('=')[1]);
            todos.forEach(addTodo);
        }
    }
});