import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthForm from '../../components/auth/AuthForm';
import { changeField, initializeForm, login } from '../../modules/auth';
import { useHistory } from 'react-router-dom';
import { check } from '../../modules/user';

const LoginForm = () => {
  const [error, setError] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

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
    const { username, password } = form;
    dispatch(login({ username, password }));
  };

  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      history.push('/');
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('localStroage not working');
      }
    }
  }, [user, history]);

  useEffect(() => {
    setError('');
    if (authError) {
      setError('로그인 실패');
      return;
    }
    if (auth) {
      dispatch(check());
    }
  }, [auth, authError, history, dispatch]);

  return (
    <AuthForm
      type="login"
      onChange={onChange}
      onSubmit={onSubmit}
      form={form}
      error={error}
    />
  );
};
export default LoginForm;
