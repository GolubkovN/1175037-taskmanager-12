import {createElement} from '../utils.js';

const createLoadBtnTemplate = () => `<button class="load-more" type="button">load more</button>`;

export default class LoadMoreButton {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return createLoadBtnTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
