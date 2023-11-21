import { Suspense } from 'react';
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';

import { PUBLIC_ROUTES } from './config/routes';

import { AppThemeProvider } from './Provider';
import { Layout } from './layouts/layout';
import { Verify } from './pages/verify';
import { Home } from './pages/home';
import { Dashboard } from './pages/dashboard';
import { Profile } from './pages/dashboard/profile';
import { Authenticated } from './pages/authenticated';
import { MFR } from './pages/MFR';

function App() {
  return (
    <Suspense fallback={<>Loading</>}>
      <Router>
        <AppThemeProvider>
          <Layout>
            <Routes>
              <Route path={PUBLIC_ROUTES.home} element={<Home />} />
              <Route path={PUBLIC_ROUTES.verify} element={<Verify />} />
              <Route path={PUBLIC_ROUTES.dashboard} element={<Dashboard />} />
              <Route path={PUBLIC_ROUTES.profile} element={<Profile />} />
              <Route path={PUBLIC_ROUTES.authenticated} element={<Authenticated />} />
              <Route path={PUBLIC_ROUTES.mfr} element={<MFR />} />
            </Routes>
          </Layout>
        </AppThemeProvider>
      </Router>
    </Suspense>
  );
}

export default App;
