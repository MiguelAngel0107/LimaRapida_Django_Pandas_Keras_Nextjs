import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slices/combineSlices";
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
