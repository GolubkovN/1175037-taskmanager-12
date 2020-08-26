import MenuView from './view/menu.js';
import FilterView from './view/filter.js';
import BoardPresenter from './presenter/board.js';
import {generateTask} from './mock/tasks.js';
import {generateFilter} from './mock/filter.js';
import {render, RenderPosition} from './utils/render.js';

const TASKS_COUNT = 22;

const tasks = new Array(TASKS_COUNT).fill(``).map(generateTask);
const filters = generateFilter(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
const boardPresenter = new BoardPresenter(siteMainElement);

// render components
render(siteHeaderElement, new MenuView(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterView(filters), RenderPosition.BEFOREEND);
boardPresenter.init(tasks);

