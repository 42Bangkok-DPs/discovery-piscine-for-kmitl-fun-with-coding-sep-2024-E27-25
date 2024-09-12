$(document).ready(function() {
    const $ftList = $('#ft_list');
    const $newBtn = $('#newBtn');

    loadTodos();

    $newBtn.on('click', function() {
        const todo = prompt('Enter a new TO DO:');
        if (todo && todo.trim() !== '') {
            addTodo(todo);
            saveTodos();
        }
    });

    function addTodo(todo) {
        const $div = $('<div>').addClass('todo-item');
        const $todoText = $('<span>').text(todo);
        const $removeBtn = $('<button>').text('Remove').addClass('remove-btn');

        $removeBtn.on('click', function() {
            if (confirm('Do you want to remove this TO DO?')) {
                $div.remove();
                saveTodos();
            }
        });

        $div.append($todoText).append($removeBtn);
        $ftList.prepend($div);
    }

    function saveTodos() {
        const todos = $ftList.children().map(function() {
            return $(this).find('span').text();
        }).get();
        document.cookie = `todos=${JSON.stringify(todos)}; expires=${new Date(Date.now() + 86400000).toUTCString()}`;
    }

    function loadTodos() {
        const cookie = document.cookie.split('; ').find(row => row.startsWith('todos='));
        if (cookie) {
            const todos = JSON.parse(cookie.split('=')[1]);
            $.each(todos, function(_, todo) {
                addTodo(todo);
            });
        }
    }
});
