import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import authReducer from './reducers/auth-reducer';

const store = createStore(
  combineReducers({ authReducer }),
  composeWithDevTools(applyMiddleware(thunk)),
);

export type RootState = ReturnType<typeof store.getState>; // тип всего state

export default store;
