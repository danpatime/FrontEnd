import "./App.css";
import Layout from "./components/layout/Layout";
import Router from "./Router";

import MypageSubMenu from "./components/common/MypageSubMenu";
import MyStorePage from "./pages/MyPage/MyStorePage";

function App() {
  return (
    <Layout>
      <Router />
      <MyStorePage/>
    </Layout>
  );
}

export default App;
