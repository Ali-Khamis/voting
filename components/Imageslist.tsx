import ImageListItem from "./ImageslistItem";
import React from "react";
import { ImagesListProps } from "../types";

const ImagesList: React.FC<ImagesListProps> = ({
  handleImageClick,
  imagesInfo,
  totalVoters,
  localState,
}) => {
  return (
    <>
      <h1>ImagesList</h1>
      {imagesInfo.map((imageInfo, index) => {
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
    </>
  );
};

export default ImagesList;
