import ImageListItem from "./ImageslistItem";
import React from "react";
import { ImagesListProps, DbImage } from "../types";
import imagesListStyles from "../styles/ImagesList.module.css";

const ImagesList: React.FC<ImagesListProps> = ({
  handleImageClick,
  imagesInfo,
  totalVoters,
  localState,
}) => {
  return (
    <div>
      <h1 className={imagesListStyles.container}>Choose the cutties puppy</h1>
      <br />
      {!localState.userInfo.emailVerified && (
        <h1 className={imagesListStyles.didNotVoteNotice}>
          {" "}
          Please verify your email to be able to vote
        </h1>
      )}
      <div className={imagesListStyles.imagesContainer}>
        {imagesInfo.map((imageInfo: DbImage, index: number) => {
          return (
            <ImageListItem
              key={index}
              imageInfo={imageInfo}
              handleImageClick={handleImageClick}
              totalVoters={totalVoters}
              localState={localState}
            />
          );
        })}
      </div>
      {localState.userInfo.emailVerified &&
        !localState.userInfo.imageVotedId && (
          <h3 className={imagesListStyles.didNotVoteNotice}>
            Please vote to see results
          </h3>
        )}
    </div>
  );
};

export default ImagesList;
