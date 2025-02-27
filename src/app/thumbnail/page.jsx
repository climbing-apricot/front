"use client"
import {useEffect, useState} from "react";
import CropModal from "@/components/CropModal";

export default function Thumbnail() {
  const [selectedImage, setSelectedImage] = useState(null); // 업로드된 원본 이미지
  const [croppedImage, setCroppedImage] = useState(null); // 크롭된 이미지
  const [showCropModal, setShowCropModal] = useState(false); // 크롭 화면 표시 여부
  const [aspectRatio, setAspectRatio] = useState(1 / 1);
  const [template, setTemplate] = useState("DEFAULT");
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    fetch("/data/options.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("failed to fetch JSON data");
        }
        return res.json();
      })
      .then((data) => {
        setOptions(data);
      })
      .catch((err) => {
        console.error("Error fetching JSON data:", err);
      })
  }, []);

  // 파일 선택 및 크롭 화면 전환 핸들러
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result); // 이미지 데이터 설정
        setShowCropModal(true); // 크롭 화면 활성화
      };
      reader.readAsDataURL(file);
    }
  };

  // 크롭 완료 핸들러
  const handleCropComplete = (croppedImage) => {
    setCroppedImage(croppedImage); // 크롭된 이미지 저장
    setShowCropModal(false); // 크롭 화면 닫기
  };

  // 업로드된 이미지 삭제 핸들러
  const handleImageRemove = () => {
    setSelectedImage(null);
    setCroppedImage(null);
  };

  // 드롭다운 선택 핸들러
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
      <div className="w-full">
        <h1 className="mt-8 text-apricot-orange text-2xl font-bold text-center">
          썸네일을 만들어보쟈
        </h1>

        <div className="mt-6 w-[80%] min-h-[39vh] mx-[10%] border rounded">
          {croppedImage ? (
              <div>
                <div className="absolute z-20 w-[80%] -mt-3 flex justify-end">
                  <div
                    className="w-3"
                    onClick={handleImageRemove}
                  >
                    X
                  </div>
                </div>
                {/* 크롭된 이미지 미리보기 */}
                <img src={croppedImage} alt="Cropped" className="max-h-[39vh] mx-auto"/>
              </div>
          ) : (
              <div
                className="m-full h-[35vh] flex items-center justify-center"
                onClick={() => document.getElementById("image-upload").click()}
              >
                탭하여 이미지 추가
              </div>
          )}
        </div>

        <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{display: "none"}}
        />

        <div className="w-[80%] mx-auto mt-2 space-y-4">
          <div>
            <div>
              템플릿
            </div>
            <div>
              셀렉트
            </div>
          </div>

          <div>
            <div>
              암장
            </div>
            <select value={selectedOption} onChange={handleOptionChange}>
              <option value="" disabled>
                Select an option
              </option>
              {options.map((option) => (
                <option key={option.id} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div>
              성공
            </div>
          </div>
        </div>

        {/* 크롭 모달 */}
        {showCropModal && (
          <CropModal
            imageSrc={selectedImage}
            aspectRatio={aspectRatio} // 기본 비율 (1:1)
            onCropComplete={handleCropComplete}
            onClose={() => setShowCropModal(false)}
            onAspectChange={setAspectRatio} // 비율 변경 핸들러 전달
          />
        )}
      </div>
  );
}