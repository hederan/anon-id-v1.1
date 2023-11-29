import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';

import { Header } from './header';
import { Footer } from './footer';
import { Container } from 'src/components/Container';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#00068d' }}>
      <Header />
      <Container>
        {children}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          theme="light"
        />
      </Container>
      <Footer />
    </div>
  );
};
