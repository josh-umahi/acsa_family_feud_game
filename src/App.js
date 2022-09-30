import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Home/Home';
import RoundOfGame from './RoundOfGame/RoundOfGame';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={< Home />} />
        <Route exact path='/roundOfGame/:id' element={< RoundOfGame />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App
