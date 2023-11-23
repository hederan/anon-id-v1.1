import { Box, Button, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import { AnonIDPng } from 'src/config/images';

export const FetchingDataLoader = () => {
  return (
    <AnonLoaderContainer>
      <AnonIDLogoContainer>
        <AnonIdLogo src={AnonIDPng} alt="anon-id" />
      </AnonIDLogoContainer>
      <CircularProgress size={64} sx={{ color: '#61BAE3' }} />
    </AnonLoaderContainer>
  );
};

const AnonLoaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  justifyContent: 'center'
}));

const AnonIDLogoContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  overflow: 'hidden',
  display: 'flex',
  alignitems: 'center',
  justifyContent: 'center',
  paddingTop: '120px'
}));

const AnonIdLogo = styled('img')(({ theme }) => ({
  height: 'auto',
  objectFit: 'cover',
  width: '450px',
  [theme.breakpoints.down(640)]: {
    width: '320px'
  }
}));
