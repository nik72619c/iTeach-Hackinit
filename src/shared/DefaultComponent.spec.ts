import DefaultComponent, { IDefaultComponent } from './DefaultComponent';

describe('DefaultComponent', () => {
  let component: DefaultComponent;
  const divList: HTMLLIElement[] = [
    document.createElement('li'),
    document.createElement('li'),
    document.createElement('li')
  ]

  beforeEach(() => {
    component = new DefaultComponent(document.createElement('div'));
  });

  it('should exist', () => {
    expect(DefaultComponent).toBeDefined();
  })

  it('should be instantiable', () => {
    expect(component).toBeDefined();
  });

  it('should throw an error if no $element is passed', () => {
    // tslint:disable-next-line:no-arg
    expect(() => new DefaultComponent(null)).toThrow();
  });

  it('should render the template', () => {
    const text = 'Hey ho, lets go!';
    component.getTemplate = (): string => {
      return text;
    }
    component.render();
    expect(component.$element.innerHTML).toEqual(text);
  });

  it('buildChilds() should be called on render', () => {
    const mockFn = jest.fn();
    component.buildChilds = (): void => mockFn();
    component.render();
    component.render();
    expect(mockFn.mock.calls.length).toBe(2);
  });

  it('mapChild() should render properly', () => {
    component.getTemplate = (): string => {
      return `<ul id="list"></ul>`;
    }
    component.render();
    component.mapChild('#list', divList);
    const $list = component.$element.querySelector('#list');
    if ($list) {
      expect($list.children.length).toBe(divList.length);
    }
  });

  it('clickElement() should trigger the listener', () => {
    component.getTemplate = (): string => {
      return `<a id="button"></a>`;
    }
    const listener = jest.fn();
    component.render();
    component.clickElement('#button', listener);
    const $button: HTMLAnchorElement|null = component.$element.querySelector('#button');
    if ($button) {
      $button.click();
    }
    expect(listener.mock.calls.length).toBe(1);
  });

});
