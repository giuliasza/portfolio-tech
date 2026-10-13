import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

const LegoShaderMaterial = shaderMaterial(
  { uColor: new THREE.Color() },
  `void main() { gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  `
    uniform vec3 uColor;
    void main() {
      float c = 0.03; 
      vec2 fragCoord = gl_FragCoord.xy;
      vec2 middle = floor(fragCoord * c + 0.5) / c;
      vec3 color = uColor;
      
      float dis = abs(distance(fragCoord, middle) * c * 2.0 - 0.6);
      vec2 dir = fragCoord - middle;
      float len = length(dir);
      if(len > 0.0) { dir /= len; } else { dir = vec2(0.0); }
      
      color *= smoothstep(0.1, 0.05, dis) * dot(vec2(0.707), dir) * 0.5 + 1.0;
      vec2 delta = abs(fragCoord - middle) * c * 2.0;
      color *= 0.8 + smoothstep(0.95, 0.8, max(delta.x, delta.y)) * 0.2;
      gl_FragColor = vec4(color, 1.0);
    }
  `
);
extend({ LegoShaderMaterial });

function ShaderBackground() {
  const materialRef = useRef();
  useFrame(() => {
    if (materialRef.current) {
      const style = getComputedStyle(document.documentElement);
      const primary = style.getPropertyValue('--primary').trim();
      if(primary) materialRef.current.uColor.set(primary);
    }
  });
  return (
    <mesh position={[0, 0, -5]}>
      <planeGeometry args={[100, 100]} /> 
      <legoShaderMaterial ref={materialRef} />
    </mesh>
  );
}

const ImageKey = ({ letter }) => {
  const playSound = () => {
    const audio = new Audio('/key-click.mp3'); 
    audio.volume = 0.5; // Deixei em 50% para não estourar o ouvido
    audio.play().catch(() => {}); // O catch evita travamentos se o mouse passar muito rápido
  };

  return (
    <button 
      onMouseEnter={playSound}
      onClick={playSound}
      className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all cursor-default"
    >
      <img src={`/keys/${letter}.jpeg`} alt={`Tecla ${letter}`} className="w-full h-full rounded-2xl object-contain" />
    </button>
  );
};

export default function Hero() {
  const letters = ['P','O','R','T','F','O','L','I','O'];
  const today = new Date().toLocaleDateString('pt-BR');

  return (
    <section id="hero" className="h-screen w-full relative overflow-hidden bg-primary transition-colors duration-500">
      <Canvas className="absolute inset-0">
        <ShaderBackground />
      </Canvas>

      <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 pointer-events-auto z-10 pt-24 md:pt-0">
        
        {/* LADO ESQUERDO: Título, Teclas e Banner */}
        <div className="flex flex-col items-center lg:items-start w-full lg:w-1/2 mb-8 lg:mb-0 mt-4 lg:mt-0">
          
          {/* Fundo do Bem-vindo sempre claro (bg-white/90) e responsivo */}
          <div className="bg-white/90 dark:bg-white/40 backdrop-blur-md border-[2px] pt-2rem border-primary/20 p-4 md:p-6 mb-8 shadow-[4px_4px_0_var(--color-details)] md:shadow-[6px_6px_0_var(--color-details)] rounded-sm -rotate-2 w-fit">
            <h2 className="font-sans font-black text-5xl md:text-7xl text-secondary text-left leading-tight drop-shadow-sm">
              Bem-vindo<br />ao meu
            </h2>
          </div>

          {/* O TRUQUE DA RESPONSIVIDADE: mb-16 ou pb-12 adiciona um "calço" invisível no telemóvel para a nota fiscal não atropelar o banner que é absoluto! */}
          <div className="relative w-fit mb-16 lg:mb-0">
            <div className="flex gap-1 md:gap-2">
              {letters.map((l, i) => <ImageKey key={i} letter={l} />)}
            </div>

            <div className="absolute top-full left-0 w-full mt-4 bg-white/50 dark:bg-white/20 backdrop-blur-md border border-white/60 rounded-full py-1.5 overflow-hidden shadow-lg">
              <div className="flex whitespace-nowrap animate-marquee font-display text-secondary text-[11px] md:text-sm tracking-widest font-black mix-blend-hard-light">
                {[...Array(4)].map((_, i) => (
                  <React.Fragment key={i}>
                    <span className="mx-3 md:mx-4">DEVELOPER</span>•
                    <span className="mx-3 md:mx-4">REACT</span>•
                    <span className="mx-3 md:mx-4">NODE.JS</span>•
                    <span className="mx-3 md:mx-4">POSTGRESQL</span>•
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* LADO DIREITO: Nota Fiscal Gigante e Responsiva */}
        <div className="relative w-[85%] sm:w-[70%] md:w-[60%] lg:w-[450px] xl:w-[500px] rotate-2 hover:rotate-0 transition-all duration-500 hover:scale-105 drop-shadow-2xl flex-shrink-0 mt-8 lg:mt-0 mx-auto lg:mx-0">
          
          <img src="/receipt.png" alt="Textura de Recibo" className="w-full h-auto opacity-95 mix-blend-multiply block" />

          {/* CENTRALIZAÇÃO MILIMÉTRICA: pl-[20%] (esquerda) e pr-[14%] (direita) compensam a margem do papel. pt-[28%] desce tudo. */}
          <div className="absolute inset-0 flex flex-col pl-[18%] pr-[12%] pt-[30%] pb-[8%] font-pixel text-black/90">            
            <h3 className="text-center font-bold text-base sm:text-lg lg:text-xl mb-1 uppercase">
              Cupom de Contato
            </h3>
            <p className="text-center text-[10px] sm:text-xs lg:text-sm mb-4">Maria Giulia</p>

            <div className="flex justify-between text-[9px] sm:text-[10px] lg:text-xs mb-4">
              <span>DATA: <br/>{today}</span>
              <span className="text-right">HORA: <br/>14:00</span>
            </div>

            <div className="flex flex-col gap-1 lg:gap-1.5 text-[10px] sm:text-[15px] lg:text-[20px] flex-grow">
              <a href="/curriculo.pdf" download className="flex justify-around hover:text-details transition-colors">
                <span>Currículo</span> <span>100%</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex justify-around hover:text-details transition-colors">
                <span>LinkedIn</span> <span>FREE</span>
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="flex justify-around hover:text-details  transition-colors">
                <span>GitHub</span> <span>FREE</span>
              </a>
              <a href="mailto:seuemail@gmail.com" className="flex justify-around hover:text-details transition-colors">
                <span>Email</span> <span>SEND</span>
              </a>
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
}