import { useEffect, useState } from 'react';
import { Verify } from '../pages/verify';
import { Home } from '../pages';
import { Dashboard } from '../pages/dashboard';
import { Profile } from '../pages/dashboard/profile';
import { Authenticated } from '../pages/authenticated';
import { MFR } from '../pages/MFR';
import { verifyToken } from '../api/auth';
import { Route, Routes } from 'react-router-dom';
import { PUBLIC_ROUTES } from 'src/config/routes';
import { useStore } from 'src/context/StoreContext';
import { LiveHuman } from 'src/pages/vote/livehuman';
import { RecoverFace } from 'src/pages/verify/recover';
import { MatchFace } from 'src/pages/vote/matchface';
import { Authorize } from 'src/pages/verify/authorize';

export const Routers = () => {
  const { isLoggedIn, setLoggedIn } = useStore();
  useEffect(() => {
    const isLogged = verifyToken();
    setLoggedIn(isLogged);
  }, []);
  return (
    <Routes>
      {!isLoggedIn ? (
        <>
          <Route path={PUBLIC_ROUTES.home} element={<Home />} />
          <Route path={PUBLIC_ROUTES.verify} element={<Verify />} />
          <Route path={PUBLIC_ROUTES.recovery} element={<RecoverFace />} />
          <Route path={PUBLIC_ROUTES.authorize} element={<Authorize />} />
          <Route path={'*'} element={<Home />} />
        </>
      ) : (
        <>
          <Route path={PUBLIC_ROUTES.dashboard} element={<Dashboard />} />
          <Route path={PUBLIC_ROUTES.profile} element={<Profile />} />
          <Route path={PUBLIC_ROUTES.authenticated} element={<Authenticated />} />
          <Route path={PUBLIC_ROUTES.mfr} element={<MFR />} />
          <Route path={PUBLIC_ROUTES.liveHuman} element={<LiveHuman />} />
          <Route path={PUBLIC_ROUTES.match} element={<MatchFace />} />
          <Route path={'*'} element={<Dashboard />} />
        </>
      )}
    </Routes>
  );
};
