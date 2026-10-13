import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { FaReact, FaNodeJs, FaPython, FaDatabase } from 'react-icons/fa';
import { SiPandas, SiScikitlearn } from 'react-icons/si';

const stacksData = {
  dev: [
    { category: 'Front-End', items: [{ name: 'React', icon: FaReact, desc: 'Criação de SPAs modernas, componentização e hooks.' }] },
    { category: 'Back-End', items: [{ name: 'Node.js', icon: FaNodeJs, desc: 'APIs RESTful e microsserviços escaláveis.' }] }
  ],
  data: [
    { category: 'Análise de Dados', items: [{ name: 'Python', icon: FaPython, desc: 'Limpeza, tratamento e análise exploratória.' }, { name: 'Pandas', icon: SiPandas, desc: 'Manipulação de DataFrames e séries.' }] },
    { category: 'Machine Learning', items: [{ name: 'Scikit-Learn', icon: SiScikitlearn, desc: 'Modelos preditivos e regressão linear.' }] },
    { category: 'Bancos de Dados', items: [{ name: 'SQL / NoSQL', icon: FaDatabase, desc: 'Queries complexas e modelagem.' }] }
  ]
};

export default function Stacks() {
  const { profile } = useAppStore();
  const [openDrawers, setOpenDrawers] = useState([]);
  const [selectedStack, setSelectedStack] = useState(null);

  const toggleDrawer = (category) => {
    setOpenDrawers((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const currentStacks = stacksData[profile];

  return (
    <section id="stacks" className="min-h-screen bg-primary py-24 px-8 relative transition-colors duration-500">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-black text-secondary mb-12 drop-shadow-sm">Minhas Stacks</h2>
        
        <div className="space-y-6">
          {currentStacks.map((section) => {
            const isOpen = openDrawers.includes(section.category);
            return (
              <motion.div key={section.category} layout className="relative">
                
                {/* A Frente da Gaveta Vintage */}
                <button 
                  onClick={() => toggleDrawer(section.category)}
                  className="w-full relative h-24 bg-details text-primary flex justify-between items-center px-8 transition-all hover:brightness-110 group rounded-sm shadow-[inset_0_2px_0_rgba(255,255,255,0.3),_0_6px_0_rgba(0,0,0,0.2),_0_10px_15px_rgba(0,0,0,0.1)] active:translate-y-1 active:shadow-[inset_0_2px_0_rgba(255,255,255,0.3),_0_2px_0_rgba(0,0,0,0.2),_0_5px_10px_rgba(0,0,0,0.1)] z-10 border-b-[3px] border-black/10"
                >
                  {/* Detalhe de entalhe na madeira/metal (moldura interna) */}
                  <div className="absolute inset-2 border-[1.5px] border-primary/30 rounded-sm pointer-events-none shadow-[inset_0_1px_3px_rgba(0,0,0,0.2)]" />
                  
                  <span className="relative font-black text-2xl uppercase tracking-widest drop-shadow-md z-10 w-1/3 text-left">
                    {section.category}
                  </span>
                  
                  {/* Puxador Vintage Central */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                    <div className="w-20 h-5 bg-primary/90 rounded-t-full shadow-[inset_0_-2px_4px_rgba(0,0,0,0.3),_0_2px_4px_rgba(0,0,0,0.2)] border border-black/5" />
                    <div className="w-12 h-3 bg-primary/70 rounded-b-md shadow-md" />
                  </div>

                  <span className="relative z-10 bg-primary/20 px-4 py-2 rounded-full backdrop-blur-sm text-sm font-bold shadow-inner w-1/3 text-right">
                    {isOpen ? 'EMPURRAR' : 'PUXAR'}
                  </span>
                </button>

                {/* O Interior da Gaveta (Fundo Escuro) */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0, y: -20 }}
                      animate={{ height: 'auto', opacity: 1, y: 0 }}
                      exit={{ height: 0, opacity: 0, y: -20 }}
                      className="relative z-0 flex flex-wrap gap-6 p-8 pt-12 bg-black/10 dark:bg-black/20 shadow-[inset_0_15px_25px_rgba(0,0,0,0.15)] rounded-b-xl border-x-4 border-b-4 border-details/40 -mt-2"
                    >
                      {section.items.map((stack, i) => (
                        <motion.button
                          key={stack.name}
                          onClick={() => setSelectedStack(stack)}
                          initial={{ scale: 0, y: 20 }}
                          animate={{ scale: 1, y: 0 }}
                          transition={{ type: "spring", delay: i * 0.05 }}
                          className="w-20 h-20 bg-secondary rounded-lg flex items-center justify-center text-primary shadow-[0_4px_0_var(--color-details),_0_10px_10px_rgba(0,0,0,0.2)] hover:-translate-y-1 hover:shadow-[0_8px_0_var(--color-details),_0_15px_15px_rgba(0,0,0,0.2)] transition-all border-[2px] border-primary/20"
                        >
                          <stack.icon size={40} className="drop-shadow-md" />
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal Suave */}
      <AnimatePresence>
        {selectedStack && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setSelectedStack(null)}
          >
            <motion.div 
              initial={{ scale: 0.8, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-primary p-10 rounded-3xl max-w-sm w-full border-[4px] border-details shadow-2xl flex flex-col items-center text-center"
            >
              <selectedStack.icon size={70} className="text-secondary mb-6" />
              <h3 className="text-3xl font-black text-secondary mb-4">{selectedStack.name}</h3>
              <p className="text-secondary/80 font-bold leading-relaxed">{selectedStack.desc}</p>
              
              <button 
                onClick={() => setSelectedStack(null)}
                className="mt-8 px-8 py-3 bg-details text-primary font-bold rounded-xl shadow-md hover:-translate-y-1 transition-transform"
              >
                Fechar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}