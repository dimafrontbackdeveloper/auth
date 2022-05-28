import { Dispatch } from 'react';
import { axiosInstance } from '../../http';
import { AuthResponce, User, AuthTypes, AuthActions } from '../types/auth-types';

export const registrationAction = (email: string, password: string) => {
  return async (dispatch: Dispatch<AuthActions>) => {
    dispatch({
      type: AuthTypes.SET_LOADING,
      payload: true,
    });
    try {
      const res = await axiosInstance.post<AuthResponce>(`registration`, {
        email,
        password,
      });
      localStorage.setItem('token', res.data.accessToken);
      dispatch({
        type: AuthTypes.SET_USER,
        payload: res.data.user,
      });
      dispatch({
        type: AuthTypes.SET_AUTH,
        payload: true,
      });
    } catch (e: any) {
      throw new Error(e);
    } finally {
      dispatch({
        type: AuthTypes.SET_LOADING,
        payload: false,
      });
    }
  };
};

export const loginAction = (email: string, password: string) => {
  return async (dispatch: any) => {
    dispatch({
      type: AuthTypes.SET_LOADING,
      payload: true,
    });
    try {
      const res = await axiosInstance.post<AuthResponce>('/login', { email, password });
      localStorage.setItem('token', res.data.accessToken);
      dispatch({
        type: AuthTypes.SET_USER,
        payload: res.data.user,
      });
      dispatch({
        type: AuthTypes.SET_AUTH,
        payload: true,
      });
    } catch (e: any) {
      throw new Error(e);
    } finally {
      dispatch({
        type: AuthTypes.SET_LOADING,
        payload: false,
      });
    }
  };
};

export const logoutAction = () => {
  return async (dispatch: any) => {
    dispatch({
      type: AuthTypes.SET_LOADING,
      payload: true,
    });
    try {
      const res = await axiosInstance.post('/logout');
      localStorage.removeItem('token');
      dispatch({
        type: AuthTypes.SET_USER,
        payload: {},
      });
      dispatch({
        type: AuthTypes.SET_AUTH,
        payload: false,
      });
    } catch (e: any) {
      throw new Error(e);
    } finally {
      dispatch({
        type: AuthTypes.SET_LOADING,
        payload: false,
      });
    }
  };
};

export const checkAuthAction = () => {
  return async (dispatch: any) => {
    dispatch({
      type: AuthTypes.SET_LOADING,
      payload: true,
    });
    try {
      const res = await axiosInstance.post<AuthResponce>('/refresh');
      localStorage.setItem('token', res.data.accessToken);
      dispatch({
        type: AuthTypes.SET_USER,
        payload: res.data.user,
      });
      dispatch({
        type: AuthTypes.SET_AUTH,
        payload: true,
      });
    } catch (e: any) {
      throw new Error(e);
    } finally {
      dispatch({
        type: AuthTypes.SET_LOADING,
        payload: false,
      });
    }
  };
};
