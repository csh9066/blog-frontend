import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestType,
} from '../lib/utils/createRequestSaga';
import * as authApi from '../lib/api/auth';
import { takeLatest, call } from 'redux-saga/effects';

const TEMP_SET_USER = 'user/TEMP_SET_USER';
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestType('user/CHECK');
const LOGOUT = 'user/LOGOUT';

export const tempSetUser = createAction(TEMP_SET_USER, (user) => user);
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);

const checkSaga = createRequestSaga(CHECK, authApi.check);
const checkFailureSaga = () => {
  try {
    localStorage.removeItem('user');
  } catch (e) {
    console.log('localstroage not working');
  }
};

function* logoutSaga() {
  try {
    yield call(authApi.logout);
    localStorage.removeItem('user');
  } catch (e) {
    console.log(e);
  }
}

export function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(CHECK_FAILURE, checkFailureSaga);
  yield takeLatest(LOGOUT, logoutSaga);
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
    [LOGOUT]: (state, action) => ({
      ...state,
      user: null,
    }),
  },
  initialState,
);
