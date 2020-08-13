import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const CHNAGE_FILED = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

export const changeField = createAction(
  CHNAGE_FILED,
  ({ form, key, value }) => ({ form, key, value }),
);

export const initializeForm = createAction(INITIALIZE_FORM, (form) => form);

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
};

const auth = handleActions(
  {
    [CHNAGE_FILED]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value;
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) =>
      produce(state, (draft) => {
        draft[form] = initialState[form];
      }),
  },
  initialState,
);

export default auth;