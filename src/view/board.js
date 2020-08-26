import AbstractView from '../view/abstract.js';

export default class Board extends AbstractView {
  _getTemplate() {
    return `<section class="board container"></section>`;
  }
}
