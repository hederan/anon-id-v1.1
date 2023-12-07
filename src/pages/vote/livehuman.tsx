import { useState, useEffect } from 'react';
import { Check } from '@mui/icons-material';
import { Box, Button, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { AnonIDPng, ImgLoadPng } from 'src/config/images';
import { useStore } from 'src/context/StoreContext';
import { Loader } from 'src/components/AnonLoader';
import axios from 'axios';
import { PRIVATE_ROUTES } from 'src/config/routes';
import { toast } from 'react-toastify';

interface voteDataTypes {
  imageUrl: string;
  voted: boolean;
}

export const LiveHuman = () => {
  const { user } = useStore();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [isImageLoading, setImageLoading] = useState(false);
  const [voteData, setVoteData] = useState<voteDataTypes[]>([]);
  const [loadedImgCount, setLoadedImgCount] = useState(0);

  const handleImageLoad = () => {
    setLoadedImgCount((prevCount) => prevCount + 1);
  };

  const getImageUrl = async () => {
    console.log({ VotingPage: user });
    if (user !== '') {
      setImageLoading(true);
      axios
        .post(`${PRIVATE_ROUTES.server}/vote/getHuman`, { username: user })
        .then((res) => {
          const data = res.data;
          const ipfsHashs = [];
          for (let i = 0; i < data.length; i++) {
            ipfsHashs.push(data[i].ipfsHash);
          }
          console.log('Images: ', ipfsHashs);
          setImageUrls(ipfsHashs as string[]);
          setImageLoading(false);
        })
        .catch((err: any) => {
          console.log('get Image Error: ', err);
          const error = err?.response?.data;
          if (error) {
            toast.error(error.message);
          }
          setImageLoading(false);
        });
    }
  };

  const handleImageClick = (imageUrl: string) => {
    const index = voteData.findIndex((data) => data.imageUrl === imageUrl);

    if (index >= 0) {
      const updatedVoteData = [...voteData];
      updatedVoteData.splice(index, 1);
      setVoteData(updatedVoteData);
    } else {
      setVoteData([...voteData, { imageUrl: imageUrl, voted: true }]);
    }
  };

  const handleVotingClick = () => {
    const updateVoteData = imageUrls.map((imageUrl) => ({
      ipfsHash: imageUrl,
      voted: voteData.some((data) => data.imageUrl === imageUrl && data.voted)
    }));
    setLoading(true);
    console.log({ updateVoteData });
    try {
      axios
        .post(`${PRIVATE_ROUTES.server}/vote/setLiveHuman`, { username: user, voteData: updateVoteData })
        .then((response) => {
          setLoading(false);
          navigate('/dashboard');
        });
    } catch (err: any) {
      setLoading(false);
      console.log('Voting Error: ', err);
      const error = err?.response?.data;
      if (error) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    getImageUrl();
  }, []);

  return (
    <LiveHumanWrapper>
      <LiveHumanContainer>
        <AnonIDLogoContainer>
          <AnonIdLogo src={AnonIDPng} alt="anon-id" />
        </AnonIDLogoContainer>
        <LiveHumanItemContainer>
          {isImageLoading ? (
            <Loader />
          ) : imageUrls.length === 0 ? (
            <p>No Live Human Images</p>
          ) : (
            <LiveHumanItems>
              {imageUrls.map((imageUrl: string) => (
                <VotingImage
                  key={imageUrl}
                  imageUrl={imageUrl}
                  isSelected={voteData.findIndex((data) => data.imageUrl === imageUrl) >= 0}
                  onClick={() => handleImageClick(imageUrl)}
                  onLoad={handleImageLoad}
                />
              ))}
            </LiveHumanItems>
          )}
        </LiveHumanItemContainer>
        <LiveHumanAction>
          <LiveHumanButton sx={{ backgroundColor: '' }} onClick={() => navigate('/dashboard')}>
            Return Home
          </LiveHumanButton>
          <LiveHumanButton onClick={handleVotingClick} disabled={isLoading || loadedImgCount !== imageUrls.length}>
            {isLoading && <CircularProgress size={24} sx={{ color: '#FFFFFF' }} />}
            Finish Voting
          </LiveHumanButton>
        </LiveHumanAction>
      </LiveHumanContainer>
    </LiveHumanWrapper>
  );
};

const LiveHumanWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  alignItems: 'center'
}));

const LiveHumanContainer = styled(Box)(({ theme }) => ({
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

const LiveHumanItemContainer = styled(Box)(({ theme }) => ({
  fontSize: '25px'
}));

const LiveHumanItems = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '30px',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down(960)]: {
    gridTemplateColumns: 'repeat(2, 1fr)'
  },
  [theme.breakpoints.down(480)]: {
    gap: '20px'
  }
}));

interface VotingImageProps {
  imageUrl: string;
  isSelected: boolean;
  onClick: () => void;
  onLoad: () => void;
}

const VotingImage = (props: VotingImageProps) => {
  const { imageUrl, isSelected, onClick, onLoad } = props;
  const [isLoad, setLoad] = useState(false);
  useEffect(() => {
    console.log('VotingImage');
    if (isLoad) {
      onLoad();
    }
  }, [isLoad]);
  return (
    <>
      <VotingImageContainer selected={isSelected && isLoad ? 1 : 0} onClick={isLoad ? onClick : undefined}>
        {!isLoad && <VoteImage src={ImgLoadPng} alt="default-image" />}
        <VoteImage
          sx={{ display: isLoad ? 'block' : 'none' }}
          src={`https://gateway.pinata.cloud/ipfs/${imageUrl}`}
          onLoad={() => setLoad(true)}
          alt="face-image"
        />
        {isSelected && (
          <CheckContainer>
            <Check sx={{ color: '#219653', fontSize: 80 }} />
          </CheckContainer>
        )}
      </VotingImageContainer>
    </>
  );
};

const VotingImageContainer = styled(Box)<{ selected: number }>(({ theme, selected }) => ({
  width: '250px',
  height: '250px',
  borderRadius: '50%',
  backgroundColor: '#ddd',
  cursor: 'pointer',
  border: `8px solid ${selected === 1 ? '#219653' : '#ddd'}`,
  position: 'relative',
  [theme.breakpoints.down(768)]: {
    width: '200px',
    height: '200px'
  },
  [theme.breakpoints.down(480)]: {
    width: '160px',
    height: '160px'
  }
}));

const VoteImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  objectFit: 'cover'
}));

const CheckContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const LiveHumanAction = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  padding: '50px 0',
  [theme.breakpoints.down(768)]: {
    flexDirection: 'column-reverse'
  }
}));

const LiveHumanButton = styled(Button)(({ theme, disabled }) => ({
  backgroundColor: '#3772FF',
  textTransform: 'none',
  borderRadius: '4px',
  color: '#FFF !important',
  width: '320px',
  opacity: disabled ? 0.7 : 1,
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  '&:hover': {
    backgroundColor: '#3772FF'
  }
}));
