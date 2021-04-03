import { createSlice } from "@reduxjs/toolkit";
let initialState: Movie[] = [];
const UserInfoSlice = createSlice({
  name: "movies",
  initialState: initialState,
  reducers: {
    addMovieCase: (state, { payload }: AddMovieAction) => {
      return [
        ...state,
        {
          ...payload,
          rate: 0,
          usersRated: [],
          timesRatedCounter: 0,
          usersWatching: [],
        },
      ];
    },
  },
});
export const { addMovieCase } = UserInfoSlice.actions;
export default UserInfoSlice.reducer;
