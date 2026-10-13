import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { Sun, Moon, Terminal, Database, Menu, X } from 'lucide-react';

export default function Header() {
  const { theme, toggleTheme, profile, toggleProfile } = useAppStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-secondary px-6 md:px-8 py-4 shadow-lg transition-colors duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-primary font-black text-2xl tracking-tighter">
          MG<span className="text-details">.</span>
        </h1>

        {/* Navegação Desktop */}
        <nav className="hidden md:flex gap-2 text-primary font-bold items-center">
          {['Sobre', 'Projetos', 'Stacks', 'Contato'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="px-5 py-2 rounded-2xl transition-all duration-300 border border-transparent hover:border-white/40 hover:bg-white/30 hover:backdrop-blur-md hover:shadow-[0_4px_15px_rgba(0,0,0,0.1)]"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex gap-3 md:gap-4 items-center">
          <button 
            onClick={toggleProfile} 
            className="p-2 rounded-full bg-primary/20 hover:bg-primary/40 text-primary transition-all shadow hover:shadow-md"
          >
            {profile === 'dev' ? <Terminal size={20} /> : <Database size={20} />}
          </button>
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full bg-primary/20 hover:bg-primary/40 text-primary transition-all shadow hover:shadow-md"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          
          {/* Botão Hambúrguer Mobile */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Dropdown Mobile */}
      {isMenuOpen && (
        <nav className="md:hidden flex flex-col gap-2 pt-6 pb-2 border-t border-primary/20 mt-4">
          {['Sobre', 'Projetos', 'Stacks', 'Contato'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              onClick={() => setIsMenuOpen(false)}
              className="text-primary font-bold text-xl py-2 px-4 rounded-xl hover:bg-white/30 transition-colors text-right"
            >
              {item}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}