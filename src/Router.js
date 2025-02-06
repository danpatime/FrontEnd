import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AlbaSearchPage from "./pages/AlbaSearchPage";
import MyPage from "./pages/MyPage/MyPage";
import SignUpPage from "./pages/SignUpPage";
import ResumePage from "./pages/ResumePage";
import ChattingPage from "./pages/ChattingPage";
import MyResume from "./pages/MyResume/MyResume";
import ResumeForm from "./pages/MyResume/ResumeForm";
import MyStatusPage from "./pages/MyPage/MyStatusPage";
import ContactDetailPage from "./pages/MyPage/ContactDetailPage";

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
      <Route path="/mypage/contracts" element={<MyStatusPage />} />
      <Route path="/contracts/:id" element={<ContactDetailPage />} />
      <Route path="/mypage/resume-form" element={<ResumeForm />} />
    </Routes>
  );
};

export default AppRouter;
