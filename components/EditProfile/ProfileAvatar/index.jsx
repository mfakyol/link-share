import { useCallback } from "react";
import Popup from "@components/Popup";
import { useRef, useState } from "react";
import classes from "./style.module.scss";
import {getCroppedImage} from "@lib/getCroppedImage";
import ImageCropper from "@components/ImageCropper";
import FormButton from "@commons/FormComponents/FormButton";

const avatarFileTypeWhiteList = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

function ProfileAvatar({ avatarImage, profileTitle, endPoint }) {
  const fileInputRef = useRef();

  const [imageUrl, setImageUrl] = useState("");
  const [blob, setBlob] = useState();
  const [croppedImage, setCroppedImage] = useState(null);
  const  [croppedAreaPixels,setCroppedAreaPixels] = useState();

  const handleOnClickAvatar = useCallback(() => {
    fileInputRef.current.click();
  }, []);

  const handleFileInputChange = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!avatarFileTypeWhiteList.some((type) => type == file.type)) return;

    const reader = new FileReader();

    reader.addEventListener(
      "load",
      () => {
        setImageUrl(reader.result);
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  }, []);

  const getBlob = (blob) => {
    // pass blob up from the ImageCropper component
    setBlob(blob);
    var objectURL = URL.createObjectURL(blob);
    console.log(objectURL)
  };

  const handleOnClosePopup = useCallback(() => {
    fileInputRef.current.value = "";
    setImageUrl("");
  }, []);


 

  const handleOnClickUpload = useCallback( async() => {
    const croppedImage = await getCroppedImage(imageUrl, croppedAreaPixels);
    var objectURL = URL.createObjectURL(croppedImage);
    window.open(objectURL)
  }, [imageUrl, croppedAreaPixels]);

  return (
    <div className={classes.avatarWrapper}>
      {avatarImage && <img className={classes.avatarImage} src={avatarImage} alt="" />}
      <div onClick={handleOnClickAvatar} className={classes.uploadImageIconWrapper}>
        <img className={classes.uploadImageIcon} src="/icons/upload-image.svg" alt="" />
      </div>
      <span className={classes.avatarFallback}>{profileTitle ? profileTitle[0] : endPoint[0]}</span>
      <input
        className={classes.fileInput}
        ref={fileInputRef}
        type="file"
        accept={avatarFileTypeWhiteList.join(",")}
        onChange={handleFileInputChange}
      />
      {imageUrl && (
        <Popup show={imageUrl} onClose={handleOnClosePopup}>
          <ImageCropper getBlob={getBlob} inputImage={imageUrl} croppedAreaPixels={croppedAreaPixels} setCroppedAreaPixels={setCroppedAreaPixels} />
          <img style={{ width: "200px", height: "200px" }} src={croppedImage} alt="" />
          <FormButton onClick={handleOnClickUpload}> Upload</FormButton>
        </Popup>
      )}
    </div>
  );
}

export default ProfileAvatar;
