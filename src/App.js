<<<<<<< HEAD
import "./App.css";
import Layout from "./components/layout/Layout";
import Router from "./Router";
import React from 'react';
import { UserInfoProvider } from "./contexts/UserInfoContext";
import { ReviewProvider } from "./contexts/ReviewInfoContext";
=======
import './App.css';
import Layout from './components/layout/Layout';
import Router from './Router';
import { UserInfoProvider } from './contexts/UserInfoContext';
>>>>>>> eb70e5d2652d150105aa5b6d898226fb96c4a45c

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
