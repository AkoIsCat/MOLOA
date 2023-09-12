import Home from './pages/Home';
import Rank from './pages/Rank';
import Guild from './pages/Guild';
import Utility from './pages/Utility';
import Character from './pages/Character';
import Community from './pages/Community';
import Notification from './pages/Notification';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/noti/:id" element={<Notification />} />
      <Route path="/rank" element={<Rank />} />
      <Route path="/guild" element={<Guild />} />
      <Route path="/utility" element={<Utility />} />
      <Route path="/character/:id" element={<Character />} />
      <Route path="/community" element={<Community />} />
    </Routes>
  );
}

export default App;
