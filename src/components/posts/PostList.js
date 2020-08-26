import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Reponsive';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';
import { Link } from 'react-router-dom';
import moment from 'moment';

const PostListBlock = styled(Responsive)`
  margin-top: 3rem;
`;

const WritePostButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3rem;
`;

const PostItemBlock = styled.div`
  padding-bottom: 3rem;
  padding-top: 3rem;

  &:first-child {
    padding-top: 0;
  }

  & + & {
    border-top: 1px solid ${palette.gray[2]};
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 0;
    margin-top: 0;
    &:hover {
      color: ${palette.gray[6]};
    }
  }

  p {
    margin-top: 2rem;
  }
`;

const SubInfo = styled.div`
  color: ${palette.gray[6]};

  span + span::before {
    color: ${palette.gray[4]};
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    content: '\\B7';
  }
`;

const Tags = styled.div`
  margin-top: 0.5rem;
  .tag {
    display: inline-block;
    color: ${palette.cyan[7]};
    text-decoration: none;
    margin-right: 0.5rem;

    &:hover {
      color: ${palette.cyan[6]};
    }
  }
`;

const PostItem = ({ post }) => {
  return (
    <PostItemBlock>
      <h2>
        <Link to={`/@${post.User.username}/${post.id}`}>{post.title}</Link>
      </h2>
      <SubInfo>
        <span>
          <b>{post.User.username}</b>
        </span>
        <span>{moment(post.createdAt).format('YYYY.M.DD')}</span>
      </SubInfo>
      <Tags>
        {post.Tags.map((tag) => (
          <div className="tag" key={tag.id}>
            <Link to={`/?tag=${tag.body}`}>#{tag.body}</Link>
          </div>
        ))}
      </Tags>
      <p>{post.body}</p>
    </PostItemBlock>
  );
};

const PostList = ({ error, posts, loading, showWriteButton }) => {
  if (error || loading || !posts) return null;

  return (
    <PostListBlock>
      <WritePostButtonWrapper>
        {showWriteButton && (
          <Button cyan>
            <Link to="/write">새 글 작성하기</Link>
          </Button>
        )}
      </WritePostButtonWrapper>
      <div>
        {posts.map((post) => (
          <PostItem post={post} key={post.id} />
        ))}
      </div>
    </PostListBlock>
  );
};

export default PostList;
