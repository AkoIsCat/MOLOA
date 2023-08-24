import Home from './page/Home';
import Rank from './page/Rank';
import Guild from './page/Guild';
import Equipment from './page/Equipment.js';
import Character from './page/Character';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/rank" element={<Rank />} />
      <Route path="/guild" element={<Guild />} />
      <Route path="/equipment" element={<Equipment />} />
      <Route path="/character/:id" element={<Character />} />
    </Routes>
  );
}

export default App;
