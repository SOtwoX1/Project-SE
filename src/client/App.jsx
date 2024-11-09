import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Image from "./components/image";
import HomeLoginAndRegister from './components/HomeLoginAndRegis';
import Login from "./components/login";
import Register from "./components/regis";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* //http://localhost:3000/ */}
        <Route path="/nextpage" element={<Image />} /> 
        {/* //http://localhost:3000/nextpage
        can make router more complex like this */}
        <Route path="/home-login-register" element={<HomeLoginAndRegister />} /> 
        <Route path="/Login" element={<Login />} /> 
        <Route path="/Regis" element={<Register />} /> 
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
