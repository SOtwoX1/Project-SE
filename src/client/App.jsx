import { BrowserRouter, Routes, Route } from "react-router-dom";
import Learn from "./components/have_to_see_for_begin/learn";
import Image from "./components/have_to_see_for_begin/learn2";
import Welcome from "./components/welcome_page";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
