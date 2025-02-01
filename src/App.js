import "./App.css";
import Layout from "./components/layout/Layout";
import Router from "./Router";
import React from 'react';
import { UserInfoProvider } from "./contexts/UserInfoContext";
import { ReviewProvider } from "./contexts/ReviewInfoContext";

function App() {
  return (
    <UserInfoProvider>
      <Layout>
        <Router />
      </Layout>
    </UserInfoProvider>
  );
}

export default App;
