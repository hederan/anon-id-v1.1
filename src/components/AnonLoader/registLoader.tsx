import { Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import { AnonClock, AnonIDPng } from 'src/config/images';
export const AnonRegisterLoader = () => {
  return (
    <AnonLoaderContainer>
      <AnonIDLogoContainer>
        <AnonIdLogo src={AnonIDPng} alt="anon-id" />
      </AnonIDLogoContainer>
      <div className="three-text-loader">Registering...</div>
      <AnonClockImg src={AnonClock} alt="anon-clock" />
    </AnonLoaderContainer>
  );
};

const AnonLoaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px'
}));

const AnonIDLogoContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  overflow: 'hidden',
  display: 'flex',
  alignitems: 'center',
  justifyContent: 'center'
}));

const AnonIdLogo = styled('img')(({ theme }) => ({
  height: 'auto',
  objectFit: 'cover',
  width: '720px',
  [theme.breakpoints.down(640)]: {
    width: '540px'
  },
  [theme.breakpoints.down(390)]: {
    width: '450px'
  }
}));

const AnonClockImg = styled('img')(({ theme }) => ({
  borderRadius: '50%',
  width: '360px',
  height: '360px',
  [theme.breakpoints.down(380)]: {
    width: '320px',
    height: '320px'
  }
}));
