import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { writePost } from '../../modules/write';
import WriteActionButtons from '../../components/write/WriteActionButtons';

const WriteActionButtonsContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { title, body, tags, post, postError } = useSelector(
    (state) => state.write,
  );

  const onPublish = () => {
    dispatch(
      writePost({
        title,
        body,
        tags,
      }),
    );
  };

  const onCancel = () => {
    history.push('/');
  };

  useEffect(() => {
    if (post) {
      history.push('/');
    }
    if (postError) {
      console.log(postError);
    }
  }, [history, post, postError]);

  return <WriteActionButtons onPublish={onPublish} onCancel={onCancel} />;
};
export default WriteActionButtonsContainer;
