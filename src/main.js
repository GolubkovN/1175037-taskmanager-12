import MenuView from './view/menu.js';
import FilterView from './view/filter.js';
import BoardView from './view/board.js';
import SortingView from './view/sorting.js';
import TasksListView from './view/tasks-list.js';
import TaskView from './view/task.js';
import TaskEditView from './view/task-edit.js';
import LoadMoreButtonView from './view/load-button.js';
import {generateTask} from './mock/tasks.js';
import {generateFilter} from './mock/filter.js';
import {render, RenderPosition} from './utils.js';

const TASKS_COUNT = 22;
const TASK_COUNT_PER_STEP = 8;

const tasks = new Array(TASKS_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

// render components
const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, new MenuView().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterView(filters).getElement(), RenderPosition.BEFOREEND);

const boardComponent = new BoardView();
render(siteMainElement, boardComponent.getElement(), RenderPosition.BEFOREEND);
render(boardComponent.getElement(), new SortingView().getElement(), RenderPosition.AFTERBEGIN);

const tasksListComponent = new TasksListView();
render(boardComponent.getElement(), tasksListComponent.getElement(), RenderPosition.BEFOREEND);
render(tasksListComponent.getElement(), new TaskEditView(tasks[0]).getElement(), RenderPosition.BEFOREEND);

for (let i = 1; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i++) {
  render(tasksListComponent.getElement(), new TaskView(tasks[i]).getElement(), RenderPosition.AFTERBEGIN);
}

if (tasks.length > TASK_COUNT_PER_STEP) {

  let renderedTaskCount = TASK_COUNT_PER_STEP;

  const loadMoreButtonComponent = new LoadMoreButtonView();
  render(boardComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  loadMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    tasks.slice(renderedTaskCount, renderedTaskCount * 2).forEach((task) => {
      render(tasksListComponent.getElement(), new TaskView(task).getElement(), RenderPosition.BEFOREEND);
    });

    renderedTaskCount += TASK_COUNT_PER_STEP;

    if (renderedTaskCount >= tasks.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
    }
  });
}
