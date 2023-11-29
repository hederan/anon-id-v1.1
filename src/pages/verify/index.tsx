import { Box, Button, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Camera } from 'src/components/FaceLiveness/camera';
import { saveFileToNFTStorage } from 'src/services/ipfs-service';
import axios from 'axios';
import { PRIVATE_ROUTES } from 'src/config/routes';
import { FetchingDataLoader } from 'src/components/AnonLoader/fechingDataLoader';
import { localStorageSet } from 'src/utils/localStorage';
import { useStore } from 'src/context/StoreContext';
import { AnonRegisterLoader } from 'src/components/AnonLoader/registLoader';

export const Verify = () => {
  const { username } = useParams();
  const { setLoggedIn, setUser } = useStore();
  const [faceDescripter, setFaceDescripter] = useState(null);
  const [error, setError] = useState('');
  const [isCameraOpen, setCameraOpen] = useState(true);
  const [isDetected, setIsDetected] = useState(false);
  const [confidence, setConfidence] = useState(0);
  const [outline, setOutline] = useState('#ff0000');
  const [screenshot, setScreenshot] = useState(null);
  const navigate = useNavigate();
  const [isOldUser, setOldUser] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isVerifyLoad, setVerifyLoad] = useState(false);
  const [isRegisterLoad, setRegisterLoad] = useState(false);
  const [errorStatus, setErrorStatus] = useState<number | null>(null);
  const [isRecoverLoading, setRecoverLoading] = useState(true);

  const turnOnCamera = () => {
    setCameraOpen(true);
    setIsDetected(false);
  };

  const uploadFileToIPFS = async (face: any) => {
    const path = await saveFileToNFTStorage(face);
    return path;
  };

  const getOldUser = async () => {
    try {
      if (username == null) {
        return;
      }
      const res = await axios.post(`${PRIVATE_ROUTES.server}/auth/getUser`, { username: username });
      const isReturningUser = res.data.isReturningUser;
      setOldUser(isReturningUser);
      setLoading(false);
    } catch (err) {
      console.log('getOldUser Error: ', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getOldUser();
  }, []);

  const handleVerify = () => {
    isOldUser ? handleLogin() : handleRegister();
  };

  const handleLogin = async () => {
    try {
      setVerifyLoad(true);
      const res = await axios.post(`${PRIVATE_ROUTES.server}/auth/login`, { username, faceDescripter });
      const token = res.data.token;
      console.log({ token });
      localStorageSet('token', token);
      navigate('/dashboard');
      setLoggedIn(true);
      setVerifyLoad(false);
      setUser(username ?? '');
    } catch (err: any) {
      console.log('handleLogin Error: ', err);
      const error = err?.response?.data;
      const status = error?.status;
      setErrorStatus(status);
      setError(error?.message);
      setOutline('#F00000');
      setVerifyLoad(false);
    }
  };

  const handleRegister = async () => {
    try {
      setRegisterLoad(true);
      const hash = await uploadFileToIPFS(screenshot);
      const res = await axios.post(`${PRIVATE_ROUTES.server}/auth/register`, {
        username,
        faceDescripter,
        ipfsHash: hash
      });
      const token = res.data.token;
      localStorageSet('token', token);
      setLoggedIn(true);
      console.log({ token });
      setUser(username ?? '');
      setRegisterLoad(false);
      navigate('/authenticated');
    } catch (err: any) {
      console.log('handleRegister Error: ', err);
      const error = err?.response?.data;
      setError(error?.message);
      setOutline('#F00000');
      setRegisterLoad(false);
    }
  };

  const isAbleToVerify = isDetected && confidence > 50 && !isVerifyLoad;

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

  return isLoading ? (
    <FetchingDataLoader />
  ) : isRegisterLoad ? (
    <AnonRegisterLoader loaderText="Registering" />
  ) : isRecoverLoading ? (
    <AnonRegisterLoader loaderText="Recovering" />
  ) : (
    <VerifyWrapper>
      <VerifyContainer>
        <VerifyTitleContainer>
          <VerifyTitle>{isOldUser ? 'Returning User' : 'NEW USER'}</VerifyTitle>
          <VerifyWarning>
            {isOldUser ? (
              <>
                If you are NOT a returning user {<SubLink onClick={() => navigate('/')}>LOG IN AGAIN</SubLink>} & CHOOSE
                A NEW USERNAME/SECRET IDENTITY
              </>
            ) : (
              <>
                If you are not a new user {<SubLink onClick={() => navigate('/')}>Login Again</SubLink>} and make sure
                your user name is spelled correctly
              </>
            )}
          </VerifyWarning>
        </VerifyTitleContainer>
        <VerifyText>
          {isOldUser ? (
            <>
              Welcome: <span style={{ fontStyle: 'italic' }}>{username}</span>{' '}
              <p style={{ fontStyle: 'italic', fontWeight: '300' }}>Selfie to Log In</p>
            </>
          ) : (
            'Take a Selfie to make your Face your Password'
          )}
        </VerifyText>
        <VerifyActionContainer>
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
          <VerifyButtonContainer>
            <VerifyButton onClick={handleVerify} disabled={!isAbleToVerify}>
              {isVerifyLoad && <CircularProgress size={24} />}
              {isOldUser ? 'Log In' : 'Register'}
            </VerifyButton>
            {errorStatus === 4 && (
              <VerifyButton onClick={() => navigate(`/recovery/${username ?? ''}`)}>{'Recover Account'}</VerifyButton>
            )}
          </VerifyButtonContainer>
        </VerifyActionContainer>
      </VerifyContainer>
    </VerifyWrapper>
  );
};

const VerifyWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  alignItems: 'center'
}));

const VerifyContainer = styled(Box)(({ theme }) => ({
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

const VerifyTitleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}));

const VerifyTitle = styled(Box)(({ theme }) => ({
  fontSize: '64px',
  color: '#fff',
  fontWeight: '600',
  [theme.breakpoints.down(640)]: {
    fontSize: '48px'
  }
}));

const VerifyWarning = styled(Box)(({ theme }) => ({
  fontSize: '20px',
  color: '#fff',
  textAlign: 'center'
}));

const VerifyText = styled(Box)(({ theme }) => ({
  fontSize: '32px',
  color: '#fff',
  textAlign: 'center',
  fontWeight: '600',
  paddingTop: '50px'
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

const VerifyButtonContainer = styled(Box)(({ theme }) => ({
  marginTop: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  width: '100%'
}));

const VerifyButton = styled(Button)(({ theme }) => ({
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

const VerifyActionContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  alignItems: 'center',
  paddingTop: '20px',
  width: '100%'
}));

const SubLink = styled('span')(({ theme }) => ({
  textDecoration: 'underline',
  cursor: 'pointer'
}));

const ErrorText = styled(Box)(({ theme }) => ({
  fontSize: '14px',
  width: '320px',
  textAlign: 'center',
  height: '40px'
}));
