import React from "react";

type UserState = {
  name: string;
  id: string;
  email: string;
  emailVerified: boolean;
  imageVotedId: string;
};
type AddUserInfoPayload = { payload: UserState };
type InitialState = {
  userInfo: UserState;
  imagesInfo: [] | {}[];
};
type ToggleVotePayload = { payload: { imageVotedId: string } };
type HandleSubmit = (e: React.FormEvent<HTMLFormElement>) => void;
type HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => void;
type SignInAndSignUpFunction = (email: strign, password: stirng) => any;
type HandleImageClick = (id: string) => void;
