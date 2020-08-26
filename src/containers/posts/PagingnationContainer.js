import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Pagination from '../../components/posts/Pagination';
import qs from 'qs';

const PagingnationContainer = () => {
  const location = useLocation();
  const { lastPage, posts, loading } = useSelector(({ posts, loading }) => ({
    posts: posts.posts,
    lastPage: posts.lastPage,
    loading: loading['posts/LIST_POSTS'],
  }));
  const { tag, username, page = 1 } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  if (!posts || loading) return null;

  return (
    <Pagination
      tag={tag}
      username={username}
      page={parseInt(page, 10)}
      lastPage={lastPage}
    />
  );
};
export default PagingnationContainer;
