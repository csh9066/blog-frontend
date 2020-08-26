import React, { useEffect } from 'react';
import PostViewer from '../../components/post/PostViewer';
import { useDispatch, useSelector } from 'react-redux';
import { readPost, unloadPost } from '../../modules/post';
import { setOriginalPost } from '../../modules/write';
import { useRouteMatch, useHistory } from 'react-router-dom';
import PostActionButtons from '../../components/post/PostActionButtons';
import { removePost } from '../../lib/api/posts';

const PostViewerContainer = () => {
  const { params } = useRouteMatch();
  const history = useHistory();
  const { postId } = params;
  const dispatch = useDispatch();
  const { post, error, loading, user } = useSelector(
    ({ post, loading, user }) => ({
      post: post.post,
      error: post.error,
      loading: loading['post/READ_POST'],
      user: user.user,
    }),
  );

  useEffect(() => {
    dispatch(readPost(postId));
    return () => {
      dispatch(unloadPost());
    };
  }, [dispatch, postId]);

  const onEdit = () => {
    dispatch(setOriginalPost(post));
    history.push('/write');
  };

  const onRemove = async () => {
    try {
      await removePost(postId);
      history.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <PostViewer
      post={post}
      loading={loading}
      error={error}
      actionButtons={<PostActionButtons onEdit={onEdit} onRemove={onRemove} />}
      ownPost={(post && post.UserId) === (user && user.id)}
    />
  );
};
export default PostViewerContainer;
