import './App.css';
import Layout from './components/layout/Layout';
import Router from './Router';
import React from 'react';
import { UserInfoProvider } from './contexts/UserInfoContext.tsx';
import { ReviewProvider } from './contexts/ReviewInfoContext';

function App() {
  return (
    <UserInfoProvider>
      <ReviewProvider>
        <Layout>
          <Router />
        </Layout>
      </ReviewProvider>
    </UserInfoProvider>
  );
}

export default App;
