import { Box, Button, Popover } from '@mui/material';
import { styled } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnonIDPng } from 'src/config/images';

export const Home = () => {
  const [username, setUsername] = useState('');
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [error, setError] = useState({
    isError: false,
    msg: ''
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleButtonClick = () => {
    if (username !== '') {
      navigate(`/verify/${username}`);
    } else {
      setError({
        isError: true,
        msg: 'Username is required'
      });
    }
  };

  useEffect(() => {
    if (username !== '') {
      setError({
        isError: false,
        msg: ''
      });
    }
  }, [username]);

  const isOpen = Boolean(anchorEl);
  const id = isOpen ? 'simple-popover' : undefined;
  return (
    <HomeWrapper>
      <HomeContainer>
        <AnonIDLogoContainer>
          <AnonIdLogo src={AnonIDPng} alt="anon-id" />
        </AnonIDLogoContainer>
        <SubTitle>Anonymous Identity Authentication</SubTitle>
        <HomeTextContainer>
          <HomeText>Create/Input your Username (Secret Identity)</HomeText>
          <HomeSubText aria-describedby={id} onClick={handleClick}>
            What is this?
          </HomeSubText>
          <ExplainPopover
            id={id}
            open={isOpen}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          >
            Your Secret Identity (SID) Serves as your username, but do not share it with anyone. This is how you ID
            yourself to log in but dont worry if you forget it, we can easily recover your account!
          </ExplainPopover>
        </HomeTextContainer>
        <HomeActionContainer>
          <InputField value={username} onChange={(e) => setUsername(e.currentTarget.value)} />
          <LoginButton onClick={handleButtonClick}>Log In/Register</LoginButton>
          {error.isError && <ErrorText>{error.msg}</ErrorText>}
        </HomeActionContainer>
      </HomeContainer>
    </HomeWrapper>
  );
};

const HomeWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  alignItems: 'center'
}));

const HomeContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
  maxWidth: '540px',
  [theme.breakpoints.down(640)]: {
    maxWidth: '420px'
  },
  [theme.breakpoints.down(480)]: {
    maxWidth: '350px'
  }
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
    width: '540px',
    paddingTop: '50px'
  },
  [theme.breakpoints.down(390)]: {
    width: '450px',
    paddingTop: '100px'
  }
}));

const SubTitle = styled('p')(({ theme }) => ({
  fontSize: '24px',
  fontWeight: '600',
  color: '#fff',
  [theme.breakpoints.down(640)]: {
    fontSize: '20px'
  },
  [theme.breakpoints.down(540)]: {
    fontSize: '18px'
  }
}));

const HomeTextContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  flexDirection: 'column'
}));

const HomeText = styled('p')(({ theme }) => ({
  fontSize: '24px',
  color: '#fff',
  paddingTop: '40px',
  [theme.breakpoints.down(640)]: {
    fontSize: '20px'
  },
  [theme.breakpoints.down(540)]: {
    fontSize: '16px'
  }
}));

const HomeSubText = styled(Box)(({ theme }) => ({
  fontSize: '16px',
  color: '#fff',
  textDecoration: 'underline',
  cursor: 'pointer'
}));

const HomeActionContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  width: '100%',
  paddingTop: '10px',
  alignItems: 'center'
}));

const InputField = styled('input')(({ theme }) => ({
  borderRadius: '4px',
  height: '54px',
  width: '100%',
  border: 'none',
  outline: 'none',
  fontSize: '24px',
  padding: '0 20px'
}));

const LoginButton = styled(Button)(({ theme }) => ({
  borderRadius: '4px',
  backgroundColor: '#4532CE',
  color: '#fff',
  fontWeight: '600',
  textTransform: 'none',
  fontSize: '24px',
  height: '48px',
  width: '100%',
  '&:hover': {
    backgroundColor: '#4532CE'
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

const ErrorText = styled(Box)(({ theme }) => ({
  fontSize: '24px',
  color: 'red'
}));
