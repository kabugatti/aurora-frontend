// src/pages/LearningContent.jsx
import React from 'react';
import Sidebar from '../components/layout/Sidebar';  // Adjust this path based on your structure

const LearningContent = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-semibold">Learning Content</h1>
      </main>
    </div>
  );
};

export default LearningContent;