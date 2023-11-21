import { Check } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import { AnonIDPng } from 'src/config/images';

export const Authenticated = () => {
  return (
    <AuthenticatedWrapper>
      <AuthenticatedContainer>
        <AuthenticatedNotify>
          <AnonIdImg src={AnonIDPng} alt="anon-id-img" />
          <AuthenticatedNotifyText>Registered Welcome to Anon ID</AuthenticatedNotifyText>
          <AuthenticatedIconContainer>
            <Check sx={{ fontSize: '128px', fontWeight: '700' }} />
          </AuthenticatedIconContainer>
        </AuthenticatedNotify>
        <AuthenticatedAction>
          <ActionButton bgColor="#4532CE">Proceed to Home</ActionButton>
          <ActionButton bgColor="#FFCD29">
            <span style={{ color: '#000' }}>Click Here to Set Up Multi Face Recovery</span>
          </ActionButton>
        </AuthenticatedAction>
      </AuthenticatedContainer>
    </AuthenticatedWrapper>
  );
};

const AuthenticatedWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  alignItems: 'center'
}));

const AuthenticatedContainer = styled(Box)(({ theme }) => ({
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

const AuthenticatedNotify = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '40px'
}));

const AnonIdImg = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto'
}));

const AuthenticatedNotifyText = styled(Box)(({ theme }) => ({
  fontSize: '24px',
  fontWeight: '600',
  color: '#FFF',
  [theme.breakpoints.down(480)]: {
    fontSize: '22px'
  }
}));

const AuthenticatedIconContainer = styled(Box)(({ theme }) => ({
  width: '180px',
  height: '180px',
  backgroundColor: '#4ECB71',
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '30px'
}));

const ActionButton = styled(Button)<{ bgColor: string }>(({ theme, bgColor }) => ({
  borderRadius: '4px',
  color: '#FFF',
  width: '100%',
  backgroundColor: bgColor,
  fontSize: '16px',
  textTransform: 'none',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '36px',
  fontWeight: '600',
  '&:hover': {
    backgroundColor: bgColor
  },
  [theme.breakpoints.down(480)]: {
    fontSize: '14px'
  }
}));

const AuthenticatedAction = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  alignItems: 'center',
  width: '100%',
  paddingTop: '30px'
}));
