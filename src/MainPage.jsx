import { useState, useRef } from 'react';
import './App.sass';
import GlobalButton from './assets/button';

function App() {
  const [image, setImage] = useState(null);
  const [swapImage, setSwapImage] = useState(null);
  const videoRef = useRef(null);

  const handleTakePhoto = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch(err => {
        console.error("Error accessing the camera: ", err);
      });
  };

  return (
    <div className="container">
      <h1>Face Swap</h1>
      <p>Upload a photo of a face and swap it with another face!</p>
      <div className="add-image">
        <GlobalButton 
          type={'primary'}
          text={'Take a Photo'}
          bgColor="#ff5500"
          onClick={handleTakePhoto}
        />
        <GlobalButton 
          type={'default'}
          text={'Import From Device'}
        />
      </div>
      <video ref={videoRef} style={{ display: image ? 'none' : 'block' }}></video>
    </div>
  );
}

export default App;
