import { useState } from "react";
import Cropper from "react-easy-crop";
import classes from "./style.module.scss";

function ImageCropper({ inputImage, setCroppedAreaPixels }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = async (_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  return (
    <div className={classes.cropWrapper}>
      <Cropper
        image={inputImage}
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
  );
}

export default ImageCropper;
