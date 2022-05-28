import { AuthActions, AuthTypes, State, User } from '../types/auth-types';

const initialState: State = {
  isLoading: false,
  isAuth: false,
  user: {} as User,
};

const authReducer = (state = initialState, action: AuthActions): State => {
  switch (action.type) {
    case AuthTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case AuthTypes.SET_AUTH:
      return {
        ...state,
        isAuth: action.payload,
      };

    case AuthTypes.SET_USER:
      return {
        ...state,
        user: {
          ...state.user,
          email: action.payload.email,
          password: action.payload.password,
          isActivatedAccount: action.payload.isActivatedAccount,
        },
      };
    default:
      return state;
  }
};

export default authReducer;
