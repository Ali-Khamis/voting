import React from "react";

type UserState = {
  name: string;
  id: string;
  profileImgUrl: string;
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
interface ImagesListProps {
  handleImageClick: (id: string) => void;
  imagesInfo: any[];
  totalVoters: number;
  localState: {};
}
interface ImageListItemProps {
  imageInfo: {
    Id: string;
    ImageUrl: string;
    voters: [] | string[];
  };
  handleImageClick: (id: string) => void;
  totalVoters: number;
  localState: any;
}

type HandleSignOut = () => void;

type ImagesInfo = {
  Id: string;
  ImageUrl: string;
  voters: [] | string[];
};
type VoteForDifferentImage = (oldImageId: string, newImageId: string) => void;
type VoteFunction = (id: string) => void;
