import { Map as iMap } from 'immutable';

/**
 * @interface CanvasState
 */
interface ICanvasState {
  snapshots: string[];
  version: number;
}

/**
 * @interface ImmutableCanvasState
 * @extends iMap<string, any>
 * @prop {Function} toJS
 * @prop {Function} get
 */
export interface ImmutableCanvasState extends iMap<string, any> {
  toJS(): ICanvasState;
  get<K extends keyof ICanvasState>(key: K): ICanvasState[ K ];
}

const initialState: ImmutableCanvasState = iMap({
  snapshots: [],
  version: 0
});

const ADD_SNAPSHOT = 'ADD_SNAPSHOT';
const EMPTY_SNAPSHOTS = 'EMPTY_SNAPSHOTS';
const PREVOUS_VERSION = 'PREVOUS_VERSION';
const NEXT_VERSION = 'NEXT_VERSION';


export default function reducer(state = initialState, action: any = {}) {

  const version: number = state.get('version');
  const snapshots: string[] = state.get('snapshots');

  switch (action.type) {

    case EMPTY_SNAPSHOTS:
      return state.set('snapshots', []).set('version', 0);

    case ADD_SNAPSHOT:
      snapshots.splice(version + 1, snapshots.length - version, action.snapshot);
      const newVersion: number = snapshots.length - 1;
      return state.set('snapshots', snapshots).set('version', (newVersion < 0) ? 0 : newVersion);

    case PREVOUS_VERSION:
      let prevVersion: number = version - 1;
      if (prevVersion < 0) {
        prevVersion = 0;
      }
      return state.set('version', prevVersion);

    case NEXT_VERSION:
      const limitLength: number = snapshots.length - 1;
      let nextVersion: number = version + 1;
      if (nextVersion > limitLength) {
        nextVersion = limitLength;
      }
      return state.set('version', nextVersion);

    default:
      return state;
  }
}

export function addSnapShot(snapshot: string): any {
  return {
    type: ADD_SNAPSHOT,
    snapshot
  };
}

export function emptyAction(): any {
  return {
    type: EMPTY_SNAPSHOTS
  };
}

export function undoAction(): any {
  return {
    type: PREVOUS_VERSION
  };
}

export function redoAction(): any {
  return {
    type: NEXT_VERSION
  };
}
