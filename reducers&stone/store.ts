import { configureStore } from "@reduxjs/toolkit";
import userAndImagesInfoSlice from "./UserInfoSlice";

const store = configureStore({
  reducer: userAndImagesInfoSlice,
});

export default store;
