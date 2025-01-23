import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AlbaSearchPage from "./pages/AlbaSearchPage";
import MyPage from "./pages/MyPage/MyPage";
import MyStatusPage from './pages/MyPage/MyStatusPage';
import ChattingPage from './pages/ChattingPage';
import SignUpPage from './pages/SignUpPage';
import ContactDetailPage from './pages/MyPage/ContactDetailPage';
import MyStorePage from './pages/MyPage/MyStore/MyStorePage';
import ResumePage from "./pages/ResumePage";
import ChattingPage from "./pages/ChattingPage"
import MyResume from "./pages/MyResume/MyResume";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/alba/search" element={<AlbaSearchPage />} />
      <Route path="/alba/resume/:id" element={<ResumePage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/chat" element={<ChattingPage />} />
      <Route path="/mypage/resume" element={<MyResume />} />
      <Route path="/mypage/resume-form" element={<ResumeForm />} />
      <Route path="/mypage/contracts" element={<MyStatusPage />} />
      <Route path="/contracts/:id" element={<ContactDetailPage />} />
      <Route path="/mypage/mystore" element={<MyStorePage />} />
    </Routes>
  );
};

export default AppRouter;
