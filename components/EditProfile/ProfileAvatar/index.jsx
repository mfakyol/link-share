import { apiUrl } from "config";
import Popup from "@components/Popup";
import http from "services/http.service";
import classes from "./style.module.scss";
import { useDispatch } from "react-redux";
import { setProfileImage } from "store/panelSlice";
import ImageCropper from "@components/ImageCropper";
import { useRef, useState, useCallback } from "react";
import { getCroppedImage } from "@lib/getCroppedImage";
import FormButton from "@commons/FormComponents/FormButton";

const avatarFileTypeWhiteList = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

function ProfileAvatar({ avatarImage, profileTitle, endPoint }) {
  const fileInputRef = useRef();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [croppedAreaPixels, setCroppedAreaPixels] = useState();

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

  const handleOnClosePopup = useCallback(() => {
    fileInputRef.current.value = "";
    setImageUrl("");
  }, []);

  const handleOnClickUpload = useCallback(async () => {
    const croppedImageBlob = await getCroppedImage(imageUrl, croppedAreaPixels);

    const formData = new FormData();
    formData.append("avatar", croppedImageBlob);
    setLoading(true);
    try {
      const response = await http
        .postWithAuth(`${apiUrl}/appearance/avatar`, { body: formData })
        .then((res) => res.json());
      if (response.status) {
        dispatch(setProfileImage(response.profileImage));
        setImageUrl("");
        fileInputRef.current.value = "";
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [imageUrl, croppedAreaPixels, dispatch]);

  return (
    <div className={classes.avatarWrapper}>
      {avatarImage ? (
        <img className={classes.avatarImage} src={`${apiUrl}/${avatarImage}`} alt="" />
      ) : (
        <span className={classes.avatarFallback}>{profileTitle ? profileTitle[0] : endPoint[0]}</span>
      )}
      <div onClick={handleOnClickAvatar} className={classes.uploadImageIconWrapper}>
        <img className={classes.uploadImageIcon} src="/icons/upload-image.svg" alt="" />
      </div>

      <input
        className={classes.fileInput}
        ref={fileInputRef}
        type="file"
        accept={avatarFileTypeWhiteList.join(",")}
        onChange={handleFileInputChange}
      />
      {imageUrl && (
        <Popup show={imageUrl} onClose={handleOnClosePopup}>
          <ImageCropper
            inputImage={imageUrl}
            croppedAreaPixels={croppedAreaPixels}
            setCroppedAreaPixels={setCroppedAreaPixels}
          />
          <FormButton disabled={loading} className={classes.button} onClick={handleOnClickUpload}>
            Upload
          </FormButton>
        </Popup>
      )}
    </div>
  );
}

export default ProfileAvatar;
