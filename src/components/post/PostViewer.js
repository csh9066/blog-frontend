import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Reponsive';
import moment from 'moment';
import { Link } from 'react-router-dom';

const PostViewerBlock = styled(Responsive)`
  margin-top: 4rem;
`;

const PostHead = styled.div`
  border-bottom: 1px soilid ${palette.gray[2]};
  padding-bottom: 3rem;
  margin-bottom: 3rem;

  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const SubInfo = styled.div`
  margin-top: 1rem;
  color: ${palette.gray[6]};

  span + span::before {
    color: ${palette.gray[5]};
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

const PostContent = styled.div`
  font-size: 1.3125rem;
  color: ${palette.gray[8]};
`;

const PostViewer = ({ post, error, loading, actionButtons, ownPost }) => {
  if (error) {
    if (error.response && error.response.status === 404) {
      return <PostViewerBlock>NOT FOUND POST</PostViewerBlock>;
    }
    return <PostViewerBlock>Error</PostViewerBlock>;
  }
  if (loading || !post) return null;
  return (
    <PostViewerBlock>
      <PostHead>
        <h1>{post.title}</h1>
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
      </PostHead>
      {ownPost && actionButtons}
      <PostContent dangerouslySetInnerHTML={{ __html: post.body }} />
    </PostViewerBlock>
  );
};

export default PostViewer;
