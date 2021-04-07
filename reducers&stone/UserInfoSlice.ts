import { createSlice } from "@reduxjs/toolkit";
import { AddUserInfoPayload, InitialState, ToggleVotePayload } from "../types";
let initialState: InitialState = {
  userInfo: {
    name: "",
    id: "",
    email: "",
    emailVerified: false,
    imageVotedId: "",
  },
  imagesInfo: [],
};
const userAndImagesInfoSlice = createSlice({
  name: "movies",
  initialState: initialState,
  reducers: {
    addUserInfo: (state, { payload }: AddUserInfoPayload) => {
      return {
        ...state,
        userInfo: { ...payload },
      };
    },
    toggleVote: (state, { payload }: ToggleVotePayload) => {
      if (payload.imageVotedId === state.userInfo.imageVotedId) {
        return {
          ...state,
          userInfo: { ...state.userInfo, imageVotedId: "" },
        };
      }
      return {
        ...state,
        userInfo: { ...state.userInfo, imageVotedId: payload.imageVotedId },
      };
    },
  },
});
export const { addUserInfo, toggleVote } = userAndImagesInfoSlice.actions;
export default userAndImagesInfoSlice.reducer;
