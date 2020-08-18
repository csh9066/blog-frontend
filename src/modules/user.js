import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestType,
} from '../lib/utils/createRequestSaga';
import * as authApi from '../lib/api/auth';
import { takeLatest } from 'redux-saga/effects';

const TEMP_SET_USER = 'user/TEMP_SET_USER';
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestType('user/CHECK');

export const tempSetUser = createAction(TEMP_SET_USER, (user) => user);
export const check = createAction(CHECK);

const checkSaga = createRequestSaga(CHECK, authApi.check);

export function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
}

const initialState = {
  user: null,
  checkError: null,
};

export default handleActions(
  {
    [TEMP_SET_USER]: (state, action) => ({
      ...state,
      user: action.payload,
    }),
    [CHECK_SUCCESS]: (state, action) => ({
      ...state,
      user: action.payload,
      checkError: null,
    }),
    [CHECK_FAILURE]: (state, action) => ({
      ...state,
      user: null,
      checkError: action.payload,
    }),
  },
  initialState,
);
