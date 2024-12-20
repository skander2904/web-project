import React from 'react';

const Banned = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-50">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-red-600 mb-4">You Have Been Banned</h1>
        <p className="text-lg text-gray-700 mb-4">Your account has been banned due to violation of our terms of service.</p>
        <p className="text-md text-gray-500 mb-6">If you believe this is a mistake, please contact support.</p>
        <div>
          <a
            href="/"
            className="text-blue-600 hover:underline"
          >
            Go back to the homepage
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banned;
