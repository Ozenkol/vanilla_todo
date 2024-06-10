const todos = ['Walk in room', 'Cook meat', 'Relax'];


//JS reference to HTML elements
const addTodoInput = document.getElementById('todo-input');
const addTodoButton = document.getElementById('add-todo-btn');
const todosList = document.getElementById('todos-list');

//Initialize view
for (const todo of todos) {
    todosList.append(renderTodoInReadMode(todo))
}

//Add event listneners
addTodoInput.addEventListener(
    'input',
    () => {
        addTodoButton.disabled = addTodoInput.value.length < 3;
    }
)

addTodoButton.addEventListener(
    'keydown',
    ({ key }) => {
        if (key == 'Enter' && addTodoInput.value.length >=3) {
            addTodo();
        }
    }
)

addTodoButton.addEventListener(
    'click',
    () => {
        addTodo();
    }
)

//Functions
function renderTodoInReadMode(todo) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = todo;
    span.addEventListener('dblclick',
        () => {
            const idx = todos.indexOf(todo);
            todosList.replaceChild(
                renderTodoInEditMode(todo),
                todosList.childNodes[idx]
            )
        }
    )
    li.append(span);

    const butoon = document.createElement('button')
    butoon.textContent = 'Done'
    butoon.addEventListener(
        'click',
        () => {
            const idx = todos.indexOf(todo)
            removeTodo(idx)
        }
    )
    li.append(butoon)

    return li;
}

function renderTodoInEditMode(todo) {
    const li = document.createElement('li')

    const input = document.createElement('input')
    input.type = 'text'
    input.value = todo
    li.append(input)

    const saveBtn = document.createElement('button')
    saveBtn.textContent = 'Save'
    saveBtn.addEventListener(
        'click',
        () => {
            const idx = todos.indexOf(todo)
            updateTodo(idx, input.value)
        }
    )
    li.append(saveBtn)

    const cancelBtn = document.createElement('button')
    cancelBtn.textContent = 'Cancel'
    cancelBtn.addEventListener(
        'click',
        () => {
            const idx = todos.indexOf(todo)
            todosList.replaceChild(
                renderTodoInReadMode(todo),
                todosList.childNodes[idx]
            )
        }
    )
    li.append(cancelBtn)

    return li

}

function addTodo() {
    const description = addTodoInput.value

    todos.push(description)
    const todo = renderTodoInReadMode(description)
    todosList.append(todo)

    addTodoInput.value = ''
    addTodoButton.disabled = true
}

function removeTodo(index) {
    todos.splice(index, 1)
    todosList.childNodes[index].remove()
}

function updateTodo(index, description) {
    todos[index] = description
    const todo = renderTodoInReadMode(description)
    todosList.replaceChild(todo, todosList.childNodes[index])
}