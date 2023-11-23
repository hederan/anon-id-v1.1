import { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { AppThemeProvider } from './Provider';
import { Layout } from './layouts/layout';
import { Routers } from './router';

function App() {
  return (
    <Suspense fallback={<>Loading</>}>
      <Router>
        <AppThemeProvider>
          <Layout>
            <Routers />
          </Layout>
        </AppThemeProvider>
      </Router>
    </Suspense>
  );
}

export default App;
