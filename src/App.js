import Home from './pages/Home';
import Rank from './pages/Rank';
import Guild from './pages/Guild';
import Equipment from './pages/Equipment';
import Character from './pages/Character';
import Community from './pages/Community';
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
      <Route path="/community" element={<Community />} />
    </Routes>
  );
}

export default App;
