import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../utils/Section.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.querySelector("#add-todo-popup .popup__form");
const todosList = document.querySelector(".todos__list");
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
  }
  todoCounter.updateTotal(false);
}

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView();

  return todoElement;
};

function renderTodo(todoData) {
  const todoElement = generateTodo(todoData);
  todosList.append(todoElement);
}

const handleAddTodoSubmit = (inputValues) => {
  const name = inputValues.name;
  const dateInput = inputValues.date;

  const newTodo = {
    name: name,
    date: dateInput,
    id: uuidv4(),
  };

  renderTodo(newTodo);
  todoCounter.updateTotal(true);
  addTodoPopup.close();
};

const addTodoPopup = new PopupWithForm("#add-todo-popup", handleAddTodoSubmit);
addTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const todoSection = new Section({
  items: initialTodos,
  renderer: (todoData) => {
    const todoElement = generateTodo(todoData);
    todoSection.addItem(todoElement);
  },
  containerSelector: ".todos__list",
});

todoSection.renderItems();

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
