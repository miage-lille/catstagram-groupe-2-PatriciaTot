import { Picture } from './picture.type';

export type Increment = { type: 'INCREMENT' };
export type Decrement = { type: 'DECREMENT' };

export const increment = (): Increment => ({ type: 'INCREMENT' });
export const decrement = (): Decrement => ({ type: 'DECREMENT' });

export type SelectPicture = { type: 'SELECT_PICTURE'; picture: Picture };
export type CloseModal = { type: 'CLOSE_MODAL' };

export const selectPicture = (picture: Picture): SelectPicture => ({ type: 'SELECT_PICTURE', picture });
export const closeModal = (): CloseModal => ({ type: 'CLOSE_MODAL' });

export type FetchCatsRequest = { type: 'FETCH_CATS_REQUEST'; method: 'GET'; path: string };
export type FetchCatsCommit = { type: 'FETCH_CATS_COMMIT'; payload: Picture[] };
export type FetchCatsRollback = { type: 'FETCH_CATS_ROLLBACK'; error: Error };

export type Actions =
  | Increment
  | Decrement
  | SelectPicture
  | CloseModal
  | FetchCatsRequest
  | FetchCatsCommit
  | FetchCatsRollback;
