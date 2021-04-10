import ImageListItem from "./ImageslistItem";
import React from "react";
import { ImagesListProps } from "../types";
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
      <div className={imagesListStyles.imagesContainer}>
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
      </div>
    </div>
  );
};

export default ImagesList;
