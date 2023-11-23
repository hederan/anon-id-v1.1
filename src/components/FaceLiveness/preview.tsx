/* eslint-disable  @typescript-eslint/no-misused-promises */
import { Box, Button, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import { useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

interface PreviewProps {
  screenshot: any;
  turnOnCamera: any;
  setter: any;
  confidence: number;
  setConfidence: (value: number) => void;
}

export const Preview = (props: PreviewProps) => {
  const { screenshot, turnOnCamera, setter, confidence, setConfidence } = props;

  const previewRef = useRef<HTMLImageElement | null>(null);
  const [isFlashing, setIsFlashing] = useState(true);

  const detectFaces = async (previewRef: React.MutableRefObject<HTMLImageElement | null>) => {
    try {
      if (previewRef?.current == null) {
        return;
      }
      await faceapi.nets.ssdMobilenetv1.loadFromUri('/facenet/models/ssd_mobilenetv1');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/facenet/models/face_landmark_68');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/facenet/models/face_recognition');
      const faces = await faceapi
        .detectAllFaces(previewRef.current as faceapi.TNetInput, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors();
      const displaySize = { width: previewRef.current.width, height: previewRef.current.height };
      const resizedDetections = faceapi.resizeResults(faces, displaySize);
      console.log({ faces, displaySize, resizedDetections });
      return resizedDetections;
    } catch (err) {
      console.log('detectFaceError: ', err);
    }
  };

  const handleScreenshot = async () => {
    try {
      console.log({ previewRef });
      const faces = await detectFaces(previewRef);
      console.log({ prevFaces: faces });
      if (faces == null) return;
      setIsFlashing(false);
      console.log({ faces, score: faces[0].detection.score });
      setConfidence(Math.floor(faces[0].detection.score * 100));
      const descriptorArray = Object.keys(faces[0].descriptor).map((key: any) => {
        return faces[0].descriptor[key];
      });

      setter(descriptorArray);
    } catch (err) {
      console.log('gettingScreenshotError: ', err);
    }
  };

  return (
    <PreviewContainer>
      <PreviewImageContainer>
        <Img ref={previewRef} src={screenshot} alt="preview" onLoad={handleScreenshot} />
      </PreviewImageContainer>
      {!isFlashing ? (
        <>
          <ResultContainer>
            {confidence > 50 ? (
              <DoneIcon style={{ fontSize: 128, color: 'lime' }} />
            ) : (
              <CloseIcon style={{ fontSize: 128, color: 'red' }} />
            )}

            <h1>Confidence: {confidence}%</h1>
            <Button variant="outlined" color="inherit" sx={{ padding: '8px 20px' }} onClick={turnOnCamera}>
              Retake
            </Button>
          </ResultContainer>
        </>
      ) : (
        <FlashContainer>
          <Img alt="flash" src={require('../../assets/images/face/recognition.gif')} />
        </FlashContainer>
      )}
    </PreviewContainer>
  );
};

const PreviewContainer = styled(Box)(({ theme }) => ({
  position: 'relative'
}));

const PreviewImageContainer = styled(Box)(({ theme }) => ({
  width: '360px',
  height: '360px'
}));

const FlashContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  top: 0,
  left: 0,
  width: '360px',
  height: '360px',
  backgroundColor: 'black',
  borderRadius: '50%',
  position: 'absolute'
}));

const Img = styled('img')(({ theme }) => ({
  transform: 'scale(1)',
  verticalAlign: 'middle',
  width: '100%',
  height: '100%',
  borderRadius: '50%'
}));

const ResultContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.25)',
  borderRadius: '50%',
  color: '#000'
}));
