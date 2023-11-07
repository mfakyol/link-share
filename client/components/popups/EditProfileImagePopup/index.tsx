import Cropper from "react-easy-crop";
import { useDispatch } from "react-redux";
import classes from "./styles.module.scss";
import getCroppedImg from "@/utils/cropImage";
import Popup, { PopupRef } from "@/components/common/Popup";
import Button from "@/components/common/Button";
import { Point, Area } from "react-easy-crop/types";
import UploadImageIcon from "@/icons/UploadImageIcon";
import { setPageSetting } from "@/store/dashboardSlice";
import pageSettingService from "@/services/pageSettingService";
import { ChangeEvent, DragEvent, MouseEvent, useCallback, useRef, useState } from "react";

interface CreateLinkPopupProps {
  visible: boolean;
  onClose(): void;
}

function EditProfileImagePopup({ visible, onClose }: CreateLinkPopupProps) {
  const dispatch = useDispatch();
  const popupRef = useRef<PopupRef>(null);

  const [loading, setLoading] = useState(false);

  const [zoom, setZoom] = useState(1);
  const [imageSrc, setImageSrc] = useState("");
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();

  const handleOnClose = useCallback(() => {
    setImageSrc((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return "";
    });
    onClose?.();
  }, [onClose]);

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const createAndSetFileUrl = useCallback((file: File) => {
    const [type, extension] = file.type.split("/");
    if (type == "image" || ["png", "jpg", "jpeg"].some((ext) => ext == extension)) {
      const imageUrl = URL.createObjectURL(file);
      var img = new Image();

      img.onload = function () {
        if (img.width < 100 || img.height < 100) {
          // will show error
          URL.revokeObjectURL(img.src);
        } else {
          setImageSrc(imageUrl);
        }
      };
      img.src = imageUrl;
    }
  }, []);

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const file = e.dataTransfer.files[0];
      if (file) createAndSetFileUrl(file);
    },
    [createAndSetFileUrl]
  );

  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) createAndSetFileUrl(file);
    },
    [createAndSetFileUrl]
  );

  const handleClickClear = useCallback((e: MouseEvent) => {
    setImageSrc((prev) => {
      URL.revokeObjectURL(prev);
      return "";
    });
  }, []);
  const handleClickConfirm = useCallback(
    async (imageSrc: string, crop: Area | undefined, e: MouseEvent) => {
      if (!crop) return;
      const croppedImageUrl = (await getCroppedImg(imageSrc, crop, 0, undefined, { width: 100, height: 100 })) as string;
      setLoading(true);
      const response = await pageSettingService.uploadProfileImage(croppedImageUrl);
      if (response.status) {
        dispatch(setPageSetting(response.data));
        popupRef.current?.closePopup?.();
      } else {
        // will show error
      }
      URL.revokeObjectURL(croppedImageUrl);
      setLoading(false);
    },
    [dispatch]
  );

  return (
    <Popup ref={popupRef} visible={visible} title="Upload Image" onClose={handleOnClose} containerClassName={classes.container}>
      <div className={classes.contentWrapper}>
        <div className={classes.contentContainer}>
          {imageSrc ? (
            <>
              <div className={classes.cropperContainer}>
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  cropShape="round"
                  showGrid={false}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              </div>
              <div className={classes.buttons}>
                <Button className={classes.button} color="red" onClick={handleClickClear}>
                  Clear
                </Button>
                <Button
                  className={classes.button}
                  color="blue"
                  onClick={handleClickConfirm.bind(null, imageSrc, croppedAreaPixels)}
                  loading={loading}
                >
                  Confirm
                </Button>
              </div>
            </>
          ) : (
            <div className={classes.uploadContainer}>
              <input
                type="file"
                className={classes.uploadInput}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                accept=".png, .jpg, .jpeg"
                onChange={handleOnChange}
              />
              <div className={classes.uploadInfo}>
                <UploadImageIcon className={classes.uploadImageIcon} />
                <p className={classes.uploadInfoText}>Click here or drag & drop file to upload image.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Popup>
  );
}

export default EditProfileImagePopup;
