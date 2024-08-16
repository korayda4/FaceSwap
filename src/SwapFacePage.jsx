import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router'dan useNavigate import edin
import './App.sass';
import { Tag } from 'antd';
import GlobalButton from './assets/button';

function SwapFace() {
  const [image2, setImage2] = useState(null);
  const [isTakingPhoto, setIsTakingPhoto] = useState(false); // Capture button visibility
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate(); // useNavigate hook'unu kullanın

  const handleTakePhoto = () => {
    setIsTakingPhoto(true);
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch(err => {
        console.error("Error accessing the camera: ", err);
      });
  };

  const handleCapturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const imgURL = canvas.toDataURL('image/png');
    setImage2(imgURL);
    setIsTakingPhoto(false);
    video.srcObject.getTracks().forEach(track => track.stop()); // Stop video stream

    if (imgURL) {
      navigate('/process'); // Başarıyla fotoğraf kaydedildikten sonra yönlendirme
    }
  };

  const handleImportPhoto = () => {
    document.getElementById('fileInput').click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage2(reader.result);
      navigate('/process'); // Başarıyla fotoğraf yüklendikten sonra yönlendirme
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container">
      {isTakingPhoto && (
          <>
            <div className="steps">
              <h4>Step 2</h4>
              <p>Take the photo to be exchanged</p>
            </div>
          </>
      )}
      {!isTakingPhoto && (  
        <>
          <h1>Face Swap</h1>
          <p>
            Now the other person's photo is required!
          </p>
        </>
      )}
      <div className="add-image">
        {!isTakingPhoto && (
          <>
            <GlobalButton 
              type={'primary'}
              text={'Take a Photo'}
              bgColor="#ff5500"
              onClick={handleTakePhoto}
            />
            <GlobalButton 
              type={'default'}
              text={'Import From Device'}
              onClick={handleImportPhoto}
            />
          </>
        )}
        {isTakingPhoto && (
          <GlobalButton 
            type={'default'}
            text={'Capture Photo'}
            onClick={handleCapturePhoto}
          />
        )}
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>
      {!isTakingPhoto && <Tag color="#87d068">Step 1 Successfully Completed</Tag> }
      <video ref={videoRef} style={{ display: isTakingPhoto ? 'block' : 'none'}}></video>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </div>
  );
}

export default SwapFace;
