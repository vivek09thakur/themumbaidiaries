import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import './App.css';
import NavBar from './component/Navbar/Nav';
import Hero from './component/Hero/Hero';
import Foot from './component/Footer/Footer';
// import { Cube } from 'react-preloaders';
import AnimatedCursor from 'react-animated-cursor';

const App = () => {
  // const [load, updateLoad] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     updateLoad(false);
  //   }, 1200);

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <React.Fragment>
      {/* <Cube background="#f0f0f0" color="#5C5CED" /> */}
      <AnimatedCursor innerSize={10} outerSize={10} color="182, 92, 235" />
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="#feed" element={<Hero />} />
          <Route path="/#home" element={<Navigate to="/" />} />
        </Routes>
        <Foot />
      </Router>
    </React.Fragment>
  );
};

export default App;
