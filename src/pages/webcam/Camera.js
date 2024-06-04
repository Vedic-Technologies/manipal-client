import React, { useState, useEffect, useCallback, useRef } from 'react';
import Webcam from 'react-webcam';

const videoConstraints = {
  width: 500,
  height: 500,
  facingMode: "user"
};

const Camera = ({ setImageFile, setDefaultImage }) => {
  const [image, setImage] = useState('');
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    setImageFile(imageSrc);
  }, [setImageFile]);

  const retakeImage = () => {
    setImage('');
  };

  return (
    <>
      <div>
        {image === '' ? (
          <Webcam
            audio={false}
            height={500}
            width={500}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
        ) : (
          <img src={image} alt='cam_pic' />
        )}
        {image !== '' ? (
          <button onClick={retakeImage} className="webcam-btn">
            Retake Image
          </button>
        ) : (
          <button onClick={capture} className="webcam-btn">
            Capture
          </button>
        )}
      </div>
    </>
  );
};

export default Camera;
