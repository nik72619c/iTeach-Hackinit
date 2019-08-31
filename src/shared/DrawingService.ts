import { EventEmitter } from 'events';


/**
 * Service class designed to be instanced and injected, in order to
 * communicate components through getters/setters and EventEmitter;
 * @class DrawingService
 * @example const drawingService = new DrawingService();
 * drawingService.emitter.emit('myEvent', function() {});
 */
export default class DrawingService {


  /**
   * @prop {String} _selectedColor
   * @private
   */
  private _selectedColor = '#000000';


  /**
   * @prop {Number} _selectedWeight
   * @private
   */
  private _selectedWeight = 2;


  /**
   * @prop {EventEmitter} emitter
   * @private
   */
  public emitter: EventEmitter = new EventEmitter();


  /**
   * @type {String}
   */
  get selectedColor(): string {
    return this._selectedColor;
  }


  /**
   * @type {String}
   */
  set selectedColor(color: string) {
    this._selectedColor = color;
  }


  /**
   * @type {Number}
   */
  get selectedWeight(): number {
    return this._selectedWeight;
  }


  /**
   * @type {Number}
   */
  set selectedWeight(weight: number) {
    this._selectedWeight = weight;
  }
}
