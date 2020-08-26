import React from 'react';
import Responsive from '../components/common/Reponsive';
import WriteActionButtonsContainer from '../containers/write/WriteActionButtonsContainer';
import EditorContainer from '../containers/write/EditorContainer';
import TagBoxContainer from '../containers/write/TagBoxContainer';
import { Helmet } from 'react-helmet-async';

const WritePage = () => {
  return (
    <>
      <Helmet>
        <title>글 작성하기 - Blog</title>
      </Helmet>
      <Responsive>
        <EditorContainer />
        <TagBoxContainer />
        <WriteActionButtonsContainer />
      </Responsive>
    </>
  );
};
export default WritePage;
