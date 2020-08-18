import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import createRequestSaga, {
  createRequestType,
} from '../lib/utils/createRequestSaga';

import * as authApi from '../lib/api/auth';
import { takeLatest } from 'redux-saga/effects';

const CHNAGE_FILED = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestType(
  'auth/REGISTER',
);
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestType('auth/LOGIN');

export const changeField = createAction(
  CHNAGE_FILED,
  ({ form, key, value }) => ({ form, key, value }),
);
export const initializeForm = createAction(INITIALIZE_FORM, (form) => form);
export const register = createAction(REGISTER, ({ username, password }) => ({
  username,
  password,
}));
export const login = createAction(LOGIN, ({ username, password }) => ({
  username,
  password,
}));

export const registerSaga = createRequestSaga(REGISTER, authApi.register);
export const loginSaga = createRequestSaga(LOGIN, authApi.login);

const initialState = {
  register: {
    username: '',
    password: '',
    passwordConfirm: '',
  },
  login: {
    username: '',
    password: '',
  },
  auth: null,
  authError: null,
};

export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
}

const auth = handleActions(
  {
    [CHNAGE_FILED]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value;
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) =>
      produce(state, (draft) => {
        draft[form] = initialState[form];
        draft.authError = null;
      }),
    [REGISTER_SUCCESS]: (state, { payload: auth }) =>
      produce(state, (draft) => {
        draft.authError = null;
        draft.auth = auth;
      }),
    [REGISTER_FAILURE]: (state, { payload: error }) =>
      produce(state, (draft) => {
        draft.authError = error;
      }),
    [LOGIN_SUCCESS]: (state, { payload: auth }) =>
      produce(state, (draft) => {
        draft.authError = null;
        draft.auth = auth;
      }),
    [LOGIN_FAILURE]: (state, { payload: error }) =>
      produce(state, (draft) => {
        draft.authError = error;
      }),
  },
  initialState,
);

export default auth;
