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
import {render, RenderPosition, replace, remove} from './utils/render.js';

const TASKS_COUNT = 22;
const TASK_COUNT_PER_STEP = 8;

const tasks = new Array(TASKS_COUNT).fill(``).map(generateTask);
const filters = generateFilter(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const renderTask = (place, task) => {
  const taskComponent = new TaskView(task);
  const taskEditComponent = new TaskEditView(task);

  const replaceCardToForm = () => replace(taskEditComponent, taskComponent);
  const replaceFormToCard = () => replace(taskComponent, taskEditComponent);

  const onEscDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscDown);
    }
  };

  taskComponent.setEditClickHandler(() => {
    replaceCardToForm();
    document.addEventListener(`keydown`, onEscDown);
  });

  taskEditComponent.setFormSubmitHandler(() => {
    replaceFormToCard();
    document.addEventListener(`keydown`, onEscDown);
  });

  render(place, taskComponent, RenderPosition.BEFOREEND);
};

const renderBoard = (boardContainer, boardTasks) => {
  const boardComponent = new BoardView();
  const tasksListComponent = new TasksListView();

  render(boardContainer, boardComponent, RenderPosition.BEFOREEND);
  render(boardComponent, tasksListComponent, RenderPosition.BEFOREEND);

  if (tasks.every((task) => task.isArchive)) {
    render(boardComponent, new NoTaskView(), RenderPosition.BEFOREEND);
    return;
  }

  render(boardComponent, new SortingView(), RenderPosition.AFTERBEGIN);

  boardTasks
    .slice(0, Math.min(tasks.length, TASK_COUNT_PER_STEP))
    .forEach((boardTask) => renderTask(tasksListComponent.getElement(), boardTask));

  if (boardTasks.length > TASK_COUNT_PER_STEP) {
    let renderedTaskCount = TASK_COUNT_PER_STEP;

    const loadMoreButtonComponent = new LoadMoreButtonView();
    render(boardComponent, loadMoreButtonComponent, RenderPosition.BEFOREEND);

    loadMoreButtonComponent.setClickHandler(() => {
      boardTasks
      .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
      .forEach((boardTask) => renderTask(tasksListComponent.getElement(), boardTask));

      renderedTaskCount += TASK_COUNT_PER_STEP;

      if (renderedTaskCount >= tasks.length) {
        remove(loadMoreButtonComponent);
      }
    });
  }
};

// render components
render(siteHeaderElement, new MenuView(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterView(filters), RenderPosition.BEFOREEND);

renderBoard(siteMainElement, tasks);
