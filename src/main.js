import {createMenuTemplate} from './view/menu.js';
import {createFilterTemplate} from './view/filter.js';
import {createBoardTemplate} from './view/board.js';
import {createSortingTemplate} from './view/sorting.js';
import {createTaskTemplate} from './view/task.js';
import {createTaskEditTemplate} from './view/task-edit.js';
import {createLoadBtnTemplate} from './view/load-button.js';

const TASKS_COUNT = 3;


const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// render components
const headerElement = document.querySelector(`.main__control`);
render(headerElement, createMenuTemplate(), `beforeend`);

render(headerElement, createFilterTemplate(), `afterend`);

const filterElement = document.querySelector(`.main__filter`);
render(filterElement, createBoardTemplate(), `afterend`);

const boardElement = document.querySelector(`.board`);
render(boardElement, createSortingTemplate(), `afterbegin`);

const tasksListElement = boardElement.querySelector(`.board__tasks`);
for (let i = 0; i < TASKS_COUNT; i++) {
  render(tasksListElement, createTaskTemplate(), `afterbegin`);
}

render(tasksListElement, createTaskEditTemplate(), `afterbegin`);
render(boardElement, createLoadBtnTemplate(), `beforeend`);
