import { BrowserRouter, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import Home from "./components/home";
import Image from "./components/image";
import HomeLoginAndRegister from './components/HomeLoginAndRegis';
import Login from "./components/login";
import Register from "./components/regis";
=======
import Learn from "./components/have_to_see_for_begin/learn";
import Image from "./components/have_to_see_for_begin/learn2";
import Welcome from "./components/welcome_page";
>>>>>>> bad6fc3847bb9488105557ae036b824f59a9ead9

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/welcome" element={<Welcome />} /> 
        <Route path="/learn" element={<Learn />} />
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
