import React from 'react';
import { Link } from 'react-router-dom';
import { LEVELS } from './../../Games/data/memoryLevels';

const DifficultySelector = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/games" className="text-primary hover:text-primary-dark mb-8 inline-flex items-center">
        <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Games
      </Link>

      <h1 className="text-3xl font-bold text-center mb-8 text-primary">Memory Card Game</h1>
      <h2 className="text-2xl text-center mb-12 text-primary font-bold">Select Difficulty Level</h2>

      <div className="max-w-xs mx-auto space-y-4">
        {Object.values(LEVELS).map((level) => (
          <Link
            key={level.id}
            to={`/games/memory-card/${level.id}`}
            className="block w-full p-4 text-center bg-primary text-white hover:text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            {level.name} ({level.label})
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DifficultySelector; 