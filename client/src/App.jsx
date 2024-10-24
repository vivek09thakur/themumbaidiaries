import NavBar from "./component/Navbar/Nav";
import Hero from "./component/Hero/Hero";
import Foot from "./component/Footer/Footer";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate to="/" />} />
          <Route path="/" element={<Hero />} />
          <Route path="/home" element={<Navigate to="/" />} />
        </Routes>
        <Foot />
      </Router>
    </React.Fragment>
  );
};

export default App;
