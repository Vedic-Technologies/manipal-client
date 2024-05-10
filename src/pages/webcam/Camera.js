import React, { useState } from 'react'
import Webcam from 'react-webcam';



const videoConstraints={
	Width:500,
	height:500,
	facingMode:"user"
}
const Camera = () => {
	const [image,setImage]=useState('')
	const webcamRef=React.useRef(null);
	const capture =React.useCallback(
		()=>{
			const imageSrc=webcamRef.current.getScreenshot();
			setImage(imageSrc)
		}
	)
  return (
	<>
	<div>
{
	image==''?<Webcam
	audio={false}
	height={500}
	Width={500}
	ref={webcamRef}
	screenshotFormate="image/jpeg"
	videoConstraints={videoConstraints}
	/>:<img src={image}/>

}
{image != '' ?
                    <button onClick={(e) => {
                        e.preventDefault();
                        setImage('')
                    }}
                        className="webcam-btn">
                        Retake Image</button> :
                    <button onClick={(e) => {
                        e.preventDefault();
                        capture();
                    }}
                        className="webcam-btn">Capture</button>
                }

</div>

	
	
	
	</>
  )
}

export default Camera
