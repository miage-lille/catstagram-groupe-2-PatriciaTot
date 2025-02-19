import { Decrement, FetchCatsCommit, FetchCatsRequest, FetchCatsRollback, Increment, SelectPicture, CloseModal } from './types/actions.type';
import { Picture } from './types/picture.type';

export const increment = (): Increment => ({ type: 'INCREMENT' });
export const decrement = (): Decrement => ({ type: 'DECREMENT' });

export const selectPicture = (picture: Picture): SelectPicture => ({ type: 'SELECT_PICTURE', picture });
export const closeModal = (): CloseModal => ({ type: 'CLOSE_MODAL' });

export const fetchCatsRequest = (counter: number): FetchCatsRequest => ({
  type: 'FETCH_CATS_REQUEST',
  method: 'GET',
  path: `https://pixabay.com/api/?key=48937088-04c4e17c1287d4b71978083ab&per_page=${counter}&q=cat`,
});

export const fetchCatsCommit = (pictures: Picture[]): FetchCatsCommit => ({ type: 'FETCH_CATS_COMMIT', payload: pictures });

export const fetchCatsRollback = (error: Error): FetchCatsRollback => ({ type: 'FETCH_CATS_ROLLBACK', error });