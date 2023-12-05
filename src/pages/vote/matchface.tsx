import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import { AnonIDPng, ManJpg } from 'src/config/images';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { PRIVATE_ROUTES } from 'src/config/routes';
import { Loader } from 'src/components/AnonLoader';
import { Check, Close } from '@mui/icons-material';
import { useStore } from 'src/context/StoreContext';
import { toast } from 'react-toastify';

export const MatchFace = () => {
  const { user: username } = useStore();
  const [oldImg, setOldImg] = useState('');
  const [newImg, setNewImg] = useState('');
  const [data, setData] = useState([]);
  const [voteUser, setVoteUser] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [isLoader, setLoader] = useState(false);
  const navigate = useNavigate();

  const getMatchFaceImages = async () => {
    if (username == null) return;
    try {
      const res = await axios.post(`${PRIVATE_ROUTES.server}/vote/getRecoveryData`, { username: username });
      const data = res.data;
      setData(data);
      if (data.length > 0) {
        console.log({ data });
        setOldImg(data[0].ipfsHash);
        setNewImg(data[0].recover.ipfsHash);
        setVoteUser(data[0].username);
      }
      setLoading(false);
    } catch (err: any) {
      console.log('getMatchFaceImage Error: ', err);
      const error = err?.response?.data;
      if (error) {
        toast.error(error.message);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    getMatchFaceImages();
  }, []);

  const setMatchImages = (voted: boolean) => {
    try {
      setLoader(true);
      const data = { username: voteUser, votedUsername: username, isVoted: voted };
      axios.post(`${PRIVATE_ROUTES.server}/vote/setRecoveryData`, data).then((response) => {
        const res = response.data;
        if (typeof res.result === 'number') {
          navigate(`/dashboard`);
        }
      });
    } catch (err: any) {
      setLoader(false);
      console.log('Set Match Image error: ', err);
      const error = err?.response?.data;
      if (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <MatchFaceWrapper>
      {isLoading ? (
        <Loader />
      ) : oldImg === '' || newImg === '' ? (
        <NoData>No Match Image Data</NoData>
      ) : (
        <MatchFaceContainer>
          <AnonIDLogoContainer>
            <AnonIdLogo src={AnonIDPng} alt="anon-id" />
          </AnonIDLogoContainer>
          <MatchFaceItemContainer>
            <MatchFaceItem>
              <MatchFaceItemTitle>Old one</MatchFaceItemTitle>
              <MatchFaceImg src={`https://cloudflare-ipfs.com/ipfs/${oldImg}`} alt="match-image" />
            </MatchFaceItem>
            <MatchFaceItem>
              <MatchFaceItemTitle>New one</MatchFaceItemTitle>
              <MatchFaceImg src={`https://cloudflare-ipfs.com/ipfs/${newImg}`} alt="match-image" />
            </MatchFaceItem>
          </MatchFaceItemContainer>
        </MatchFaceContainer>
      )}
      <MatchButtonContainer>
        <MatchButton
          name="Unvote"
          disabled={oldImg === '' || isLoader}
          onClick={() => setMatchImages(false)}
          variant="contained"
          startIcon={<Close />}
        >
          {isLoader && <CircularProgress size={24} sx={{ color: '#FFFFFF' }} />}
          Unvote
        </MatchButton>
        <MatchButton
          name="Vote"
          disabled={oldImg === '' || isLoader}
          onClick={() => setMatchImages(true)}
          variant="contained"
          startIcon={<Check />}
        >
          {isLoader && <CircularProgress size={24} sx={{ color: '#FFFFFF' }} />}
          Vote
        </MatchButton>
      </MatchButtonContainer>
      {data.length === 0 && (
        <Button color="info" name="Return Home" onClick={() => navigate('/dashboard')} variant="contained">
          Return Home
        </Button>
      )}
    </MatchFaceWrapper>
  );
};

const MatchFaceWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  alignItems: 'center'
}));

const MatchFaceContainer = styled(Box)(({ theme }) => ({
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
  height: '25vh',
  objectFit: 'cover',
  width: 'auto'
}));

const MatchFaceItemContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '100px'
}));

const MatchFaceItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  alignItems: 'center'
}));

const MatchFaceItemTitle = styled(Box)(({ theme }) => ({
  fontSize: '24px',
  color: '#fff'
}));

interface MatchFaceImgProps {
  src: string;
  alt: string;
}

const MatchFaceImg = (props: MatchFaceImgProps) => {
  const { src, alt } = props;
  const [isLoad, setLoad] = useState(false);
  return (
    <>
      <MatchFaceImgContainer
        src={src}
        sx={{ display: !isLoad ? 'none' : 'block' }}
        alt={alt}
        onLoad={() => setLoad(true)}
      />
      {!isLoad && <MatchFaceImgContainer src={ManJpg} alt={'default-img'} />}
    </>
  );
};

const MatchFaceImgContainer = styled('img')(({ theme }) => ({
  width: '250px',
  height: '250px',
  borderRadius: '50%'
}));

const NoData = styled(Box)(({ theme }) => ({
  fontSize: '32px',
  color: '#fff'
}));

const MatchButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '40px',
  paddingTop: '50px'
}));

const MatchButton = styled(Button)(({ theme, disabled, name }) => ({
  backgroundColor: name === 'Vote' ? '#1A50B2' : '#C62828',
  opacity: disabled === true ? '0.7' : '1',
  textTransform: 'none',
  color: '#FFF',
  fontSize: '18px',
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  '&.Mui-disabled': {
    backgroundColor: name === 'Vote' ? '#1A50B2' : '#C62828',
    color: '#FFF'
  },
  '&:hover': {
    backgroundColor: name === 'Vote' ? '#1A50B2' : '#C62828'
  }
}));
