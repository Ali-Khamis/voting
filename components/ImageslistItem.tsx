import { ImageListItemProps } from "../types";
import React from "react";

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

  return (
    <>
      <h1>%{votePresentage}</h1>
      <h1>{imageInfo.voters.length}</h1>
      <img
        onClick={() => handleImageClick(imageInfo.Id)}
        src={imageInfo.ImageUrl}
        alt="cute puppy"
      />
    </>
  );
};

export default ImageListItem;
