import ImageListItem from "./ImageslistItem";
import { db } from "../firebase";
import React, { useState, useEffect } from "react";
export interface ImagesListProps {
  handleImageClick: (id: string) => void;
}

const ImagesList: React.FC<ImagesListProps> = ({ handleImageClick }) => {
  const [imagesInfo, setImagesInfo] = useState<[] | {}[]>([]);

  useEffect(() => {
    db.collection("Images")
      .get()
      .then((snapshot) => {
        setImagesInfo(snapshot.docs);
      });
  }, []);
  return (
    <>
      <h1>ImagesList</h1>
      {imagesInfo.map((imageInfo, index) => {
        return (
          <ImageListItem
            key={index}
            imageInfo={imageInfo.data()}
            handleImageClick={handleImageClick}
          />
        );
      })}
    </>
  );
};

export default ImagesList;
