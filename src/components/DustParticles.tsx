
import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  element: HTMLDivElement;
}

interface DustParticlesProps {
  count?: number;
  colors?: string[];
  className?: string;
}

const defaultColors = [
  ['#627EEA', '#4258B3', '98, 126, 234'], // Ethereum
  ['#FF4A60', '#CC3A4D', '255, 74, 96'], // Starknet
  ['#14F195', '#10C177', '20, 241, 149'], // Solana
  ['#8247E5', '#6538B7', '130, 71, 229'], // Polygon
  ['#3E1BDB', '#3217AF', '62, 27, 219'], // Stellar
];

export const DustParticles: React.FC<DustParticlesProps> = ({
  count = 30,
  colors = defaultColors,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();

    // Clean up previous particles
    const oldParticles = container.querySelectorAll('.dust-particle');
    oldParticles.forEach(p => p.remove());

    // Create new particles
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const colorSet = colors[Math.floor(Math.random() * colors.length)];

      const element = document.createElement('div');
      element.classList.add('dust-particle');
      
      const size = Math.random() * 8 + 2; // Size between 2-10px
      element.style.width = `${size}px`;
      element.style.height = `${size}px`;
      
      const xPos = Math.random() * width;
      const yPos = Math.random() * height;
      element.style.left = `${xPos}px`;
      element.style.top = `${yPos}px`;
      
      element.style.setProperty('--color-start', colorSet[0]);
      element.style.setProperty('--color-end', colorSet[1]);
      element.style.setProperty('--color-glow', colorSet[2]);
      
      // Randomize animation delay
      element.style.animationDelay = `${Math.random() * 5}s`;
      
      // Randomize animation duration between 5-10s
      element.style.animationDuration = `${5 + Math.random() * 5}s`;
      
      container.appendChild(element);
      
      particles.push({
        x: xPos,
        y: yPos,
        size,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: colorSet[0],
        element
      });
    }
    
    particlesRef.current = particles;

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      particlesRef.current.forEach(p => p.element.remove());
    };
  }, [count, colors]);

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} />
  );
};

export default DustParticles;
