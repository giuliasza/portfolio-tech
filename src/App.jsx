import React, { useEffect } from 'react';
import { useAppStore } from './store/useAppStore';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Stacks from './components/Stacks';
import Contact from './components/Contact';

export default function App() {
  const { theme, profile } = useAppStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-profile', profile);
  }, [theme, profile]);

  return (
    <div className="font-inter">
      <Header />
      <main>
        <Hero />
        <About />
        <Stacks />
        <Contact />
      </main>
    </div>
  );
}