/* eslint-disable  @typescript-eslint/no-misused-promises */
import { Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AnonRegisterLoader } from 'src/components/AnonLoader/registLoader';
import { Camera } from 'src/components/FaceLiveness/camera';
import { AnonIDPng } from 'src/config/images';
import { PRIVATE_ROUTES } from 'src/config/routes';
import { useStore } from 'src/context/StoreContext';
import { saveFileToNFTStorage } from 'src/services/ipfs-service';
import { localStorageDelete } from 'src/utils/localStorage';

export const ReRegister = () => {
  const [faceDescripter, setFaceDescripter] = useState(null);
  const [error, setError] = useState('');
  const [isCameraOpen, setCameraOpen] = useState(true);
  const [isDetected, setIsDetected] = useState(false);
  const [confidence, setConfidence] = useState(0);
  const [outline, setOutline] = useState('#ff0000');
  const [screenshot, setScreenshot] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isReRegisterLoading, setReRegisterLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<number | null>(null);
  const { user, setUser, setLoggedIn } = useStore();
  const navigate = useNavigate();

  const turnOnCamera = () => {
    setCameraOpen(true);
    setIsDetected(false);
  };

  const uploadFileToIPFS = async (face: any) => {
    const path = await saveFileToNFTStorage(face);
    return path;
  };

  const reRegisterFace = async () => {
    try {
      if (user == null) return;
      setLoading(true);
      const ipfsHash = await uploadFileToIPFS(screenshot);
      const res = await axios.post(`${PRIVATE_ROUTES.server}/auth/re-register`, {
        username: user,
        faceDescripter: faceDescripter,
        ipfsHash: ipfsHash
      });
      setLoggedIn(false);
      setUser('');
      localStorageDelete('token');
      navigate('/');
      toast.success('You need to wait until other users voted');
    } catch (err: any) {
      console.log('Re-Register Error: ', err);
      const error = err?.response?.data;
      if (error) {
        toast.error(error.message);
      }
    }
  };

  return isLoading ? (
    <AnonRegisterLoader loaderText="Registering" />
  ) : (
    <ReRegisterFaceWrapper>
      <ReRegisterFaceContainer>
        <ReRegisterFaceTitle>Account Re-Registering for {user}</ReRegisterFaceTitle>
        <ReRegisterFaceImg src={AnonIDPng} alt="ReRegister-face" />
        <ReRegisterActionContainer>
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
          <ReRegisterButton disabled={isLoading} onClick={reRegisterFace}>
            Re-Register with Selfie
          </ReRegisterButton>
        </ReRegisterActionContainer>
      </ReRegisterFaceContainer>
    </ReRegisterFaceWrapper>
  );
};

const ReRegisterFaceWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  alignItems: 'center'
}));

const ReRegisterFaceContainer = styled(Box)(({ theme }) => ({
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

const ReRegisterFaceTitle = styled(Box)(({ theme }) => ({
  fontSize: '40px',
  color: '#FFF'
}));

const ReRegisterFaceImg = styled('img')(({ theme }) => ({
  width: '320px',
  height: 'auto'
}));

const ReRegisterActionContainer = styled(Box)(({ theme }) => ({
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

const ReRegisterButton = styled(Button)(({ theme }) => ({
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
