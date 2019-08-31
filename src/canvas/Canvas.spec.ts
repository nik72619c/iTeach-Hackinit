import CanvasComponent from './Canvas';
import DrawingService from '../shared/DrawingService';
import { Tool, ToolEvent, PaperScope, Point } from 'paper';


describe('CanvasComponent', () => {
  let $canvas: HTMLCanvasElement;
  let component: CanvasComponent;
  let drawingService: DrawingService;

  interface IPoint {
    x: number;
    y: number
  }

  const toolEventMock = (point: IPoint = {x: 100, y: 100}): ToolEvent|any => {
    const event: ToolEvent|any = new ToolEvent();
    event.tool = component.tool;
    event.point = new Point(point.x, point.y);
    return event;
  }

  const drawLine = (from: IPoint, to: IPoint): void => {
    component.mouseDown(toolEventMock(from));
    component.mouseDrag(toolEventMock(to));
    component.mouseUp(toolEventMock(to));
  }

  const getRandomPixel = (max: number = 400): number => Math.floor(Math.random() * max);

  const getRandomPoint = (): IPoint => ({x: getRandomPixel(), y: getRandomPixel()});

  const drawLines = (number: number): void => {
    for (let i = 0; i < number; i++) {
      drawLine(getRandomPoint(), getRandomPoint());
    }
  }

  // Creates a <canvas id="canvas"></canvas> in the document body
  // in order to initialize 'canvas-prebuilt' in node environment
  beforeAll(() => {
    $canvas = document.createElement('canvas');
    $canvas.id = 'canvas';
    const $body = document.querySelector('body');
    if ($body) {
      $body.appendChild($canvas);
    }
  });

  beforeEach(() => {
    drawingService = new DrawingService();
    component = new CanvasComponent($canvas, drawingService);
  });

  it('Should exist', () => {
    expect(CanvasComponent).toBeDefined();
  })

  it('Should be instantiable', () => {
    expect(component).toBeDefined();
  });

  it('mouseDown() should create a Path with something inside', () => {
    component.mouseDown(toolEventMock());
    expect(component.path).toBeDefined();
  });

  it('mouseDrag() should add a Point to the current Path', () => {
    component.mouseDown(toolEventMock());
    component.mouseDrag(toolEventMock(200, 200));
    expect(component.path.segments.length).toBeGreaterThan(1);
  });

  it('mouseUp() should create a snapshot of the canvas, and create the current version', () => {
    drawLines(2);
    expect(component.snapshots.length).toBe(2);
    expect(component.version).toBe(1);
  });

  it('undoAcion() should move back the snapshot history', () => {
    drawLines(3);
    expect(component.snapshots.length).toBe(3);
    expect(component.version).toBe(2);
    component.undoAction(); // go to step 1
    component.undoAction(); // go to step 0
    component.undoAction(); // no further than 0
    expect(component.version).toBe(0);
  });

  it('undoAcion() should move back the snapshot history', () => {
    drawLines(3);
    expect(component.snapshots.length).toBe(3);
    expect(component.version).toBe(2);
    component.undoAction(); // go to step 1
    component.undoAction(); // go to step 0
    component.undoAction(); // no further than 0
    expect(component.version).toBe(0);
    component.redoAction(); // go to step 1
    expect(component.version).toBe(1);
    component.redoAction(); // go to step 2
    expect(component.version).toBe(2);
    component.redoAction(); // no further than 2 (0, 1, 2)
    expect(component.version).toBe(2);
  });

  it('clearAction() should remove all draws and snapshots', () => {
    drawLines(3);
    expect(component.snapshots.length).toBe(3);
    expect(component.version).toBe(2);
    component.clearAction();
    expect(component.paper.project.activeLayer.children.length).toBe(0);
    expect(component.snapshots.length).toBe(0);
    expect(component.version).toBe(0);
  })
});
