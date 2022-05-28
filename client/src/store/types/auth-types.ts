export enum AuthTypes {
  SET_LOADING = 'SET_LOADING',
  SET_USER = 'SET_USER',
  SET_AUTH = 'SET_AUTH',
  SET_USERS = 'SET_USERS',
}

export type State = {
  isLoading: boolean;
  isAuth: boolean;
  user: User;
};

export type User = {
  email: string;
  password: string;
  isActivatedAccount: boolean;
};

export type AuthResponce = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

type setLoading = {
  type: AuthTypes.SET_LOADING;
  payload: boolean;
};

type setUser = {
  type: AuthTypes.SET_USER;
  payload: User;
};

type setAuth = {
  type: AuthTypes.SET_AUTH;
  payload: boolean;
};

type setUsers = {
  type: AuthTypes.SET_USERS;
  payload: Array<User>;
};

export type AuthActions = setUsers | setAuth | setUser | setLoading;
