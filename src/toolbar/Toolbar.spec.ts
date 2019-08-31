import ToolbarComponent from './ToolbarComponent';
import DrawingService from '../shared/DrawingService';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let $colorList: HTMLUListElement|null;
  let $weightList: HTMLUListElement|null;
  let drawingService: DrawingService;

  beforeEach(() => {
    drawingService = new DrawingService();
    component = new ToolbarComponent(document.createElement('div'), drawingService);
    $colorList = component.$element.querySelector('#color-picker');
    $weightList = component.$element.querySelector('#weight-picker');
  });

  it('Should exist', () => {
    expect(ToolbarComponent).toBeDefined();
  })

  it('Should be instantiable', () => {
    expect(component).toBeDefined();
  });

  it('Should inject a DrawingService instance', () => {
    expect(component.drawingService).toBeDefined();
    expect(component.drawingService instanceof DrawingService).toBe(true);
  });

  it('Should render all color list properly', () => {
    if ($colorList) {
      expect($colorList.children.length).toBe(component.colors.length);
    } else {
      return Promise.reject('No $colorList found');
    }
  });

  it('Select color should setup a color selection', () => {
    if ($colorList) {
      let $firstColor: any = $colorList.children[0];
      $firstColor.click();
      expect(component.drawingService.selectedColor).toEqual(component.colors[0]);
      $firstColor = $colorList.children[0];
      expect($firstColor.classList.contains('selected')).toBe(true);
    } else {
      return Promise.reject('No $colorList found');
    }
  });

  it('Should render all weight list properly', () => {
    if ($weightList) {
      expect($weightList.children.length).toBe(component.weights.length);
    } else {
      return Promise.reject('No $weightList found');
    }
  });

  it('Select weight should setup a weight selection', () => {
    if ($weightList) {
      let $firstWeight: any = $weightList.children[0]
      $firstWeight.click();
      expect(component.drawingService.selectedWeight).toEqual(component.weights[0]);
      $firstWeight = $weightList.children[0];
      expect($firstWeight.classList.contains('selected')).toBe(true);
    } else {
      return Promise.reject('No $weightList found');
    }
  });

  it('Click in undo should emit `undo`', () => {
    const mockFn = jest.fn();
    component.drawingService.emitter.once('undo', mockFn);
    const $undo: HTMLAnchorElement|null = component.$element.querySelector('#toolbar-undo');
    if ($undo) {
      $undo.click();
      expect(mockFn.mock.calls.length).toBe(1);
    } else {
      return Promise.reject('No $undo found');
    }
  });

  it('Click in redo should emit `redo`', () => {
    const mockFn = jest.fn();
    component.drawingService.emitter.once('redo', mockFn);
    const $redo: HTMLAnchorElement|null = component.$element.querySelector('#toolbar-redo');
    if ($redo) {
      $redo.click();
      expect(mockFn.mock.calls.length).toBe(1);
    } else {
      return Promise.reject('No $redo found');
    }
  });

  it('Click in clear should emit `clear`', () => {
    const mockFn = jest.fn();
    component.drawingService.emitter.once('clear', mockFn);
    const $clear: HTMLAnchorElement|null = component.$element.querySelector('#toolbar-clear');
    if ($clear) {
      $clear.click();
      expect(mockFn.mock.calls.length).toBe(1);
    } else {
      return Promise.reject('No $clear found');
    }
  });

});
