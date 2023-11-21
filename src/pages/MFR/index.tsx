import { Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useState } from 'react';
import { Camera } from 'src/components/FaceLiveness/camera';
import { AnonIDPng } from 'src/config/images';

export const MFR = () => {
  const [faceDescripter, setFaceDescripter] = useState(null);
  const [error, setError] = useState('');
  const [isCameraOpen, setCameraOpen] = useState(true);
  const [isDetected, setIsDetected] = useState(false);
  const [confidence, setConfidence] = useState(0);
  const [outline, setOutline] = useState('#ff0000');
  const [screenshot, setScreenshot] = useState(null);
  const turnOnCamera = () => {
    setCameraOpen(true);
    setIsDetected(false);
  };
  return (
    <MFRWrapper>
      <MFRContainer>
        <MFRBanner>
          <MFRTitle>MFR</MFRTitle>
          <AnonIDImg src={AnonIDPng} alt="anon-id-img" />
        </MFRBanner>
        <MFRAction>
          <FaceScanArea>
            <Camera
              setter={setFaceDescripter}
              error={error}
              setError={setError}
              isCameraOpen={isCameraOpen}
              isDetected={isDetected}
              setCameraOpen={setCameraOpen}
              setDetected={setIsDetected}
              turnOnCamera={turnOnCamera}
              outline={outline}
              setOutline={setOutline}
              screenshot={screenshot}
              setScreenshot={setScreenshot}
              confidence={confidence}
              setConfidence={setConfidence}
            />
          </FaceScanArea>
          <ErrorText sx={{ color: outline }}>{error !== '' && error}</ErrorText>
          <UploadButton>Upload</UploadButton>
        </MFRAction>
      </MFRContainer>
    </MFRWrapper>
  );
};

const MFRWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  alignItems: 'center'
}));

const MFRContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '20px',
  maxWidth: '540px',
  paddingTop: '50px',
  [theme.breakpoints.down(640)]: {
    maxWidth: '420px'
  },
  [theme.breakpoints.down(480)]: {
    maxWidth: '350px'
  }
}));

const MFRBanner = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}));

const MFRTitle = styled(Box)(({ theme }) => ({
  fontSize: '64px',
  fontWeight: '600',
  color: '#FFF'
}));

const AnonIDImg = styled('img')(({ theme }) => ({
  width: '80%',
  height: 'auto'
}));

const MFRAction = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  alignItems: 'center',
  paddingTop: '20px',
  width: '100%'
}));

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

const ErrorText = styled(Box)(({ theme }) => ({
  fontSize: '14px',
  width: '320px',
  textAlign: 'center',
  height: '40px'
}));

const UploadButton = styled(Button)(({ theme }) => ({
  borderRadius: '4px',
  backgroundColor: '#4532CE',
  color: '#fff',
  fontWeight: '600',
  textTransform: 'none',
  fontSize: '24px',
  height: '48px',
  width: '100%',
  marginTop: '20px',
  '&:hover': {
    backgroundColor: '#4532CE'
  }
}));
