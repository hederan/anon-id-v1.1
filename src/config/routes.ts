export const PUBLIC_ROUTES = {
  default: '/',
  home: '/',
  verify: '/verify/:username',
  dashboard: '/dashboard',
  profile: '/profile',
  authenticated: '/authenticated',
  mfr: '/mfr',
  error404: '/error404'
};

export const PRIVATE_ROUTES = {
  // server: 'http://192.168.131.165:5000'
  server: 'https://anon-id-v1-1-backend.vercel.app'
};
