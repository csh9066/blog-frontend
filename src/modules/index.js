import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import loading from './loading';
import user, { userSaga } from './user';
import write, { writeSaga } from './write';
import post, { postSaga } from './post';
import posts, { postsSaga } from './posts';

const rootReducer = combineReducers({
  auth,
  loading,
  user,
  write,
  post,
  posts,
});

export function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(userSaga),
    fork(writeSaga),
    fork(postSaga),
    fork(postsSaga),
  ]);
}

export default rootReducer;
