import { useEffect, useState } from 'react';
import { Box, Button, Popover } from '@mui/material';
import { styled } from '@mui/system';
import { AnonIDPng } from 'src/config/images';
import { useNavigate } from 'react-router-dom';
import { useStore } from 'src/context/StoreContext';
import { PRIVATE_ROUTES } from 'src/config/routes';
import axios from 'axios';
import { toast } from 'react-toastify';
import { localStorageGet } from 'src/utils/localStorage';
import { verifyToken } from 'src/api/auth';
import { clientName } from 'src/config/config';
import { VerifiedUser } from '@mui/icons-material';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useStore();
  const [isLimitVote, setLimitVote] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [liveHumanScore, setLiveHumanScore] = useState(0);

  const getUserData = async () => {
    axios
      .post(`${PRIVATE_ROUTES.server}/user/userData`, { username: user })
      .then((res) => {
        const data = res.data.data;
        console.log({ res });
        if (data && data.isHuman === false) {
          toast.error('Your face image is too bad. Please try to upload again');
          setLimitVote(true);
          setLiveHumanScore(data.liveHuman.score);
        }
      })
      .catch((err: any) => {
        console.log('getUserData Error: ', err);
        const error = err?.response?.data;
        if (error) {
          toast.error(error.message);
        }
      });
  };

  useEffect(() => {
    getUserData();
  }, []);

  const returnBackToClient = () => {
    const clientUri = localStorageGet('redirectUri') as string;
    if (clientUri == null || clientUri === '') {
      toast.error("Can't find client uri");
      return;
    }
    const token = localStorageGet('token') as string;
    const isValidToken = verifyToken();
    if (isValidToken) {
      window.location.href = `${clientUri}/${token}`;
    }
  };

  const isOpen = Boolean(anchorEl);
  const id = isOpen ? 'simple-popover' : undefined;

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <DashboardWrapper>
      <DashboardContainer>
        <DashboardBanner>
          <DashboardTitle>
            Welcome: <p>{user}</p>
          </DashboardTitle>
          <DashboadBannerImg src={AnonIDPng} alt="dashboard-banner-img" />
          {liveHumanScore >= 4 && (
            <>
              <VerifiedUserContainer onClick={handleClick}>
                <VerifiedUser sx={{ width: '100%', height: '100%', color: '#23A55A' }} />
              </VerifiedUserContainer>
              <ExplainPopover
                id={id}
                open={isOpen}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              >
                Congratulations you have been fully verified by Anon ID network! Your pictures have been deleted from
                any human view!
              </ExplainPopover>
            </>
          )}
        </DashboardBanner>
        <DashboardAction>
          {isLimitVote && (
            <ActionButton bgcolor="#4532CE" onClick={() => navigate('/re-register')}>
              Re-Register Your Face
            </ActionButton>
          )}
          <ActionButton bgcolor="#4532CE" onClick={returnBackToClient}>
            Click here to sign into “{clientName}”
          </ActionButton>
          {/* <ActionButton bgcolor="#4532CE" disabled={isLimitVote}>
            Click here to SCANQR CODE/TAP NFC to use ANON ID in PERSON (Coming soon)
          </ActionButton> */}
          <ActionButton bgcolor="#4532CE" disabled={isLimitVote} onClick={() => navigate('/live-human')}>
            Click here to Earn Rewards by choosing Live faces (Alpha Stage)
          </ActionButton>
          <ActionButton bgcolor="#60B1E2" disabled={isLimitVote} onClick={() => navigate(`/match`)}>
            Click here to earn double rewards by confirming account recovery pictures match.
          </ActionButton>
          <ActionButton bgcolor="#4532CE" onClick={() => navigate('/profile')}>
            Click Here to See Points/Level/Rewards (Coming Soon)
          </ActionButton>
          {/* <ActionButton bgcolor="#7F00FF" disabled={isLimitVote}>
            FUTURE FEATURE: Sign in while matching faces for a more secure authentication that yields rewards!
          </ActionButton> */}
          {/* <ActionButton bgcolor="#7F00FF">
            Delete Account and Images (username can be claimed by someone else)
          </ActionButton> */}
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

const DashboardAction = styled(Box)(({ theme }) => ({
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

const VerifiedUserContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '100px',
  height: '100px',
  right: '0',
  top: '100px',
  [theme.breakpoints.down(640)]: {
    width: '50px',
    height: '50px'
  }
}));

const ExplainPopover = styled(Popover)(({ theme }) => ({
  '& .MuiPopover-paper': {
    backgroundColor: '#80CAFF',
    color: '#000',
    width: '320px',
    padding: '16px'
  }
}));
