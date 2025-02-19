import { Loop, liftState } from 'redux-loop';
import { compose } from 'redux';
import { Actions } from './types/actions.type';
import { Picture } from './types/picture.type';
import fakeData from './fake-datas.json';
import { Option, some, none } from 'fp-ts/Option';

export type State = {
  counter: number,
  pictures: Picture[];
  selectedPicture: Option<Picture>;
}

export const defaultState: State = {
  counter: 0,
  pictures: [],
  selectedPicture: none,
}

export const reducer = (state: State | undefined, action: Actions): State | Loop<State> => {
  if (!state) return defaultState; // mandatory by redux
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        counter: state.counter + 1,
        pictures: fakeData.slice(0, state.counter + 1),
      };
    case 'DECREMENT':
      return state.counter > 3 ? {
        ...state,
        counter: state.counter - 1,
        pictures: fakeData.slice(0, state.counter - 1),
      } : state;
    case 'SELECT_PICTURE':
      return {
        ...state,
        selectedPicture: some(action.picture),
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        selectedPicture: none,
      };
    case 'FETCH_CATS_REQUEST':
      throw 'Not Implemented';
    case 'FETCH_CATS_COMMIT':
      throw 'Not Implemented';
    case 'FETCH_CATS_ROLLBACK':
      throw 'Not Implemented';
    default:
      return state;
  }
};

export const counterSelector = (state: State) => state.counter;

export const picturesSelector = (state: State) => state.pictures;

export const getSelectedPicture = (state: State) => state.selectedPicture;

export default compose(liftState, reducer);
