/* eslint-disable  @typescript-eslint/no-misused-promises */
/* eslint-disable  @typescript-eslint/restrict-plus-operands */
import { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import { Preview } from './preview';
import { Box, Button, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import { Person, Videocam } from '@mui/icons-material';

interface CameraProps {
  setter: any;
  error: string;
  setError: (value: string) => void;
  isCameraOpen: boolean;
  setCameraOpen: (value: boolean) => void;
  isDetected: boolean;
  setDetected: (value: boolean) => void;
  turnOnCamera: () => void;
  outline: string;
  setOutline: (value: string) => void;
  screenshot: any;
  setScreenshot: (value: any) => void;
  confidence: number;
  setConfidence: (value: number) => void;
}

export const Camera = (props: CameraProps) => {
  const {
    setter,
    error,
    setError,
    isCameraOpen,
    setCameraOpen,
    isDetected,
    setDetected,
    turnOnCamera,
    screenshot,
    setScreenshot,
    outline,
    setOutline,
    confidence,
    setConfidence
  } = props;
  const webcamRef = useRef<Webcam | null>(null);
  const detection = useRef<any>();

  console.log({ webcamRef });

  const takeScreenshot = () => {
    if (webcamRef.current) {
      console.log('webcamRef.current', webcamRef.current);
      const _screenshot = webcamRef.current.getScreenshot();
      console.log('takeScreenshot: ', _screenshot);
      setScreenshot(_screenshot);
      setCameraOpen(false);
      setDetected(true);
    }
  };

  const handleStreamVideo = async () => {
    try {
      console.log('hello stream');
      await faceapi.nets.tinyFaceDetector.loadFromUri('facenet/models/tiny_face_detector');
      console.log('I am here');
      let counter = 0;

      detection.current = setInterval(async () => {
        if (counter <= 40) {
          if (webcamRef.current == null) {
            return;
          }
          try {
            console.log('hello');
            console.log('video: ', webcamRef.current.video);
            const faces = await faceapi.detectAllFaces(
              webcamRef.current.video as faceapi.TNetInput,
              new faceapi.TinyFaceDetectorOptions()
            );
            console.log({ faces });
            if (faces.length === 1 && faces[0].score > 0.5) {
              counter++;
              setOutline('#00ff00');
              setError('Stand still for ' + Math.round(4 - counter / 10) + ' seconds.');
            } else {
              counter = 0;
              setOutline('#f00000');
              setError('Place the face in the oval.');
            }
          } catch (e) {
            console.log('facesGettingError: ', e);
          }
        } else {
          takeScreenshot();
          clearInterval(detection.current);
        }
      }, 100);
    } catch (e) {
      console.log('handleStreamVideoError: ', e);
    }
  };

  const handleCameraError = (e: any) => {
    console.log('handleCameraError:', e);
    setError('There was a problem accessing the Webcam. Grant permission and reload the page.');
  };

  return (
    <>
      {isCameraOpen ? (
        <WebcamContainer>
          <Webcam
            id="webcam"
            ref={webcamRef}
            className="camera-video"
            screenshotFormat="image/jpeg"
            screenshotQuality={1}
            mirrored={true}
            videoConstraints={{ facingMode: 'user' }}
            onUserMedia={handleStreamVideo}
            onUserMediaError={handleCameraError}
            style={{ borderRadius: '50%', width: '500px', height: '500px' }}
          />
        </WebcamContainer>
      ) : isDetected ? (
        <Preview
          screenshot={screenshot}
          confidence={confidence}
          setConfidence={setConfidence}
          turnOnCamera={turnOnCamera}
          setter={setter}
        />
      ) : (
        <>
          <Person sx={{ color: '#9c9494', fontSize: '300px' }} />
        </>
      )}
    </>
  );
};

const FaceScanArea = styled(Box)(({ theme }) => ({
  width: '360px',
  height: '360px',
  borderRadius: '50%',
  backgroundColor: '#FFF',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative'
}));

const VerifyButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#3772FF',
  textTransform: 'none',
  borderRadius: '4px',
  color: '#FFF',
  width: '100%',
  '&:hover': {
    backgroundColor: '#3772FF'
  }
}));

const CameraOverlay = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: '24px',
  left: '24px',
  right: '24px',
  bottom: '24px',
  border: '3px dashed',
  borderRadius: '50%'
}));

const WebcamContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));
