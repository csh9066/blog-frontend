import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthForm from '../../auth/AuthForm';
import { changeField, initializeForm } from '../../../modules/auth';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const { register } = useSelector((state) => state.auth);

  const onChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      changeField({
        form: 'register',
        key: name,
        value,
      }),
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

  return (
    <AuthForm
      type="register"
      onChange={onChange}
      onSubmit={onSubmit}
      form={register}
    />
  );
};
export default RegisterForm;
