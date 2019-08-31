import React from 'react';
import { PaperScope, Tool, ToolEvent, Path, Layer } from 'paper';

import './Canvas.scss';


/**
 * Root app component whenever the app starts.
 * @class Canvas
 * @extends Component
 * @example <Canvas />
 */
class Canvas extends React.PureComponent<any, any> {

  /**
   * @prop {PaperScope} paper - paper project instance
   * @public
   */
  paper?: PaperScope;


  /**
   * @prop {Tool} tool - handles the mouse events in the canvas.
   * @public
   */
  tool?: Tool;


  /**
   * @prop {Path} path - drawing path, all new points while mouse drag will be added to this path
   * @public
   */
  path?: Path;


  /**
   * Erase the canvas removing all draws
   * @public
   */
  emptyCanvas(): void {
    if (this.paper) {
      this.paper.project.activeLayer.removeChildren();
      this.paper.view.draw();
      this.paper.view.update();
    }
  }


  /**
   * Canvas mouse down callback: creates a new Path and
   * setup the weight and color in order to begin the draw.
   * @uses ToolEvent
   * @uses Path
   * @param {ToolEvent} event
   * @public
   */
  mouseDown(event: ToolEvent): void {
    this.path = new Path({
      strokeColor: this.props.selectedColor,
      strokeWidth: this.props.selectedWeight,
      strokeCap: 'round',
      strokeJoin: 'round',
    });
    this.path.add(event.point);
  }


  /**
   * Canvas mouse drag callback: adds points to the current
   * path while user moves the cursor.
   * @uses ToolEvent
   * @uses Path
   * @param {ToolEvent} event
   * @public
   */
  mouseDrag(event: ToolEvent): void {
    if (this.path) {
      this.path.add(event.point);
      this.path.smooth();
    }
  }


  /**
   * Canvas mouse up callback: stores the current version to 'snapshots'
   * from our current version of the draw.
   * @param {ToolEvent} event
   * @public
   */
  mouseUp(event: ToolEvent): void {
    if (this.paper) {
      this.props.addSnapShot(this.paper.project.exportJSON());
    }
  }


  /**
   * Initializes the Paper.js in the current canvas element, and assigns
   * the mouse events to handle the drawings.
   * @uses PaperScope
   * @uses Path
   * @uses Tool
   * @public
   */
  componentDidMount() {
    this.paper = new PaperScope();
    this.paper.install(window);
    this.paper.setup('canvas');
    this.tool = new Tool();

    this.tool.onMouseDown = this.mouseDown.bind(this);
    this.tool.onMouseDrag = this.mouseDrag.bind(this);
    this.tool.onMouseUp = this.mouseUp.bind(this);
  }

  componentDidUpdate() {
    if (!this.paper) {
      return;
    }
    const { version, snapshots } = this.props;
    if (version === 0 && !snapshots.length) {
      this.emptyCanvas();
      return;
    }
    const currentSnapShot: string = this.paper.project.exportJSON();
    const versionSnapShot: string = snapshots[ version ];
    if (currentSnapShot.length !== versionSnapShot.length) {
      this.emptyCanvas();
      this.paper.project.importJSON(versionSnapShot);
    }
  }

  render() {
    return (
      <canvas id='canvas'></canvas>
    )
  }
}


export default Canvas;
