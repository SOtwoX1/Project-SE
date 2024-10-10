import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Image from "./components/image";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* //http://localhost:3000/ */}
        <Route path="/nextpage" element={<Image />} /> 
        {/* //http://localhost:3000/nextpage
        can make router more complex like this */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
