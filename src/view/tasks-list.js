import AbstractView from '../view/abstract.js';

export default class TasksList extends AbstractView {
  _getTemplate() {
    return `<div class="board__tasks"></div>`;
  }
}
