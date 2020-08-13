import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthForm from '../../auth/AuthForm';
import { changeField, initializeForm } from '../../../modules/auth';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { login } = useSelector((state) => state.auth);

  const onChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      changeField({
        form: 'login',
        key: name,
        value,
      }),
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  return (
    <AuthForm
      type="login"
      onChange={onChange}
      onSubmit={onSubmit}
      form={login}
    />
  );
};
export default LoginForm;
