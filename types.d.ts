import React from "react";
type Id = string;
type AddMovieActionPayload = {
  id: string;
  duration: number;
  director: string;
  title: string;
};
type AddMovieAction = { payload: AddMovieActionPayload };
type DeleteMovieAction = { payload: { id: Id } };
type MoviesReducerProps = (state: [], action) => void;
type Movie = {
  id: string;
  duration: number;
  director: string;
  title: string;
  rate: number;
  usersRated: [];
  timesRatedCounter: number;
  usersWatching: [];
};
type GenerateRandomID = () => number;
interface MoviesProps {
  movies: [] | Movie[];
}

interface MovieItemProps {
  movie: Movie;
}
type RoundToOneDecimal = (num: number) => number;
type AddAdmineActionPayload = {
  id: string;
  name: string;
};
type AddAdminAction = { payload: AddAdmineActionPayload };
type Admin = {
  id: string;
  name: string;
  loggedIn: boolean;
};
type HandleSubmit = (e: React.FormEvent<HTMLFormElement>) => void;
type HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => void;
type SignInAndSignUpFunction = (email: strign, password: stirng) => any;
