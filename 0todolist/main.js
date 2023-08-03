let box = document.getElementById("box");
let add = document.getElementById("add");
let listItem = document.getElementById("listItem");

function addTodo() {
  let inputText = box.value;
  if (inputText == "") {
    alert("write something in input field");
    return false;
  }

  const li = document.createElement("li");
  const p = document.createElement("p");
  p.innerHTML = inputText;
  p.classList.add("text");
  li.appendChild(p);

  const EditBtn = document.createElement("button");
  EditBtn.innerText = "Edit";
  EditBtn.classList.add("edit");
  li.appendChild(EditBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.classList.add("delete");
  li.appendChild(deleteBtn);

  listItem.appendChild(li);

  box.value = "";
  saveLocalTodo(inputText);
}
function updateList(e) {
  if (e.target.innerText === "Delete") {
    let final = confirm("are you sure to delete ?");
    // todoList.removeChild(e.target.parentElement);
    if (final === true) {
      listItem.removeChild(e.target.parentElement);
    }
    deleteFromLocal(e.target.parentElement);
  }
  if (e.target.innerText === "Edit") {
    box.value = e.target.previousElementSibling.innerHTML;
    box.focus();
    listItem.removeChild(e.target.parentElement);
    EditTodoInLocal(e.target.previousElementSibling.innerHTML);
  }
}
function saveLocalTodo(todo) {
  let todoItems;
  if (localStorage.getItem("todoList") === null) {
    todoItems = [];
  } else {
    todoItems = JSON.parse(localStorage.getItem("todoList"));
  }
  todoItems.push(todo);
  localStorage.setItem("todoList", JSON.stringify(todoItems));
}

function getTodoFromLocal() {
  let todoItems;
  if (localStorage.getItem("todoList") === null) {
    todoItems = [];
  } else {
    todoItems = JSON.parse(localStorage.getItem("todoList"));
  }
  todoItems.forEach((todo) => {
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = todo;
    p.classList.add("text");
    li.appendChild(p);

    const EditBtn = document.createElement("button");
    EditBtn.innerText = "Edit";
    EditBtn.classList.add("edit");
    li.appendChild(EditBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.classList.add("delete");
    li.appendChild(deleteBtn);

    listItem.appendChild(li);

    box.value = "";
  });
}
function deleteFromLocal(todo) {
  let todoItems;
  if (localStorage.getItem("todoList") === null) {
    todoItems = [];
  } else {
    todoItems = JSON.parse(localStorage.getItem("todoList"));
  }
  let todoText = todo.children[0].innerHTML;
  let todoIndex = todoItems.indexOf(todoText);
  todoItems.splice(todoIndex, 1);
  localStorage.setItem("todoList", JSON.stringify(todoItems));
}
function EditTodoInLocal(todo) {
  let todoItems;
  if (localStorage.getItem("todoList") === null) {
    todoItems = [];
  } else {
    todoItems = JSON.parse(localStorage.getItem("todoList"));
  }
  let todoText = todo;
  let todoIndex = todoItems.indexOf(todoText);
  todoItems.splice(todoIndex, 1);
  box.value = todoText;
  localStorage.setItem("todoList", JSON.stringify(todoItems));
  // let editTodo = JSON.parse(localStorage.getItem("todolist"));
  // let editIndex = editTodo.indexOf(todo);
  // editTodo[editIndex] = inputBox.value;
  // localStorage.setItem("todolist",JSON.stringify(todo));
}

document.addEventListener("DOMContentLoaded", getTodoFromLocal);
listItem.addEventListener("click", updateList);
