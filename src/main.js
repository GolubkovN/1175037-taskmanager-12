import {createMenuTemplate} from './view/menu.js';
import {createFilterTemplate} from './view/filter.js';
import {createBoardTemplate} from './view/board.js';
import {createSortingTemplate} from './view/sorting.js';
import {createTaskTemplate} from './view/task.js';
import {createTaskEditTemplate} from './view/task-edit.js';
import {createLoadBtnTemplate} from './view/load-button.js';
import {generateTask} from './mock/tasks.js';
import {generateFilter} from './mock/filter.js';

const TASKS_COUNT = 22;
const TASK_COUNT_PER_STEP = 8;

const tasks = new Array(TASKS_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// render components
const headerElement = document.querySelector(`.main__control`);
render(headerElement, createMenuTemplate(), `beforeend`);

render(headerElement, createFilterTemplate(filters), `afterend`);

const filterElement = document.querySelector(`.main__filter`);
render(filterElement, createBoardTemplate(), `afterend`);

const boardElement = document.querySelector(`.board`);
render(boardElement, createSortingTemplate(), `afterbegin`);

const tasksListElement = boardElement.querySelector(`.board__tasks`);

for (let i = 1; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i++) {
  render(tasksListElement, createTaskTemplate(tasks[i]), `afterbegin`);
}

render(tasksListElement, createTaskEditTemplate(tasks[0]), `afterbegin`);

if (tasks.length > TASK_COUNT_PER_STEP) {

  let renderedTaskCount = TASK_COUNT_PER_STEP;

  render(boardElement, createLoadBtnTemplate(), `beforeend`);

  const loadMoreButton = boardElement.querySelector(`.load-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    tasks.slice(renderedTaskCount, renderedTaskCount * 2).forEach((task) => {
      render(tasksListElement, createTaskTemplate(task), `beforeend`);
    });

    renderedTaskCount += TASK_COUNT_PER_STEP;

    if (renderedTaskCount >= tasks.length) {
      loadMoreButton.remove();
    }
  });
}
