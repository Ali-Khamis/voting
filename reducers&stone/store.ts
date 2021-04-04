import { configureStore } from "@reduxjs/toolkit";
import userInfoSlice from "./UserInfoSlice";

const store = configureStore({
  reducer: userInfoSlice,
});

export default store;
