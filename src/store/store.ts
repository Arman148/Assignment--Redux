import { configureStore } from '@reduxjs/toolkit'
import itemReducer from '../features/items/itemSlice';

// configuration of redux store
const store = configureStore({
    reducer: {
      items: itemReducer,
    },
  });


export type RootState = ReturnType<typeof store.getState>; // type of RootState which is type of Redux state
export type AppDispatch = typeof store.dispatch;  // type of Redux store dispatch function
export default store;