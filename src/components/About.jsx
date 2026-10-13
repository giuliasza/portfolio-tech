import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import Lilium from './Lilium';
import { useAppStore } from '../store/useAppStore';

function LiliumSpinning() {
  const lilyRef = useRef();
  
  useFrame(() => {
    if (lilyRef.current) {
      lilyRef.current.rotation.z -= 0.005; // Gira as pétalas de frente
    }
  });

  return (
    <group ref={lilyRef} scale={4} position={[0, -0.5, 0]}>
      {/* Rotação ajustada para a flor olhar para a frente */}
      <Lilium rotation={[1.57, 0, 0]} />
    </group>
  );
}

export default function About() {
  const { profile } = useAppStore();

  return (
    <section id="sobre" className="min-h-screen bg-primary flex flex-col md:flex-row items-center justify-center p-8 relative overflow-hidden transition-colors duration-500">
      
      {/* Lado Esquerdo: O Lírio 3D */}
      <div className="w-full md:w-1/2 h-[500px] relative z-10">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[0, 0, 0]} intensity={2} />
          <Environment preset="city" />
          <LiliumSpinning />
        </Canvas>
      </div>

      {/* Lado Direito: Texto */}
      <div className="w-full md:w-1/2 flex flex-col z-10 mt-8 md:mt-0">
        <h2 className="text-5xl font-display font-black text-secondary mb-6">
          Olá, sou a Maria Giulia!
        </h2>
        <p className="font-sans text-xl font-bold text-details leading-relaxed max-w-lg">
          {profile === 'dev' 
            ? "Sou uma Desenvolvedora apaixonada por criar interfaces modernas e interativas, misturando código com direção de arte (como flores e Legos!)."
            : "Sou uma Analista de Dados fascinada por transformar números em histórias visuais e arquitetar bases de dados eficientes."}
        </p>
      </div>

    </section>
  );
}