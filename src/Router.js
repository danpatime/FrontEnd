import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AlbaSearchPage from "./pages/AlbaSearchPage";
import AlbaReviewPage from "./pages/AlbaReviewPage";
import MyPage from "./pages/MyPage/MyPage";
import ResumePage from "./pages/ResumePage";
import ChattingPage from "./pages/ChattingPage";
import React from 'react';
import MyStatusPage from './pages/MyPage/MyStatusPage';
import MyResume from './pages/MyResume/MyResume';
import SignUpPage from './pages/SignUpPage';
import SupportPage from "./pages/SupportPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/alba/search" element={<AlbaSearchPage />} />
      <Route path="/alba/review" element={<AlbaReviewPage/>}/>
      <Route path="/alba/resume/:id" element={<ResumePage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/support" element={<SupportPage />} />
      <Route path="/chat" element={<ChattingPage />} />
      <Route path="/mypage/resume" element={<MyResume />} />
      <Route path="/mypage/status" element={<MyStatusPage />} />
    </Routes>
  );
};

export default AppRouter;
