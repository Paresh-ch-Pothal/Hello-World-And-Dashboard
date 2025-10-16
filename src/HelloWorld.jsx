import { useState, useEffect } from 'react';

export default function HelloWorld() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className={`transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Hello World
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Welcome to your React application built with Vite. 
              A modern, fast, and efficient development experience.
            </p>
          </div>

          {/* CTA Section */}
          <div className="bg-white rounded-lg shadow-sm border border-blue-100 p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Get Started</h2>
            <p className="text-gray-600 mb-6">Begin building your next great project today</p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Start Building
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}