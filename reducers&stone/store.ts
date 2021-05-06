import { configureStore } from "@reduxjs/toolkit";
import userAndImagesInfoSlice from "./UserInfoSlice";

const store = configureStore({
  reducer: userAndImagesInfoSlice,
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
