import { Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { AnonIDPng } from 'src/config/images';
import { useStore } from 'src/context/StoreContext';

export const Profile = () => {
  const navigate = useNavigate();
  const { user } = useStore();
  return (
    <ProfileWrapper>
      <ProfileContainer>
        <ProfileBanner>
          <ProfileReward>
            <ProfileRewardText sx={{ fontWeight: '600', fontStyle: 'italic' }}>{user}</ProfileRewardText>
            <ProfileRewardText>Level:</ProfileRewardText>
            <ProfileRewardText>Points:</ProfileRewardText>
            <ProfileRewardText>Rank:</ProfileRewardText>
          </ProfileReward>
          <ProfileBannerImgContainer>
            <ProfileBannerImg src={AnonIDPng} alt="profile-banner-img" />
            <BackButton onClick={() => navigate('/dashboard')}>Back to Home</BackButton>
          </ProfileBannerImgContainer>
        </ProfileBanner>
        <ProfileAction>
          <ActionButton bgcolor="#4532CE">Exchange Points for Prizes (Coming Soon)</ActionButton>
          <ActionButton bgcolor="#4532CE">Exchange Points for Discounts with Partners (Coming Soon)</ActionButton>
          <ActionButton bgcolor="#4532CE">What do Levels do? (Coming Soon)</ActionButton>
          <ActionButton bgcolor="#7F00FF">LeaderBoard</ActionButton>
          <ActionButton bgcolor="#7F00FF">Sell Your Points!</ActionButton>
        </ProfileAction>
      </ProfileContainer>
    </ProfileWrapper>
  );
};

const ProfileWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  alignItems: 'center'
}));

const ProfileContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '100px',
  maxWidth: '540px',
  paddingTop: '50px',
  [theme.breakpoints.down(640)]: {
    maxWidth: '420px'
  },
  [theme.breakpoints.down(480)]: {
    maxWidth: '350px'
  }
}));

const ProfileBanner = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center'
}));

const ProfileReward = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column'
}));

const ProfileRewardText = styled(Box)(({ theme }) => ({
  fontSize: '32px',
  textWrap: 'nowrap'
}));

const ProfileBannerImgContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px'
}));

const ProfileBannerImg = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto'
}));

const BackButton = styled(Button)(({ theme }) => ({
  borderRadius: '4px',
  color: '#FFF',
  backgroundColor: '#4532CE',
  fontSize: '16px',
  textTransform: 'none',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '32px',
  width: '100%',
  '&:hover': {
    backgroundColor: '#4532CE'
  },
  [theme.breakpoints.down(480)]: {
    fontSize: '14px'
  }
}));

const ProfileAction = styled(Box)(({ theme }) => ({
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
