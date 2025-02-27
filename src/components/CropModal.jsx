"use client"
import {useCallback, useState} from "react";
import getCroppedImg from "@/utils/CropUtils";
import Cropper from "react-easy-crop";

export default function CropModal({
                                    imageSrc,
                                    aspectRatio,
                                    onCropComplete,
                                    onClose,
                                    onAspectChange,
                                  }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      onCropComplete(croppedImage); // 크롭 완료 시 부모 컴포넌트에 이미지 전달
    } catch (error) {
      console.error(error);
    }
  }, [croppedAreaPixels, imageSrc, onCropComplete]);

  return (
    <div 
      style={{ position: "fixed", zIndex: 1000, top: 0, left: 0, right: 0, bottom: 0}}
      className="w-full h-screen bg-yellow-400"
    >
      <div className="">
        <div style={{ position: "relative", width: "80%", height: "60vh"}} className="max-h-[45vh]">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspectRatio} // 선택된 비율로 크롭
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropComplete}
          />
        </div>
        <div className="space-x-4" style={{ textAlign: "center", marginTop: 20 }}>
          <button onClick={() => onAspectChange(1 / 1)}>1:1</button>
          <button onClick={() => onAspectChange(3 / 4)}>3:4</button>
          <button onClick={() => onAspectChange(4 / 5)}>4:5</button>
          <button onClick={() => onAspectChange(9 / 16)}>9:16</button>
        </div>
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <button onClick={onClose} className="mr-10">
            취소
          </button>
          <button onClick={handleCropImage}>
            완료
          </button>
        </div>
      </div>
    </div>
  );
}