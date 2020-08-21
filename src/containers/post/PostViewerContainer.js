import React, { useEffect } from 'react';
import PostViewer from '../../components/post/PostViewer';
import { useDispatch, useSelector } from 'react-redux';
import { readPost, unloadPost } from '../../modules/post';
import { useRouteMatch } from 'react-router-dom';

const PostViewerContainer = () => {
  const { params } = useRouteMatch();
  const { username, postId } = params;
  const dispatch = useDispatch();
  const { post, error, loading } = useSelector(({ post, loading }) => ({
    post: post.post,
    error: post.error,
    loading: loading['post/READ_POST'],
  }));

  useEffect(() => {
    dispatch(readPost(postId));
    return () => {
      dispatch(unloadPost());
    };
  }, [dispatch, postId]);

  return <PostViewer post={post} loading={loading} error={error} />;
};
export default PostViewerContainer;
