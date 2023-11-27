import { useEffect, useState } from 'react';
import { Verify } from '../pages/verify';
import { Home } from '../pages';
import { Dashboard } from '../pages/dashboard';
import { Profile } from '../pages/dashboard/profile';
import { Authenticated } from '../pages/authenticated';
import { MFR } from '../pages/MFR';
import { verifyToken } from '../api/auth';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { PUBLIC_ROUTES } from 'src/config/routes';
import { useStore } from 'src/context/StoreContext';
import { LiveHuman } from 'src/pages/livehuman';

export const Routers = () => {
  const { isLoggedIn, setLoggedIn } = useStore();
  const navigate = useNavigate();
  useEffect(() => {
    const isLogged = verifyToken();
    setLoggedIn(isLogged);
    if (!isLogged) {
      navigate('/');
      setLoggedIn(false);
    }
  }, []);
  return (
    <Routes>
      {!isLoggedIn ? (
        <>
          <Route path={PUBLIC_ROUTES.home} element={<Home />} />
          <Route path={PUBLIC_ROUTES.verify} element={<Verify />} />
          <Route path={'*'} element={<Home />} />
        </>
      ) : (
        <>
          <Route path={PUBLIC_ROUTES.dashboard} element={<Dashboard />} />
          <Route path={PUBLIC_ROUTES.profile} element={<Profile />} />
          <Route path={PUBLIC_ROUTES.authenticated} element={<Authenticated />} />
          <Route path={PUBLIC_ROUTES.mfr} element={<MFR />} />
          <Route path={'*'} element={<Dashboard />} />
          <Route path={PUBLIC_ROUTES.liveHuman} element={<LiveHuman />} />
        </>
      )}
    </Routes>
  );
};
