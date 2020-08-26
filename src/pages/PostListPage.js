import React from 'react';
import HedaerContainer from '../containers/common/HedaerContainer';
import PostListContainer from '../containers/posts/PostListContainer';
import PagingnationContainer from '../containers/posts/PagingnationContainer';

const PostListPage = () => {
  return (
    <>
      <HedaerContainer />
      <PostListContainer />
      <PagingnationContainer />
    </>
  );
};
export default PostListPage;
