//Selectors
const todoInput = document.querySelector('.toDoInput');
const todoBtn = document.querySelector('.toDoBtn');
const toDoList = document.querySelector('.toDoList');
const filterOption = document.querySelector('.filterTodo');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoBtn.addEventListener('click', addToDo);
toDoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Functions

function addToDo(event) {
  //Prevent form from submitting
  event.preventDefault();
  //ToDo Div
  const toDoDiv = document.createElement('div');
  toDoDiv.classList.add('toDo');
  //create LI
  const newToDo = document.createElement('li');
  newToDo.innerText = todoInput.value;
  newToDo.classList.add('toDoItem');
  toDoDiv.appendChild(newToDo);
  // add todo to local storage
  saveLocalTodos(todoInput.value);
  //completed Button
  const completedBtn = document.createElement('button');
  completedBtn.innerHTML = '<i class = "fas fa-check"></i>';
  completedBtn.classList.add('completeBtn');
  toDoDiv.appendChild(completedBtn);
  // trash button
  const trashBtn = document.createElement('button');
  trashBtn.innerHTML = '<i class = "fas fa-trash"></i>';
  trashBtn.classList.add('trashBtn');
  toDoDiv.appendChild(trashBtn);
  //append to list
  toDoList.appendChild(toDoDiv);
  //Clear Todo INPUT value
  todoInput.value = '';
}

function deleteCheck(e) {
  const item = e.target;
  //Delete todo
  if (item.classList[0] === 'trashBtn') {
    const todo = item.parentElement;
    // animation
    todo.classList.add('fall');
    removeLocalTodos(todo);
    // waiting for the transition to end, then removing the todo
    todo.addEventListener('transitionend', function () {
      todo.remove();
    });
  }
  //Check mark
  if (item.classList[0] === 'completeBtn') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}

// filtering the completed, uncompleted and all tasks

function filterTodo(e) {
  const todos = toDoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
    }
  });
}

//saving the todos to local storage

function saveLocalTodos(todo) {
  //checking if we already have tasks in the local storage
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

//geting already existing tasks

function getTodos() {
  let todos;
  //checking if we already have tasks in the local storage
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function (todo) {
    //ToDo Div
    const toDoDiv = document.createElement('div');
    toDoDiv.classList.add('toDo');
    //create LI
    const newToDo = document.createElement('li');
    newToDo.innerText = todo;
    newToDo.classList.add('toDoItem');
    toDoDiv.appendChild(newToDo);
    //completed Button
    const completedBtn = document.createElement('button');
    completedBtn.innerHTML = '<i class = "fas fa-check"></i>';
    completedBtn.classList.add('completeBtn');
    toDoDiv.appendChild(completedBtn);
    // trash button
    const trashBtn = document.createElement('button');
    trashBtn.innerHTML = '<i class = "fas fa-trash"></i>';
    trashBtn.classList.add('trashBtn');
    toDoDiv.appendChild(trashBtn);
    //append to list
    toDoList.appendChild(toDoDiv);
  });
}

// remove local todos
function removeLocalTodos(todo) {
  //Check if there are existing tasks already
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}
