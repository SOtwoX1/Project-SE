import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLoginAndRegister from './components/HomeLoginAndRegis';
import Login from "./components/login";
import Register from "./components/regis";
import Learn from "./components/have_to_see_for_begin/learn";
import Image from "./components/have_to_see_for_begin/learn2";
import Welcome from "./components/welcome_page";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/welcome" element={<Welcome />} /> 
        <Route path="/learn" element={<Learn />} />
        <Route path="/nextpage" element={<Image />} /> 
        <Route path="/home-login-register" element={<HomeLoginAndRegister />} /> 
        <Route path="/Login" element={<Login />} /> 
        <Route path="/Regis" element={<Register />} /> 
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
