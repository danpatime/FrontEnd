import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AlbaSearchPage from './pages/AlbaSearchPage';
import AlbaReviewPage from './pages/AlbaReviewPage';
import MyPage from './pages/MyPage/MyPage';
import ResumePage from './pages/ResumePage';
import MyStatusPage from './pages/MyPage/MyStatusPage';
import SupportPage from './pages/SupportPage';
import ChattingPage from './pages/ChattingPage';
import MyResume from './pages/MyResume/MyResume';
import SignUpPage from './pages/SignUpPage';
import ContactDetailPage from './pages/MyPage/ContactDetailPage';
import React from 'react';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/alba/search" element={<AlbaSearchPage />} />
      <Route path="/alba/resume/:id" element={<ResumePage />} />
      <Route path="/support" element={<SupportPage/>}/>
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/chat" element={<ChattingPage />} />
      <Route path="/mypage/resume" element={<MyResume />} />
      <Route path="/mypage/contracts" element={<MyStatusPage />} />
      <Route path="/contracts/:id" element={<ContactDetailPage />} />
    </Routes>
  );
};

export default AppRouter;
