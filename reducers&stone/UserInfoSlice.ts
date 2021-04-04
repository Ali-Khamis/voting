import { createSlice } from "@reduxjs/toolkit";
import { Movie, AddMovieAction } from "../types";
let initialState: Movie[] = [];
const userInfoSlice = createSlice({
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
export const { addMovieCase } = userInfoSlice.actions;
export default userInfoSlice.reducer;
