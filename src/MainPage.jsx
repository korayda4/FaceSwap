import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router'dan useNavigate import edin
import './App.sass';
import GlobalButton from './assets/button';

function MainPage() {
  const [image, setImage] = useState(null);
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
    setImage(imgURL);
    setIsTakingPhoto(false);
    video.srcObject.getTracks().forEach(track => track.stop()); // Stop video stream

    // Yönlendirme işlemi
    if (imgURL) {
      navigate('/swap'); // Başarıyla fotoğraf kaydedildikten sonra yönlendirme
    }
  };

  const handleImportPhoto = () => {
    document.getElementById('fileInput').click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
      navigate('/swap'); // Başarıyla fotoğraf yüklendikten sonra yönlendirme
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
              <h4>Step 1</h4>
              <p>Take a Your Photo</p>
            </div>
          </>
      )}
      {!isTakingPhoto && (  
        <>
          <h1>Face Swap</h1>
          <p>
            Let's change Take or Upload a picture
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
          <div className="capture">
            <GlobalButton 
              type={'default'}
              text={'Capture Photo'}
              onClick={handleCapturePhoto}
            />
          </div>
        )}
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>
      <video ref={videoRef} style={{ display: isTakingPhoto ? 'block' : 'none' }}></video>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </div>
  );
}

export default MainPage;
