// import React  from 'react';
// import {BrowserRouter, Routes, Route} from 'react-router-dom';
// import './App.css';

// //Components import
// import Navbar from './components/Navbar/Navbar'
// import Container from './components/Container/Container'



// const App = () => (
//   <BrowserRouter>
//     <Navbar/>
//     <Routes>
//       <Route path='/' exact component = {<Container/>}/>
//     </Routes>
  
  
//   </BrowserRouter>
// )

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import {Route} from 'react-router';
import './App.css';

// Components import
import Navbar from './components/Navbar/Navbar';
import Container from './components/Container/Container';
import Auth from './components/Auth/Auth';
import Formm from './components/Formm/Formm';
import Contact from './components/Contact/Contact';

// import Navigator from './components/Navigator/Navigator';
const App = () => (
  <Router>
    
    <Routes>
      
    <Route path="/" element={<div><Navbar/><Container/></div>} />
    
    {/* <Route path="/" element={X} /> */}
      <Route path="/auth" exact element={<Auth/>}/>
      <Route path='/formm' exact element={<Formm/>}/>
      <Route path='/Contact' exact element={<Contact/>}/>
    </Routes>
  </Router>
);

export default App;
