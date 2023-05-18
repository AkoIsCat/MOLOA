import Home from './page/Home';
import Rank from './page/Rank';
import Guild from './page/Guild';
import Equipment from './page/Equipment.js';
import Character from './page/Character';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    document.cookie = 'safeCookie1=foo; SameSite=Lax';
    document.cookie = 'safeCookie2=foo';
    document.cookie = 'crossCookie=bar; SameSite=None; Secure';
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/rank" element={<Rank />} />
      <Route path="/guild" element={<Guild />} />
      <Route path="/equipment" element={<Equipment />} />
      <Route path="/character/:id" element={<Character />} />
    </Routes>
  );
}

export default App;

// https://lostark.herokuapp.com
//
