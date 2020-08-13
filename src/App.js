import React from 'react';
import { Route } from 'react-router-dom';
import PostPage from './pages/PostPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PostListPage from './pages/PostListPage';
import WritePage from './pages/WritePage';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    min-height: 100%;
  }

  #root {
    min-height: 100%;
  }

  html {
    height: 100%
  }

  a {
    color: inherit;
    text-decoration:none;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Route component={PostListPage} path={['/@:username', '/']} exact />
      <Route component={LoginPage} path="/login" />
      <Route component={RegisterPage} path="/register" />
      <Route component={WritePage} path="/write" />
      <Route component={PostPage} path="/@:username/:postId" />
    </>
  );
}

export default App;
