const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-form input");
const todolist = document.querySelector(".todo-list");
let todos = [];
const localStorage = window.localStorage;
const TODO_KEY = "todos";

function onToDoFormSubmit(event) {
  event.preventDefault();
  const newTodo = {
    id: Date.now(),
    text: todoInput.value,
  };
  todoInput.value = "";

  appendToDoList(newTodo);
}

function appendToDoList(todo) {
  createNewTodo(todo);

  todos.push(todo);
  localStorage.setItem(TODO_KEY, JSON.stringify(todos));
}

function createNewTodo(todo) {
  const li = document.createElement("li");
  li.id = todo.id;

  const todoSpan = document.createElement("span");
  todoSpan.innerText = `${todo.text} `;

  const delBtn = document.createElement("button");
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", onToDoDelBtnClick);

  li.appendChild(todoSpan);
  li.appendChild(delBtn);
  todolist.appendChild(li);
}

function onToDoDelBtnClick(event) {
  const delList = event.target.parentElement;
  delList.remove();

  todos = todos.filter((todo) => Number(delList.id) !== todo.id);
  localStorage.setItem(TODO_KEY, JSON.stringify(todos));
}

function displayToDos() {
  let tempTodos = localStorage.getItem(TODO_KEY);

  todos = JSON.parse(tempTodos) || [];
  todos.forEach(createNewTodo);
}

todoForm.addEventListener("submit", onToDoFormSubmit);
displayToDos();
