/**
  * @interface IDefaultComponent
  * @property {HTMLElement} $element
  * @method {Function} render
  * @method {Function} getTemplate
  * @method {Function} buildChilds
  */
export interface IDefaultComponent {
  $element: HTMLElement;
  render: (position: InsertPosition) => void;
  getTemplate: () => string;
  buildChilds: () => void;
}


/**
  * Base component which implements some util methods for DOM render,
  * this is meant to be inherited by other components.
  * @abstract
  * @class DefaultComponent
  * @example new DefaultComponent(document.getElementById('app'));
  * @implements IDefaultComponent
  */
export default class DefaultComponent implements IDefaultComponent {


  /**
   * Represents a DefaultComponent
   * @constructor
   * @implements DefaultComponentInterface
   * @param {HTMLElement} $element - dom element whenever all starts
   */
  constructor(public $element: HTMLElement) {
    if (!this.$element) {
      throw new Error('no element found.');
    }
  }


  /**
   * Get the component template
   * @public
   * @abstract
   * @return {String}
   */
  getTemplate(): string {
    return ``;
  }


  /**
   * Fills a child, mapping a list of elements
   * @public
   * @abstract
   * @param {String} selector - dom query selector
   * @param {any[]} elementList - list of dom elements
   */
  mapChild(selector: string, elementList: any[]): void {
    const $child = this.$element.querySelector(selector);
    if (!$child) {
      return;
    }
    $child.innerHTML = '';
    elementList.forEach(($node: any) => $child.appendChild($node));
  }


  /**
   * Asssigns a click event listener to a list
   * @public
   * @abstract
   * @param {String} selector - dom query selector
   * @param {void|any} action - callback in context
   */
  clickElement(selector: string, action: void|any): void {
    const $child = this.$element.querySelector(selector);
    if ($child) {
      $child.addEventListener('click', action, true);
    }
  }


  /**
   * Renders the template and build all possible childs
   * @public
   * @param {InsertPosition} position - position where append the content (beforebegin, afterbegin, beforeend, afterend)
   */
  render(position: InsertPosition = 'beforeend'): void {
    this.$element.innerHTML = '';
    this.$element.insertAdjacentHTML(position, this.getTemplate());
    this.buildChilds();
  }


  /**
   * Builds the component childs
   * @public
   * @abstract
   */
  buildChilds(): void {}
}
