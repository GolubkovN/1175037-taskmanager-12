import {createMenuTemplate} from './view/menu.js';
import {createFilterTemplate} from './view/filter.js';
import {createBoardTemplate} from './view/board.js';
import {createSortingTemplate} from './view/sorting.js';
import {createTaskTemplate} from './view/task.js';
import {createTaskEditTemplate} from './view/task-edit.js';
import {createLoadBtnTemplate} from './view/load-button.js';
import {generateTask} from './mock/tasks';

const TASKS_COUNT = 4;

const tasks = new Array(TASKS_COUNT).fill().map(generateTask);

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
  render(tasksListElement, createTaskTemplate(tasks[i]), `afterbegin`);
}

render(tasksListElement, createTaskEditTemplate(), `afterbegin`);
render(boardElement, createLoadBtnTemplate(), `beforeend`);
