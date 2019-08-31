import AppComponent from './AppComponent';
import DrawingService from '../shared/DrawingService';
import ToolbarComponent from '../toolbar/ToolbarComponent';
import CanvasComponent from '../canvas/CanvasComponent';


describe('AppComponent', () => {
  let $canvas: HTMLCanvasElement;
  let component: AppComponent;

  // Creates a <canvas id="canvas"></canvas> in the document body
  // in order to initialize 'canvas-prebuilt' in node environment.
  beforeAll(() => {
    $canvas = document.createElement('canvas');
    $canvas.id = 'canvas';
    const $body = document.querySelector('body');
    if ($body) {
      $body.appendChild($canvas);
    }
  });

  beforeEach(() => {
    component = new AppComponent(document.createElement('div'));
  });

  it('Should exist', () => {
    expect(AppComponent).toBeDefined();
  })

  it('Should be instantiable', () => {
    expect(component).toBeDefined();
  });

  it('Should create a DrawingService instance', () => {
    expect(component.drawingService).toBeDefined();
    expect(component.drawingService instanceof DrawingService).toBe(true);
  });

  it('Should render and create a ToolbarComponent instance', () => {
    expect(component.toolbarComponent).toBeDefined();
    expect(component.toolbarComponent instanceof ToolbarComponent).toBe(true);
  });

  it('Should render and create a CanvasComponent instance', () => {
    expect(component.canvasComponent).toBeDefined();
    expect(component.canvasComponent instanceof CanvasComponent).toBe(true);
  });
});
