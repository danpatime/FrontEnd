import "./App.css";
import Layout from "./components/layout/Layout";
import Router from "./Router";
import { UserInfoProvider } from "./contexts/UserInfoContext";


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
