import NavBar from "./component/Navbar/Nav";
import Foot from "./component/Footer/Footer";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate to="/" />} />
          <Route path="/home" element={<Navigate to="/" />} />
        </Routes>
        <Foot />
      </Router>
    </React.Fragment>
  );
};

export default App;
