import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LearningContent from './pages/LearningContent'; 
import CertificationsObtained from './pages/CertificationsObtained'; 
import SettingsPage from './pages/SettingsPage'; 
import StarklaChat from './pages/StarklaChat'; 
import Categories from './pages/Categories'; 
import Analytics from './pages/Analytics'; 
import CertificationContent from './pages/CertificationContent';
import ModuleDetails from './pages/ModuleDetails';
import HomePage from './pages/HomePage';
import WalletConnection from './pages/WalletConnection';

function App() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  // Function to handle wallet connection
  const handleWalletConnection = (status) => {
    setIsWalletConnected(status);
  };

  return (
    <Router>
      <Routes>
        {/* Protected Routes */}
        <Route
          path="/"
          element={isWalletConnected ? <HomePage /> : <Navigate to="/wallet" />}
        />
        <Route
          path="/learning"
          element={isWalletConnected ? <LearningContent /> : <Navigate to="/wallet" />}
        />
        <Route
          path="/certifications-obtained"
          element={isWalletConnected ? <CertificationsObtained /> : <Navigate to="/wallet" />}
        />
        <Route
          path="/settings"
          element={isWalletConnected ? <SettingsPage /> : <Navigate to="/wallet" />}
        />
        <Route
          path="/starkla-chat"
          element={isWalletConnected ? <StarklaChat /> : <Navigate to="/wallet" />}
        />
        <Route
          path="/categories"
          element={isWalletConnected ? <Categories /> : <Navigate to="/wallet" />}
        />
        <Route
          path="/analytics"
          element={isWalletConnected ? <Analytics /> : <Navigate to="/wallet" />}
        />
        <Route
          path="/certification-content"
          element={isWalletConnected ? <CertificationContent /> : <Navigate to="/wallet" />}
        />
        <Route
          path="/module-details"
          element={isWalletConnected ? <ModuleDetails /> : <Navigate to="/wallet" />}
        />

        {/* Public Route */}
        <Route 
          path="/wallet" 
          element={
            <WalletConnection 
              onWalletConnect={handleWalletConnection}
              isConnected={isWalletConnected}
            />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;