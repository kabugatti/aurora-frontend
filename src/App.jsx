import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LearningContent from './pages/LearningContent'; 
import CertificationsObtained from './pages/CertificationsObtained'; 
import SettingsPage from './pages/SettingsPage'; 
import StarklaChat from './pages/StarklaChat'; 
import Categories from './pages/Categories'; 
import Analytics from './pages/Analytics'; 
import CertificationContent from './pages/CertificationContent';
import ModuleDetails from './pages/ModuleDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LearningContent />} />
        <Route path="/certifications-obtained" element={<CertificationsObtained />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/starkla-chat" element={<StarklaChat />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/certification-content" element={<CertificationContent />} />
        <Route path="/module-details" element={<ModuleDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
