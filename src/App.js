import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Recommendations from './components/Recommendations';
import Contact from './components/Contact';
import Resume from './components/Resume'

function App() {
  return (
    <main className="text-gray-400 bg-teal-50 body-font">
      <Navbar />
      <About />
      <Projects />
      <Skills />
      <Recommendations />
      <Resume />
      <Contact />
    </main>
  );
}

export default App;
