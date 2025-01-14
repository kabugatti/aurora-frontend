import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout'; // Asegúrate de que la ruta sea correcta
import LearningContent from './pages/LearningContent';
import CertificationsObtained from './pages/CertificationsObtained';
import SettingsPage from './pages/SettingsPage';
import StarklaChat from './pages/StarklaChat';
import Categories from './pages/Categories';
import Analytics from './pages/Analytics';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<LearningContent />} />
          <Route path="/learning-content" element={<LearningContent />} />
          <Route path="/certifications-obtained" element={<CertificationsObtained />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/starkla-chat" element={<StarklaChat />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
