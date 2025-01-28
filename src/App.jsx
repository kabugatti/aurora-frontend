import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import LearningContent from './pages/LearningContent';
import CertificationsObtained from './pages/CertificationsObtained';
import SettingsPage from './pages/SettingsPage';
import StarklaChat from './pages/StarklaChat/StarklaChat'; 
import Categories from './pages/Categories';
import Analytics from './pages/Analytics';
import CertificationContent from './pages/CertificationContent';
import ModuleDetails from './pages/ModuleDetails';
import WalletConnection from './pages/WalletConnection';
import HomePage from './pages/HomePage';

import StoryGame from './pages/StoryGame';

import WordMatching from './pages/Games/WordMatching';

import GamePanel from './pages/GamePanel';
import DifficultySelector from './components/Games/memory-card/DifficultySelector';
import GameBoard from './components/Games/memory-card/GameBoard';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/learning-content" element={<LearningContent />} />
          <Route path="/wallet-connection" element={<WalletConnection />} />
          <Route path="/certifications-obtained" element={<CertificationsObtained />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/starkla-chat" element={<StarklaChat />} />
          <Route path="/certification-content" element={<CertificationContent />} />
          <Route path="/module-details" element={<ModuleDetails />} />

          <Route path="/story-game" element={<StoryGame />} />

          <Route path="/games/word-matching/" element={<WordMatching/>}/>

          <Route path="/games" element={<GamePanel />} />
          <Route path="/games/memory-card" element={<DifficultySelector />} />
          <Route path="/games/memory-card/:levelId" element={<GameBoard />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
