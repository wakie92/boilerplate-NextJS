import ReduxLogger from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';

import reducer from './modules';

// Note: disable dev-tools and logs in Production mode
const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(ReduxLogger),
  devTools: process.env.NODE_ENV !== 'production',
});

type StateSelector<T> = (state: RootState) => T;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch();
export const useRootState = <T>(selector: StateSelector<T>) => useSelector(selector, shallowEqual);

const makeStore = () => {
  return store;
};

const wrapper = createWrapper(makeStore, { debug: true });

export default wrapper;
