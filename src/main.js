import MenuView from './view/menu.js';
import FilterView from './view/filter.js';
import BoardView from './view/board.js';
import SortingView from './view/sorting.js';
import TasksListView from './view/tasks-list.js';
import TaskView from './view/task.js';
import TaskEditView from './view/task-edit.js';
import LoadMoreButtonView from './view/load-button.js';
import NoTaskView from './view/no-task.js';
import {generateTask} from './mock/tasks.js';
import {generateFilter} from './mock/filter.js';
import {render, RenderPosition} from './utils.js';

const TASKS_COUNT = 22;
const TASK_COUNT_PER_STEP = 8;

const tasks = new Array(TASKS_COUNT).fill(``).map(generateTask);
const filters = generateFilter(tasks);

const renderTask = (place, task) => {
  const taskComponent = new TaskView(task);
  const taskEditComponent = new TaskEditView(task);

  const replaceCardToForm = () => place.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());

  const replaceFormToCard = () => place.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());

  const OnEscDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, OnEscDown);
    }
  };

  taskComponent.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
    replaceCardToForm();
    document.addEventListener(`keydown`, OnEscDown);
  });

  taskEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToCard();
    document.addEventListener(`keydown`, OnEscDown);
  });

  render(place, taskComponent.getElement(), RenderPosition.BEFOREEND);
};

// render components
const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, new MenuView().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterView(filters).getElement(), RenderPosition.BEFOREEND);

const boardComponent = new BoardView();
render(siteMainElement, boardComponent.getElement(), RenderPosition.BEFOREEND);

if (tasks.every((task) => task.isArchive)) {
  render(boardComponent.getElement(), new NoTaskView().getElement(), RenderPosition.BEFOREEND);
} else {
  render(boardComponent.getElement(), new SortingView().getElement(), RenderPosition.AFTERBEGIN);

  const tasksListComponent = new TasksListView();
  render(boardComponent.getElement(), tasksListComponent.getElement(), RenderPosition.BEFOREEND);

  for (let i = 1; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i++) {
    renderTask(tasksListComponent.getElement(), tasks[i]);
  }

  if (tasks.length > TASK_COUNT_PER_STEP) {

    let renderedTaskCount = TASK_COUNT_PER_STEP;

    const loadMoreButtonComponent = new LoadMoreButtonView();
    render(boardComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

    loadMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      tasks.slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP).forEach((task) => {
        renderTask(tasksListComponent.getElement(), task);
      });

      renderedTaskCount += TASK_COUNT_PER_STEP;

      if (renderedTaskCount >= tasks.length) {
        loadMoreButtonComponent.getElement().remove();
        loadMoreButtonComponent.removeElement();
      }
    });
  }
}
