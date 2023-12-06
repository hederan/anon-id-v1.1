import { Box, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';

export const Loader = (props: { size?: number }) => {
  const { size } = props;
  return (
    <LoaderContainer>
      <CircularProgress size={size ?? 180} sx={{ color: '#3772FF' }} />
    </LoaderContainer>
  );
};

const LoaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '40px'
}));

const LoaderTextContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  fontSize: '14px',
  color: '#000',
  p: {
    padding: '0px',
    margin: '0px'
  }
}));
