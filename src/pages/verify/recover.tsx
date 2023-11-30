/* eslint-disable  @typescript-eslint/no-misused-promises */
import { Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AnonRegisterLoader } from 'src/components/AnonLoader/registLoader';
import { Camera } from 'src/components/FaceLiveness/camera';
import { AnonIDPng } from 'src/config/images';
import { PRIVATE_ROUTES } from 'src/config/routes';
import { saveFileToNFTStorage } from 'src/services/ipfs-service';

export const RecoverFace = () => {
  const { username } = useParams();
  const [faceDescripter, setFaceDescripter] = useState(null);
  const [error, setError] = useState('');
  const [isCameraOpen, setCameraOpen] = useState(true);
  const [isDetected, setIsDetected] = useState(false);
  const [confidence, setConfidence] = useState(0);
  const [outline, setOutline] = useState('#ff0000');
  const [screenshot, setScreenshot] = useState(null);
  const [isOldUser, setOldUser] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isRecoverLoading, setRecoverLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<number | null>(null);

  const turnOnCamera = () => {
    setCameraOpen(true);
    setIsDetected(false);
  };

  const uploadFileToIPFS = async (face: any) => {
    const path = await saveFileToNFTStorage(face);
    return path;
  };

  const sendRecoverFace = async () => {
    try {
      if (username == null) return;
      setLoading(true);
      const ipfsHash = await uploadFileToIPFS(screenshot);
      console.log({ ipfsHash });
      const res = await axios.post(`${PRIVATE_ROUTES.server}/auth/recover`, {
        username: username,
        faceDescripter: faceDescripter,
        ipfsHash: ipfsHash
      });
      const data = res.data.message;
      if (data) {
        setLoading(false);
        setRecoverLoading(true);
      }
    } catch (err: any) {
      console.log('sendRecoverFace', err);
      const error = err?.response?.data;
      setError(error?.message);
      setLoading(false);
    }
  };

  const getIsRecover = async () => {
    try {
      if (username == null) return;
      const res = await axios.post(`${PRIVATE_ROUTES.server}/auth/isRecover`, { username: username });
      const isRecover = res.data.data;
      if (isRecover === true) {
        setRecoverLoading(true);
      } else {
        setRecoverLoading(false);
      }
    } catch (err) {
      console.log('Get IsRecover Error: ', err);
      setRecoverLoading(false);
    }
  };

  useEffect(() => {
    getIsRecover();
  }, []);

  const isAbleToVerify = isDetected && confidence > 50 && !isLoading;
  console.log({ isAbleToVerify, isDetected, confidence, isLoading });

  return isRecoverLoading ? (
    <AnonRegisterLoader loaderText="Recovering" />
  ) : (
    <RecoverFaceWrapper>
      <RecoverFaceContainer>
        <RecoverFaceTitle>Account Recovery for {username}</RecoverFaceTitle>
        <RecoverFaceImg src={AnonIDPng} alt="recover-face" />
        <RecoverActionContainer>
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
          <RecoverButton disabled={!isAbleToVerify} onClick={sendRecoverFace}>
            Recover with Selfie
          </RecoverButton>
        </RecoverActionContainer>
      </RecoverFaceContainer>
    </RecoverFaceWrapper>
  );
};

const RecoverFaceWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  alignItems: 'center'
}));

const RecoverFaceContainer = styled(Box)(({ theme }) => ({
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

const RecoverFaceTitle = styled(Box)(({ theme }) => ({
  fontSize: '40px',
  color: '#FFF'
}));

const RecoverFaceImg = styled('img')(({ theme }) => ({
  width: '320px',
  height: 'auto'
}));

const RecoverActionContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  alignItems: 'center',
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

const RecoverButton = styled(Button)(({ theme }) => ({
  borderRadius: '4px',
  backgroundColor: '#4532CE',
  color: '#fff',
  fontWeight: '600',
  textTransform: 'none',
  fontSize: '24px',
  height: '48px',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  '&:hover': {
    backgroundColor: '#4532CE'
  }
}));

const ErrorText = styled(Box)(({ theme }) => ({
  fontSize: '14px',
  width: '320px',
  textAlign: 'center',
  height: '40px'
}));
