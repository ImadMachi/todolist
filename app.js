// SELECT HTML ELEMENTS
const button = document.getElementById('button');
const input = document.getElementById('input');
const list = document.getElementById('list');

// VARIABLES
let todos;
let id;
let data = localStorage.getItem('TODOLIST');

if (data) {
  todos = JSON.parse(data);
  id = todos[todos.length - 1].id + 1;
} else {
  todos = [];
  id = 0;
}
loadTodo(todos);

// LOAD TODO
function loadTodo(array) {
  localStorage.setItem('TODOLIST', JSON.stringify(array));

  list.innerHTML = '';
  array.forEach(function (elem) {
    const done = elem.completed ? 'lineThrough' : '';
    const line = elem.completed ? 'fa-check-circle' : 'fa-circle-thin';
    const template = `
        <li class="item">
        <i class="fa ${line} co" job="complete" id="${elem.id}"></i>
        <p class="text ${done}">${elem.name}</p>
        <i class="fa fa-trash-o de" job="delete" id="${elem.id}"></i>
      </li>
        `;
    list.insertAdjacentHTML('beforeend', template);
  });
}

// ADDTODO
function addTodo(todo) {
  todos.push({
    name: todo,
    id: id++,
    completed: false,
  });
  loadTodo(todos);
}

//DELETE TODO
function deleteTodo(id) {
  todos = todos.filter(function (elem) {
    return elem.id != id;
  });
  loadTodo(todos);
}

// TOGGLE TODO
function toggleTodo(id) {
  todos = todos.map(function (elem) {
    if (elem.id == id) {
      return {
        name: elem.name,
        id: elem.id,
        completed: !elem.completed,
      };
    }
    return elem;
  });
  loadTodo(todos);
}

// EVENTS
button.addEventListener('click', function () {
  const value = input.value;
  addTodo(value);
  input.value = '';
});

list.addEventListener('click', function (event) {
  const element = event.target;
  if (element.attributes.job.value == 'delete') {
    const myId = element.id;
    deleteTodo(myId);
  }
  if (element.attributes.job.value == 'complete') {
    const myId = element.id;
    toggleTodo(myId);
  }
});
