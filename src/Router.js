import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AlbaSearchPage from "./pages/AlbaSearchPage";
import MyPage from "./pages/MyPage/MyPage";
import ResumePage from "./pages/ResumePage";
import ChattingPage from "./pages/ChattingPage";
import MyResume from "./pages/MyResume/MyResume";
import SignUpPage from "./pages/SignUpPage";

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
    </Routes>
  );
};

export default AppRouter;
