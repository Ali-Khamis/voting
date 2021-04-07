export interface ImageListItemProps {
  imageInfo: {
    Id: string;
    ImageUrl: string;
  };
  handleImageClick: (id: string) => void;
}

const ImageListItem: React.FC<ImageListItemProps> = ({
  imageInfo,
  handleImageClick,
}) => {
  return (
    <>
      <img
        onClick={() => handleImageClick(imageInfo.Id)}
        src={imageInfo.ImageUrl}
        alt="cute puppy"
      />
    </>
  );
};

export default ImageListItem;
