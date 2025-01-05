import "./App.css";
import Layout from "./components/layout/Layout";
import Router from "./Router";
import { UserInfoProvider } from "./contexts/UserInfoContext";

import MypageSubMenu from "./components/common/MypageSubMenu";
import MyStorePage from "./pages/MyPage/MyStorePage";

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
