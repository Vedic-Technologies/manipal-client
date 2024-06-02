import React, { useState } from 'react';
import Webcam from 'react-webcam';
import defaultImage from '../../assets/images/default_Image.jpg'; 

const videoConstraints = {
    width: 500,
    height: 500,
    facingMode: "user"
};

const Camera = ({ setImageFile }) => {
    const [image, setImage] = useState(defaultImage);

    const webcamRef = React.useRef(null);

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
            setImage(imageSrc);
            setImageFile(imageSrc);
        } else {
            setImage(defaultImage); // Set default image if screenshot is null
            setImageFile(defaultImage);
        }
    }, [setImage, setImageFile]);

    return (
        <>
            <div>
                {image === defaultImage ? (
                    <Webcam
                        audio={false}
                        height={500}
                        width={500} // 'width' instead of 'Width'
                        ref={webcamRef}
                        screenshotFormat="image/jpeg" // 'screenshotFormat' instead of 'screenshotFormate'
                        videoConstraints={videoConstraints}
                    />
                ) : (
                    <img src={image} alt='cam_pic' />
                )}

                {image !== defaultImage ? (
                    <button onClick={(e) => {
                        e.preventDefault();
                        setImage(defaultImage);
                        setImageFile(defaultImage);
                    }} className="webcam-btn">Retake Image</button>
                ) : (
                    <button onClick={(e) => {
                        e.preventDefault();
                        capture();
                    }} className="webcam-btn">Capture</button>
                )}
            </div>
        </>
    );
};

export default Camera;
