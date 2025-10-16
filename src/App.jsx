import { useState, useEffect } from 'react';
import HelloWorld from './HelloWorld';
import Dashboard from './Dashboard';
import Header from './Header';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

export default function App() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <Router>
        <Header />


        <Routes>
          <Route path="/" element={<HelloWorld />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}