import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AlbaSearchPage from "./pages/AlbaSearchPage";
import MyPage from "./pages/MyPage/MyPage";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import ResumePage from "./pages/ResumePage";
import ChattingPage from "./pages/ChattingPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/alba/search" element={<AlbaSearchPage />} />
      <Route path="/alba/resume/:id" element={<ResumePage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/chat" element={<ChattingPage />} />
    </Routes>
  );
};

export default AppRouter;
