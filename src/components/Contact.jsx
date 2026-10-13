import React from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section id="contato" className="min-h-screen bg-primary flex items-center justify-center p-8 transition-colors duration-500 overflow-hidden relative">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-12">
        
        <div className="w-full md:w-1/2 flex flex-col items-start z-10">
          <h2 className="text-5xl md:text-7xl font-display font-black text-secondary mb-6 drop-shadow-sm">
            Vamos<br />Conversar?
          </h2>
          <p className="font-sans text-xl font-bold text-details leading-relaxed max-w-lg mb-8">
            Puxe a folha da pasta para preencher o formulário, ou acesse os links rápidos na nota fiscal lá em cima!
          </p>
        </div>

        {/* Container da Animação */}
        <div className="w-full md:w-1/2 flex justify-center relative group h-[500px]">
          
          {/* A Folha de Papel (Move-se para a Direita no hover) */}
          <motion.div
            initial={{ x: 0, opacity: 0.8 }}
            whileHover={{ x: 120, opacity: 1, rotate: 2 }} // Sai para a direita
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="absolute top-10 left-1/4 w-64 h-[400px] bg-[#fdfdfd] shadow-[4px_4px_15px_rgba(0,0,0,0.1)] rounded-sm p-6 z-0 flex flex-col border border-gray-200"
          >
            <h3 className="font-pixel text-2xl font-bold text-gray-800 mb-4 border-b-2 border-dashed border-gray-300 pb-2">
              FORM. DE MENSAGEM
            </h3>
            <input type="text" placeholder="Nome" className="mb-4 bg-transparent border-b border-gray-400 font-sans outline-none focus:border-details text-gray-700" />
            <input type="email" placeholder="E-mail" className="mb-4 bg-transparent border-b border-gray-400 font-sans outline-none focus:border-details text-gray-700" />
            <textarea placeholder="Sua mensagem..." className="bg-transparent border-b border-gray-400 font-sans outline-none focus:border-details text-gray-700 h-24 resize-none mb-4"></textarea>
            <button className="bg-details text-white font-bold py-2 rounded-sm hover:brightness-110 transition-all font-pixel text-xl">
              ENVIAR
            </button>
          </motion.div>

          {/* A Pasta Rosa (Move-se para a Esquerda no hover) */}
          <motion.div
            initial={{ x: 0 }}
            whileHover={{ x: -60, rotate: -2 }} // Afasta-se para a esquerda
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="relative z-10 w-80 h-[450px]"
          >
            {/* Como a imagem tem fundo preto, o mix-blend-screen a torna transparente sobre fundos claros, deixando só a pasta visível */}
            <img src="/folder.png" alt="Pasta de Contato" className="w-full h-full object-contain drop-shadow-2xl mix-blend-multiply" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}