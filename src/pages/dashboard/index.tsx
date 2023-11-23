import { Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import { AnonIDPng } from 'src/config/images';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <DashboardWrapper>
      <DashboardContainer>
        <DashboardBanner>
          <DashboardTitle>
            Welcome: <span>"Secret Identity"</span>
          </DashboardTitle>
          <DashboadBannerImg src={AnonIDPng} alt="dashboard-banner-img" />
        </DashboardBanner>
        <DashboardAction>
          <ActionButton bgcolor="#4532CE">Click here to “Sign in With Anon ID” ONLINE</ActionButton>
          <ActionButton bgcolor="#4532CE">
            Click here to SCANQR CODE/TAP NFC to use ANON ID in PERSON (Coming soon)
          </ActionButton>
          <ActionButton bgcolor="#4532CE">
            Click here to Verify OTHER USER FACES are LIVE HUMANS and Earn Rewards (Alpha Stage)
          </ActionButton>
          <ActionButton bgcolor="#60B1E2">
            Conditional: If Images are available RECOVERY MATCHES (New Face MAtch) AVAILABLE EARN DOUBLE POINTS (maybe
            green if available red if not?)
          </ActionButton>
          <ActionButton bgcolor="#4532CE" onClick={() => navigate('/profile')}>
            Click Here to See Points/Level/Rewards (Coming Soon)
          </ActionButton>
          <ActionButton bgcolor="#7F00FF">
            FUTURE FEATURE: Sign in while matching faces for a more secure authentication that yields rewards!
          </ActionButton>
          <ActionButton bgcolor="#7F00FF">
            Delete Account and Images (username can be claimed by someone else)
          </ActionButton>
        </DashboardAction>
      </DashboardContainer>
    </DashboardWrapper>
  );
};

const DashboardWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  alignItems: 'center'
}));

const DashboardContainer = styled(Box)(({ theme }) => ({
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

const DashboardBanner = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  flexDirection: 'column'
}));

const DashboardTitle = styled(Box)(({ theme }) => ({
  fontSize: '40px',
  fontWeight: '600',
  color: '#FFF',
  span: {
    fontStyle: 'italic'
  },
  [theme.breakpoints.down(640)]: {
    fontSize: '32px'
  },
  [theme.breakpoints.down(480)]: {
    fontSize: '26px'
  }
}));

const DashboadBannerImg = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto'
}));

const DashboardAction = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  paddingBottom: '50px'
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
