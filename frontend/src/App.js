import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/homepage/homepage";
import LogIn from "./views/auth/login"
import ForgotPassword from "./views/auth/forgotpassword";
import ResetPassword from "./views/auth/resetpassword";
import SignUp from "./views/auth/signup"
import Sidebar from "./components/sidebar/Sidebar";
import Layout from "./components/layout/Layout";
import Dash from "./views/dash/Dash";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="resetpassword/:tokenReset" element={<ResetPassword />} />
        <Route path="/dash" element={
          <Sidebar>
            <Layout>
              <Dash />
            </Layout>
          </Sidebar>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;