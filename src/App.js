import Home from './pages/Home';
import Rank from './pages/Rank';
import Guild from './pages/Guild';
import Utility from './pages/Utility';
import Character from './pages/Character';
import Community from './pages/Community';
import Notification from './pages/Notification';
import MoloaNotiList from './pages/MoloaNotiList';
import SignUp from './pages/SingUp';
import BoardPosts from './pages/BoardPosts';

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/noti/:id" element={<Notification />} />
        <Route path="/rank" element={<Rank />} />
        <Route path="/guild" element={<Guild />} />
        <Route path="/utility" element={<Utility />} />
        <Route path="/character/:id" element={<Character />} />
        <Route path="/community" element={<Community />} />
        <Route path="/notilist" element={<MoloaNotiList />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/posts-detail/:id" element={<BoardPosts />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
