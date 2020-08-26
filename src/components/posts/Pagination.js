import React from 'react';
import styled from 'styled-components';
import qs from 'qs';
import Button from '../common/Button';
import { Link } from 'react-router-dom';

const PaginationBlock = styled.div`
  width: 320px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
`;
const PageNumber = styled.div``;

const buildLink = ({ username, tag, page }) => {
  const query = qs.stringify({ tag, page });
  return username ? `@${username}/?${query}` : `/?${query}`;
};

const Pagination = ({ page, lastPage, username, tag }) => {
  return (
    <PaginationBlock>
      <Button disabled={page === 1}>
        {page === 1 ? (
          '이전'
        ) : (
          <Link to={buildLink({ username, tag, page: page - 1 })}>이전</Link>
        )}
      </Button>
      <PageNumber>{page}</PageNumber>
      <Button disabled={page === lastPage}>
        {page === lastPage ? (
          '다음'
        ) : (
          <Link to={buildLink({ username, tag, page: page + 1 })}>다음</Link>
        )}
      </Button>
    </PaginationBlock>
  );
};

export default Pagination;
