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
import MyReviewPage from "./pages/MyPage/MyReviewPage";
import SupportPage from './pages/Support/SupportPage';
import ContactDetailPage from './pages/MyPage/ContactDetailPage';
import Settings from './pages/MyPage/Settings';
import SupportPage from './pages/Support/SupportPage';
import ResumeForm from './pages/MyResume/ResumeForm';
import SavedWorkers from './pages/MyPage/SavedWorkers';
import MyStorePage from './pages/MyPage/MyStorePage';
import AlbaReviewPage from './pages/AlbaReviewPage';
import MyStorePage from './pages/MyPage/MyStore/MyStorePage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/alba/search" element={<AlbaSearchPage />} />
      <Route path="/alba/review" element={<AlbaReviewPage />} />
      <Route path="/alba/resume/:id" element={<ResumePage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/support" element={<SupportPage />} />
      <Route path="/chat" element={<ChattingPage />} />
      <Route path="/mypage/resume" element={<MyResume />} />
      <Route path="/mypage/status" element={<MyStatusPage />} />
      <Route path="/manage-reviews" element={<MyReviewPage />} />
      <Route path="/mypage/resume-form" element={<ResumeForm />} />
      <Route path="/mypage/mystore" element={<MyStorePage />} />
      <Route path="/mypage/contracts" element={<MyStatusPage />} />
      <Route path="/contracts/:id" element={<ContactDetailPage />} />
      <Route path="/mypage/settings" element={<Settings />} />
      <Route path="/mypage/saved-workers" element={<SavedWorkers />} />
      <Route path="/support" element={<SupportPage />} />
      <Route path="/mypage/mystore" element={<MyStorePage />} />
    </Routes>
  );
};

export default AppRouter;
