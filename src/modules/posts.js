import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestType,
} from '../lib/utils/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';
import sanitizeHtml from 'sanitize-html';

const removeHtmlAndShorten = (body) => {
  const filtered = sanitizeHtml(body, {
    allowedTags: [],
  });
  return filtered.length < 200 ? filtered : `${filtered.slice(0, 200)}...`;
};

const [
  LIST_POSTS,
  LISTS_POSTS_SUCCESS,
  LISTS_POSTS_FAILURE,
] = createRequestType('posts/LIST_POSTS');

export const listPosts = createAction(
  LIST_POSTS,
  ({ tag, username, page }) => ({ tag, username, page }),
);

export const listPostsSaga = createRequestSaga(LIST_POSTS, postsAPI.listPosts);

export function* postsSaga() {
  yield takeLatest(LIST_POSTS, listPostsSaga);
}

const initalState = {
  posts: null,
  error: null,
  lastPage: 1,
};

const posts = handleActions(
  {
    [LISTS_POSTS_SUCCESS]: (state, { payload: posts, meta: response }) => ({
      ...state,
      lastPage: parseInt(response.headers['last-page'], 10),
      posts: posts.map((post) => ({
        ...post,
        body: removeHtmlAndShorten(post.body),
      })),
    }),
    [LISTS_POSTS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initalState,
);

export default posts;
