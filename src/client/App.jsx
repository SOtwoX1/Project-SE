import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLoginAndRegister from './components/HomeLoginAndRegis';
import Login from "./components/login";
import Register from "./components/regis";
import Learn from "./components/have_to_see_for_begin/learn";
import UsersProfilesList from "./components/have_to_see_for_begin/learn2"
import Forgetpass from "./components/forget_pass"
import VerifyLetter from "./components/otp"
import Cnr from "./components/create_new_pass"
import Regis_sucess from "./components/regis_sucess"
import Pass_change from "./components/pass_change_forgot";
import Menu from "./components/Menu";
import Profile from "./components/Profile";
import Edit_pro from "./components/edit_profile";
import Setting_pro from "./components/setting_profile";
import Restaurant from "./components/restaurant";
import Match from "./components/match";
import Chat from "./components/chat";
import Message from "./components/message";
import Show_me from "./components/show_me";
import Password from "./components/password";
import Change_password from "./components/change_password";
import DetailMatch from "./components/detailmatch";
import Manage_Payment_Account from "./components/manage_payment_acc";
import Success_MPA from "./components/sucess_MPA";
import Edit from "./components/edit";
import Preview from "./components/preview";
import Mypackage from "./components/Mypackage";
import NewEdit_pro from "./components/newedit_pro";
import Promotion_restaurant from "./components/promotin_in_rest";
import Nopromotion_restaurant from "./components/nopromotion_rest";
import Whothere from "./components/whothere";
import Accept from "./components/accept";
import Viewmatchprofile from "./components/viewmatchprofile";
import Welcome from "./components/regis_set_id/welcome";
import Personal_info from "./components/regis_set_id/personal_info";
import Add_photo from "./components/regis_set_id/add photo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/learn" element={<Learn />} />
        <Route path="/nextpage" element={<UsersProfilesList />} /> 
        <Route path="/home-login-register" element={<HomeLoginAndRegister />} /> 
        <Route path="/Login" element={<Login />} /> 
        <Route path="/Regis" element={<Register />} /> 
        <Route path="/Forgot-password" element={<Forgetpass />} /> 
        <Route path="/OTP" element={<VerifyLetter />} /> 
        <Route path="/Create-new-password" element={<Cnr />} /> 
        <Route path="/Register-Sucessfull" element={<Regis_sucess />} />
        <Route path="/Password-Change" element={<Pass_change />} />
        <Route path="/Menu" element={<Menu />} /> 
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Edit-Profile" element={<Edit_pro />} />
        <Route path="/Setting-Profile" element={<Setting_pro />} />
        <Route path="/restaurant" element={<Restaurant />} />
        <Route path="/Match" element={<Match />} />
        <Route path="/Chat" element={<Chat />} />
        <Route path="/Message" element={<Message />} />
        <Route path="/Show-Me" element={<Show_me />} />
        <Route path="/Password" element={<Password />} />
        <Route path="/Change-Password" element={<Change_password/>} />
        <Route path="/Detail-Match" element={<DetailMatch/>} />
        <Route path="/Manage-Payment-Account" element={<Manage_Payment_Account/>} />
        <Route path="/Success-Manage-Payment-Account" element={<Success_MPA/>} />
        <Route path="/Mypackage" element={<Mypackage />} />
        <Route path="/Edit" element={<Edit/>} />
        <Route path="/Preview" element={<Preview/>} />
        <Route path="/Mypackage" element={<Mypackage/>} />
        <Route path="/Promotion_restaurant" element={<Promotion_restaurant/>} />
        <Route path="/NoPromotion_restaurant" element={<Nopromotion_restaurant/>} />
        <Route path="/Whothere" element={<Whothere/>} />
        <Route path="/detailmatch" element={<DetailMatch />} />
        <Route path="/Accept" element={<Accept />} />
        <Route path="/Viewmatchprofile" element={<Viewmatchprofile />} />
        <Route path="/Welcome" element={<Welcome />} />
        <Route path="/Personal-info" element={<Personal_info />} />
        <Route path="/Add-photo" element={<Add_photo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

