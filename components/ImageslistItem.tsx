import { ImageListItemProps } from "../types";
import React from "react";
import imageStyles from "../styles/ImagesListItem.module.css";

const ImageListItem: React.FC<ImageListItemProps> = ({
  imageInfo,
  handleImageClick,
  totalVoters,
  localState,
}) => {
  let votePresentage = 0;
  if (totalVoters > 0) {
    votePresentage = Math.round((imageInfo.voters.length / totalVoters) * 100);
  }
  // console.log(imageInfo.Id);
  // console.log(localState.userInfo.imageVotedId);

  return (
    <div
      className={imageStyles.container}
      onClick={() => handleImageClick(imageInfo.Id)}
    >
      <div>
        <img
          width={300}
          height={400}
          className={imageStyles.img}
          src={imageInfo.ImageUrl}
          alt="cute puppy"
        />
      </div>
      <div className={imageStyles.details}>
        <h1>%{votePresentage}</h1>
        <h1>voters: {imageInfo.voters.length}</h1>
      </div>
    </div>
  );
};

export default ImageListItem;
