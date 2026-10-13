import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Lilium(props) {
  const { scene } = useGLTF('/lilium.gltf'); 
  
  const materialRef = useRef(new THREE.MeshStandardMaterial({ 
    roughness: 0.2, 
    metalness: 0.3 
  }));

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = materialRef.current;
      }
    });
  }, [scene]);

  useFrame(() => {
    if (materialRef.current) {
      // Lê o CSS e aplica a cor instantaneamente
      const style = getComputedStyle(document.documentElement);
      const secColor = style.getPropertyValue('--secondary').trim();
      if (secColor) materialRef.current.color.set(secColor);
    }
  });

  return <primitive object={scene} {...props} />;
}