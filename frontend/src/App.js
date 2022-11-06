import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/homepage/homepage";
import LogIn from "./views/auth/login"
import ForgotPassword from "./views/auth/forgotpassword";
import ResetPassword from "./views/auth/resetpassword";
import SignUp from "./views/auth/signup"
import Sidebar from "./components/sidebar/Sidebar";
import Layout from "./components/layout/Layout";
import Dash from "./views/dash/Dash";
import axios from "axios";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getLoginStatus } from "./services/authServices";
import { SET_LOGIN } from "./redux/features/auth/auth_slice";
import AddEntry from "./views/addEntry/AddEntry";

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus()
      dispatch(SET_LOGIN(status))
    }
    loginStatus()
  }, [dispatch])

  return (
    <BrowserRouter>
    <ToastContainer />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword/:tokenReset" element={<ResetPassword />} />
        <Route path="/dash" element={
          <Sidebar>
            <Layout>
              <Dash />
            </Layout>
          </Sidebar>
        } />
      <Route path="/enter-item" element={
          <Sidebar>
            <Layout>
              <AddEntry />
            </Layout>
          </Sidebar>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;