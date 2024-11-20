import Nav from "./components/Modules/NavBar/Nav";
import SignUp from "./components/LogIn/SignUp";
import LogIn from "./components/LogIn/LogIn";
import Feed from "./components/Feed/Feed";
import CreatePost from "./components/Feed/Post/DraftPost";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/feed" element={<Feed />} /> 
        <Route path="/feed/:username" element={<Feed />} />
        <Route path="/feed/create_post/:username/:sessionToken/" element={<CreatePost />} /> {/* Update this line */}
      </Routes>
    </Router>
  );
};

export default App;
