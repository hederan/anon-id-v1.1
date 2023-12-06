import { Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { verifyToken } from 'src/api/auth';
import { clientName } from 'src/config/config';
import { AnonIDPng } from 'src/config/images';
import { PRIVATE_ROUTES } from 'src/config/routes';
import { useStore } from 'src/context/StoreContext';
import { localStorageGet } from 'src/utils/localStorage';
import { useState, useEffect } from 'react';

export const PreHome = () => {
  const { user } = useStore();
  const navigate = useNavigate();

  const [isLimitVote, setLimitVote] = useState(false);

  const getUserImageScore = async () => {
    axios
      .post(`${PRIVATE_ROUTES.server}/user/userData`, { username: user })
      .then((res) => {
        const data = res.data.data;
        console.log({ res });
        if (data && data.isHuman === false) {
          toast.error('Your face image is too bad. Please try to upload again');
          setLimitVote(true);
        }
      })
      .catch((err: any) => {
        console.log('getUserImageScore Error: ', err);
        const error = err?.response?.data;
        if (error) {
          toast.error(error.message);
        }
      });
  };

  useEffect(() => {
    getUserImageScore();
  }, []);

  const returnBackToClient = () => {
    const clientUri = localStorageGet('redirectUri') as string;
    const token = localStorageGet('token') as string;
    if (clientUri == null || clientUri === '') {
      toast.error("Can't find client uri");
      return;
    }
    if (token == null || token === '') {
      toast.error('Invalid Token');
      return;
    }
    const isValidToken = verifyToken();
    if (isValidToken) {
      window.location.href = `${clientUri}/${token}`;
    }
  };

  return (
    <PreHomeWrapper>
      <PreHomeContainer>
        <PreHomeBanner>
          <PreHomeTitle>
            Welcome: <p>{user}</p>
          </PreHomeTitle>
          <DashboadBannerImg src={AnonIDPng} alt="PreHome-banner-img" />
        </PreHomeBanner>
        <PreHomeAction>
          <ActionButton bgcolor="#4532CE" onClick={returnBackToClient}>
            Click here to sign into “{clientName}”
          </ActionButton>
          {isLimitVote && (
            <ActionButton bgcolor="#4532CE" onClick={() => navigate('/re-register')}>
              Re-Register Your Face
            </ActionButton>
          )}
          <ActionButton bgcolor="#4532CE" onClick={() => navigate('/dashboard')}>
            Click here to earn CASH matching faces!
          </ActionButton>
        </PreHomeAction>
      </PreHomeContainer>
    </PreHomeWrapper>
  );
};

const PreHomeWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  alignItems: 'center'
}));

const PreHomeContainer = styled(Box)(({ theme }) => ({
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

const PreHomeBanner = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  flexDirection: 'column'
}));

const PreHomeTitle = styled(Box)(({ theme }) => ({
  fontSize: '40px',
  fontWeight: '600',
  color: '#FFF',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  width: '500px',
  span: {
    fontStyle: 'italic'
  },
  [theme.breakpoints.down(640)]: {
    fontSize: '32px',
    width: '300px',
    flexDirection: 'column'
  },
  [theme.breakpoints.down(480)]: {
    fontSize: '26px'
  }
}));

const DashboadBannerImg = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto'
}));

const PreHomeAction = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  paddingBottom: '50px',
  width: '100%'
}));

const ActionButton = styled(Button)<{ bgcolor: string }>(({ theme, bgcolor }) => ({
  borderRadius: '4px',
  color: '#FFF',
  width: '100%',
  backgroundColor: bgcolor,
  fontSize: '16px',
  textTransform: 'none',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '68px',
  '&:hover': {
    backgroundColor: bgcolor
  },
  [theme.breakpoints.down(480)]: {
    fontSize: '14px'
  }
}));
