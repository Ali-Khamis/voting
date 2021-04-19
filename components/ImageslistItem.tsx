import { ImageListItemProps } from "../types";
import React, { useEffect, useState } from "react";
import imageStyles from "../styles/ImagesListItem.module.css";
import Link from "next/Link";

const ImageListItem: React.FC<ImageListItemProps> = ({
  imageInfo,
  handleImageClick,
  totalVoters,
  localState,
}) => {
  const [voted, setVoted] = useState<Boolean>(false);
  const [hovered, setHovered] = useState<Boolean>(false);
  let votePresentage = 0;
  if (totalVoters > 0) {
    votePresentage = Math.round((imageInfo.voters.length / totalVoters) * 100);
  }
  useEffect(() => {
    if (localState.userInfo.imageVotedId === imageInfo.Id) {
      setVoted(true);
    } else {
      setVoted(false);
    }
  }, [localState]);

  return (
    <>
      <div>
        <Link href={`/${imageInfo.Id}`}>
          <div
            className={imageStyles.container}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <div className={imageStyles.imgContainer}>
              <img
                width={300}
                height={400}
                className={imageStyles.img}
                src={imageInfo.ImageUrl}
                alt="cute puppy"
              />
              {hovered && (
                <div className={imageStyles.cardDetails}>Hovered</div>
              )}
            </div>
            <div className={imageStyles.details}>
              <h1>%{votePresentage}</h1>
              <h1>Voters: {imageInfo.voters.length}</h1>
            </div>
          </div>
        </Link>
        <button
          onClick={() => handleImageClick(imageInfo.Id)}
          className={
            !voted
              ? `${imageStyles.voteButton}`
              : ` ${imageStyles.voteButton} ${imageStyles.votedPuppyButton}`
          }
        >
          {" "}
          Vote for the puppy
        </button>
      </div>
    </>
  );
};

export default ImageListItem;
