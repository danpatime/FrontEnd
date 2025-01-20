<<<<<<< HEAD
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AlbaSearchPage from "./pages/AlbaSearchPage";
import AlbaReviewPage from "./pages/AlbaReviewPage";
import MyPage from "./pages/MyPage/MyPage";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import ResumePage from "./pages/ResumePage";
import ChattingPage from "./pages/ChattingPage";
import React from 'react';
=======
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AlbaSearchPage from './pages/AlbaSearchPage';
import MyPage from './pages/MyPage/MyPage';
import ResumePage from './pages/ResumePage';
import MyStatusPage from './pages/MyPage/MyStatusPage';
import ChattingPage from './pages/ChattingPage';
import MyResume from './pages/MyResume/MyResume';
import SignUpPage from './pages/SignUpPage';
>>>>>>> eb70e5d2652d150105aa5b6d898226fb96c4a45c

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/alba/search" element={<AlbaSearchPage />} />
      <Route path="/alba/review" element={<AlbaReviewPage/>}/>
      <Route path="/alba/resume/:id" element={<ResumePage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/chat" element={<ChattingPage />} />
      <Route path="/mypage/resume" element={<MyResume />} />
      <Route path="/mypage/status" element={<MyStatusPage />} />
    </Routes>
  );
};

export default AppRouter;
