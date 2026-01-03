import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const openModal = (modal) => {
  modal.classList.add("popup_visible");
  modal.focus();
  const handleEscapeKey = (event) => {
    if (event.key === "Escape") {
      closeModal(modal);
    }
  };
  const handleClickOutside = (event) => {
    if (event.target === modal) {
      closeModal(modal);
    }
  };
  modal.addEventListener("keydown", handleEscapeKey);
  modal.addEventListener("click", handleClickOutside);
  modal._escapeHandler = handleEscapeKey;
  modal._clickHandler = handleClickOutside;
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
  if (modal._escapeHandler) {
    modal.removeEventListener("keydown", modal._escapeHandler);
    delete modal._escapeHandler;
  }
  if (modal._clickHandler) {
    modal.removeEventListener("click", modal._clickHandler);
    delete modal._clickHandler;
  }
};

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView();

  return todoElement;
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4();
  const values = { name, date, id };
  const todo = generateTodo(values);
  todosList.append(todo);
  closeModal(addTodoPopup);
  newTodoValidator.resetValidation();
});

initialTodos.forEach((item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
