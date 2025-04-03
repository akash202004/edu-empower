import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="loading-container">
        <div className="loader"></div>
      </div>
      <p className="mt-4 text-gray-600">Preparing your experience...</p>
    </div>
  );
};

export default LoadingScreen;