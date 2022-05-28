import { useEffect } from 'react';
import { FC } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
// import './App.css';
import { useAppSelector } from './hooks';
import { axiosInstance } from './http';
import {
  checkAuthAction,
  loginAction,
  logoutAction,
  registrationAction,
} from './store/actions/auth-actions';
import { AuthTypes, User } from './store/types/auth-types';

const App: FC = () => {
  // useDispatch
  const dispatch = useDispatch();
  // useSelector
  const user = useAppSelector((state) => state.authReducer.user);
  const isAuth = useAppSelector((state) => state.authReducer.isAuth);
  const isLoading = useAppSelector((state) => state.authReducer.isLoading);
  // useState
  const [emailInputValue, setEmailInputValue] = useState<string>('');
  const [users, setUsers] = useState<Array<User>>([]);
  const [passwordInputValue, setPasswordInputValue] = useState<string>('');

  // useEffect
  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuthAction());
    }
  }, []);

  // контролируемый input емейла
  const changeEmailInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInputValue(e.target.value);
  };

  // контролируемый input пароля
  const changePasswordInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInputValue(e.target.value);
  };

  const register = () => {
    dispatch(registrationAction(emailInputValue, passwordInputValue));
  };

  const login = () => {
    dispatch(loginAction(emailInputValue, passwordInputValue));
  };

  const logout = () => {
    dispatch(logoutAction());
  };

  // Получение всех пользователей
  const getUsers = async () => {
    dispatch({
      type: AuthTypes.SET_LOADING,
      payload: true,
    });
    try {
      const res = await axiosInstance.get<Array<User>>('/users');
      setUsers(res.data);
    } catch (e: any) {
      throw new Error(e);
    } finally {
      dispatch({
        type: AuthTypes.SET_LOADING,
        payload: false,
      });
    }
  };

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  if (!isAuth) {
    return (
      <div>
        <input
          type="email"
          placeholder="email"
          value={emailInputValue}
          onChange={changeEmailInputValue}
        />
        <input
          type="password"
          placeholder="password"
          value={passwordInputValue}
          onChange={changePasswordInputValue}
        />

        <button onClick={register}>Зарегистрироваться</button>
        <button onClick={login}>Логин</button>
        <button onClick={getUsers}>getUsers</button>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Дарова {user.email}</h1>
      <p>{user.isActivatedAccount ? 'ты активировал аккаунт!' : 'ты не активировал аккаунт'}</p>
      <button onClick={logout}>Logout</button>
      <button onClick={getUsers}>getUsers</button>
      {users.map((user) => {
        return (
          <div key={`${user.email}_${user.password}`}>
            <div>User email: {user.email}</div>
            <div>User hashPassword: {user.password}</div>
            <div>User isActivatedAccount: {user.isActivatedAccount}</div>
          </div>
        );
      })}
    </div>
  );
};

export default App;
