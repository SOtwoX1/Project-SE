import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLoginAndRegister from './components/HomeLoginAndRegis';
import Login from "./components/login";
import Register from "./components/regis";
import Learn from "./components/have_to_see_for_begin/learn";
import Image from "./components/have_to_see_for_begin/learn2";
import Forgetpass from "./components/forget_pass"
import OTP from "./components/otp"
import Cnr from "./components/create_new_pass"
import Regis_sucess from "./components/regis_sucess"
import Pass_change from "./components/pass_change";
import Menu from "./components/Menu";
import Profile from "./components/Profile";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/learn" element={<Learn />} />
        <Route path="/nextpage" element={<Image />} /> 
        <Route path="/home-login-register" element={<HomeLoginAndRegister />} /> 
        <Route path="/Login" element={<Login />} /> 
        <Route path="/Regis" element={<Register />} /> 
        <Route path="/Forgot-password" element={<Forgetpass />} /> 
        <Route path="/OTP" element={<OTP />} /> 
        <Route path="/Create-new-password" element={<Cnr />} /> 
        <Route path="/Register-Sucessfull" element={<Regis_sucess />} />
        <Route path="/Password-Change" element={<Pass_change />} />
        <Route path="/Menu" element={<Menu />} /> 
        <Route path="/Profile" element={<Profile />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
