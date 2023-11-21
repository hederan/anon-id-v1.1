import { Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnonLoader } from 'src/components/AnonLoader';
import { Camera } from 'src/components/FaceLiveness/camera';

export const Verify = () => {
  const [faceDescripter, setFaceDescripter] = useState(null);
  const [error, setError] = useState('');
  const [isCameraOpen, setCameraOpen] = useState(true);
  const [isDetected, setIsDetected] = useState(false);
  const [confidence, setConfidence] = useState(0);
  const [outline, setOutline] = useState('#ff0000');
  const [screenshot, setScreenshot] = useState(null);
  const navigate = useNavigate();
  const [isOldUser, setOldUser] = useState(true);

  const turnOnCamera = () => {
    setCameraOpen(true);
    setIsDetected(false);
  };

  return (
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
          {' '}
          {isOldUser ? (
            <>
              Welcome: <span style={{ fontStyle: 'italic' }}>"Secret Identity"</span>{' '}
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
          <VerifyButton>{isOldUser ? 'Log In' : 'Register'}</VerifyButton>
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

const VerifyButton = styled(Button)(({ theme }) => ({
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
