import React from 'react';
import styled from 'styled-components';

const ReponsiveBlock = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  margin: 0 auto;

  @media (max-width: 1024px) {
    width: 768px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Reponsive = ({ children, ...rest }) => {
  return <ReponsiveBlock {...rest}>{children}</ReponsiveBlock>;
};

export default Reponsive;
