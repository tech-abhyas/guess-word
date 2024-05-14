import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice"


const reducer = {
  authReducer
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
