import React from "react";
import firebase from "firebase/app";

type UserState = {
  name: string;
  id: string;
  profileImgUrl: string;
  email: string;
  emailVerified: boolean;
  imageVotedId: string;
};
type UserFirebaseInfo = {
  displayName: string;
  uid: string;
  photoURL: string;
  email: string;
  emailVerified: boolean;
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
type ResetPasswordFunction = (email: strign) => any;
type HandleImageClick = (id: string) => void;

interface ImagesListProps {
  handleImageClick: (id: string) => void;
  imagesInfo: DbImage[];
  totalVoters: number;
  localState: InitialState;
}
interface ImageListItemProps {
  imageInfo: DbImage;
  handleImageClick: (id: string) => void;
  totalVoters: number;
  localState: InitialState;
}

type HandleSignOut = () => void;

type VoteForDifferentImage = (oldImageId: string, newImageId: string) => void;
type VoteFunction = (id: string) => void;

type PuppyInfo = { puppyName: string; puppyImageUrl: string };
type GetStaticPropsParametars = {
  params: { id: "SdIVLWJLBLZFmzl6VSqv" };
  locales: undefined;
  locale: undefined;
  defaultLocale: undefined;
};
type getStaticPropsFunction = (
  args: GetStaticPropsParametars
) => Promise<{ props: { puppyInfo: PuppyInfo } }>;
interface PuppyPageProps {
  puppyInfo: PuppyInfo;
}
type DbImage = {
  name: string;
  Id: string;
  ImageUrl: string;
  result: number;
  voters: string[];
};

type SnapShotType = {
  [field: string]: any;
};
type Error = {
  code: string;
  message: string;
};
