import { createTodoList } from "./toDo.js";
const {
  getToDos,
  addToDos,
  removeToDos,
  changeToDos,
  removeAll,
  getToDoById,
  saveTodo,
} = createTodoList();
// render
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const todoAddBtn = document.getElementById("todo-add-btn");
const todoInvalidFeedback = document.querySelector(".invalid-feedback");
console.log(todoInvalidFeedback);
todoList.addEventListener("change", (e) => {
  if (e.target.matches(`input.is-complete`)) {
    console.log(e.target.closest(`li.to-do-item`).dataset.toDoId);
    handleIsCompleteChange(
      Number(e.target.closest(`li.to-do-item`).dataset.toDoId)
    );
  }
});
todoList.addEventListener("click", (e) => {
  if (e.target.closest(`.todo-remove-btn`)) {
    handleRemoveTodo(Number(e.target.closest(`li.to-do-item`).dataset.toDoId));
  }
});
function renderEmptyNotificationList() {
  return ` <div class="bg-light rounded text-center p-3">
  <h1 class="display-3 fw-bold">Well done!!!</h1>
  <p>you are all done for today, go titfanen on the beach</p>
</div>`;
}

function renderTodoItem({ id, title, isCorrect }) {
  return `
  <li data-to-do-id="${id}" class="to-do-item list-group-item d-flex justify-content-between">
    <input
      class="form-check-input me-1 is-complete"
      type="checkbox"
      id="todo-${id}"
    
      ${isCorrect ? "checked" : ""}
    />
   
   
    <label
      class="form-check-label mx-1 flex-fill  ${
        isCorrect ? `text-muted text-decoration-line-through` : ""
      }"
      for="todo-${id}"
    >
      ${title}
    </label>
    <button class=" todo-remove-btn bg-danger" >
    <i class="bi bi-trash3"></i></button>
  </li>`;
}
function renderList(...toDos) {
  toDos.sort((a, b) => Number(a.isCorrect) - Number(b.isCorrect));
  let html = `<ul class="list-group">`;
  for (const todo of toDos) {
    html += renderTodoItem(todo);
  }
  html += `</ul>`;
  return html;
}
renderToApp();
todoAddBtn.addEventListener("click", handleAddTodo);
todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleAddTodo();
  }
});
function handleRemoveTodo(id) {
  removeToDos(id);
  renderToApp();
}
function renderToApp() {
  const toDos = getToDos();
  todoList.innerHTML =
    toDos.length > 0 ? renderList(...toDos) : renderEmptyNotificationList();
}
function handleAddTodo() {
  renderError();
  try {
    addToDos(todoInput.value);
    todoInput.value = "";
    renderToApp();
  } catch (err) {
    renderError(err.message);
  }
}
function renderError(err) {
  if (!err) {
    todoInput.classList.remove("is-invalid");
    todoInvalidFeedback.innerHTML = "";
    return;
  }

  todoInput.classList.add("is-invalid");
  todoInvalidFeedback.innerHTML = err;
}
function handleIsCompleteChange(id) {
  changeToDos(id);
  renderToApp();
}
