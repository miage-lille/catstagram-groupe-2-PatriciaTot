import { Loop, Cmd, liftState, loop } from 'redux-loop';
import { compose } from 'redux';
import { Actions } from './types/actions.type';
import { Picture } from './types/picture.type';
import { fetchCatsRequest } from './actions';
import fakeData from './fake-datas.json';
import { Option, some, none } from 'fp-ts/Option';
import { Loading, Success, Failure } from './types/api.type';
import { loading, success, failure } from './api';

export type State = {
  counter: number,
  pictures: Loading | Success | Failure;
  selectedPicture: Option<Picture>;
}

export const defaultState: State = {
  counter: 0,
  pictures: success([]),
  selectedPicture: none,
}

export const reducer = (state: State | undefined, action: Actions): State | Loop<State> => {
  if (!state) return defaultState; // mandatory by redux
  switch (action.type) {
    case 'INCREMENT':
      return loop(
        {
          ...state,
          counter: state.counter + 1,
          pictures: loading(),
        },
        Cmd.action(fetchCatsRequest(state.counter + 1))
      );
    case 'DECREMENT':
      return state.counter > 3
        ? loop(
            {
              ...state,
              counter: state.counter - 1,
              pictures: loading(),
            },
            Cmd.action(fetchCatsRequest(state.counter - 1))
          )
        : state;
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
      return state;
    case 'FETCH_CATS_COMMIT':
      return {
        ...state,
        pictures: success(action.payload as Picture[]),
      };
    case 'FETCH_CATS_ROLLBACK':
      return loop(
        {
          ...state,
          pictures: failure(action.error.message),
        },
        Cmd.run(() => console.error('Error fetching cats:', action.error.message))
      );
    default:
      return state;
  }
};

export const counterSelector = (state: State) => state.counter;

export const picturesSelector = (state: State) => state.pictures;

export const getSelectedPicture = (state: State) => state.selectedPicture;

export default compose(liftState, reducer);
