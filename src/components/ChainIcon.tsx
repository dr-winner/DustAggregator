
import React from 'react';
import { cn } from '@/lib/utils';

type ChainType = 'ethereum' | 'starknet' | 'solana' | 'polygon' | 'stellar';

interface ChainIconProps {
  chain: ChainType;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ChainIcon: React.FC<ChainIconProps> = ({ chain, size = 'md', className }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const renderIcon = () => {
    switch (chain) {
      case 'ethereum':
        return (
          <svg viewBox="0 0 32 32" className={cn(sizeClasses[size], 'text-ethereum', className)}>
            <g fill="currentColor" fillRule="evenodd">
              <path d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm7.994-15.781L16.498 4 9 16.22l7.498 4.353 7.496-4.354zM16.498 27.3L9 16.22l7.498 4.353 7.496-4.354L16.498 27.3z" fillOpacity=".65"/>
              <path d="M16.498 20.573l-7.498-4.353 7.498-4.353 7.496 4.353-7.496 4.353zm0 6.728l-7.498-11.08 7.498 4.353 7.496-4.353-7.496 11.08z"/>
            </g>
          </svg>
        );
      case 'starknet':
        return (
          <svg viewBox="0 0 32 32" className={cn(sizeClasses[size], 'text-starknet', className)}>
            <path fill="currentColor" d="M16,0 C7.163,0 0,7.163 0,16 C0,24.837 7.163,32 16,32 C24.837,32 32,24.837 32,16 C32,7.163 24.837,0 16,0 Z M16,6 C20.418,6 24,9.582 24,14 C24,18.418 20.418,22 16,22 C11.582,22 8,18.418 8,14 C8,9.582 11.582,6 16,6 Z M16,10 C13.791,10 12,11.791 12,14 C12,16.209 13.791,18 16,18 C18.209,18 20,16.209 20,14 C20,11.791 18.209,10 16,10 Z"/>
          </svg>
        );
      case 'solana':
        return (
          <svg viewBox="0 0 397.7 311.7" className={cn(sizeClasses[size], 'text-solana', className)}>
            <path fill="currentColor" d="M64.6,237.9c2.4-2.4,5.7-3.8,9.2-3.8h317.4c5.8,0,8.7,7,4.6,11.1l-62.7,62.7c-2.4,2.4-5.7,3.8-9.2,3.8H6.5c-5.8,0-8.7-7-4.6-11.1L64.6,237.9z"/>
            <path fill="currentColor" d="M64.6,3.8C67.1,1.4,70.4,0,73.8,0h317.4c5.8,0,8.7,7,4.6,11.1l-62.7,62.7c-2.4,2.4-5.7,3.8-9.2,3.8H6.5c-5.8,0-8.7-7-4.6-11.1L64.6,3.8z"/>
            <path fill="currentColor" d="M333.1,120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8,0-8.7,7-4.6,11.1l62.7,62.7c2.4,2.4,5.7,3.8,9.2,3.8h317.4c5.8,0,8.7-7,4.6-11.1L333.1,120.1z"/>
          </svg>
        );
      case 'polygon':
        return (
          <svg viewBox="0 0 38.4 33.5" className={cn(sizeClasses[size], 'text-polygon', className)}>
            <path fill="currentColor" d="M29,10.2c-0.7-0.4-1.6-0.4-2.4,0L21,13.5l-3.8,2.1l-5.5,3.3c-0.7,0.4-1.6,0.4-2.4,0L5,16.3 c-0.7-0.4-1.2-1.2-1.2-2.1v-5c0-0.8,0.4-1.6,1.2-2.1l4.3-2.5c0.7-0.4,1.6-0.4,2.4,0L16,7.2c0.7,0.4,1.2,1.2,1.2,2.1v3.3l3.8-2.2V7 c0-0.8-0.4-1.6-1.2-2.1l-8-4.7c-0.7-0.4-1.6-0.4-2.4,0L1.2,5C0.4,5.4,0,6.2,0,7v9.4c0,0.8,0.4,1.6,1.2,2.1l8.1,4.7 c0.7,0.4,1.6,0.4,2.4,0l5.5-3.2l3.8-2.2l5.5-3.2c0.7-0.4,1.6-0.4,2.4,0l4.3,2.5c0.7,0.4,1.2,1.2,1.2,2.1v5c0,0.8-0.4,1.6-1.2,2.1 L29,28.8c-0.7,0.4-1.6,0.4-2.4,0l-4.3-2.5c-0.7-0.4-1.2-1.2-1.2-2.1V21l-3.8,2.2v3.3c0,0.8,0.4,1.6,1.2,2.1l8.1,4.7 c0.7,0.4,1.6,0.4,2.4,0l8.1-4.7c0.7-0.4,1.2-1.2,1.2-2.1V17c0-0.8-0.4-1.6-1.2-2.1L29,10.2z"/>
          </svg>
        );
      case 'stellar':
        return (
          <svg viewBox="0 0 256 256" className={cn(sizeClasses[size], 'text-stellar', className)}>
            <path fill="currentColor" d="M128,0 C198.7,0 256,57.3 256,128 C256,198.7 198.7,256 128,256 C57.3,256 0,198.7 0,128 C0,57.3 57.3,0 128,0 Z M89,166.5 L89,89 L167,89 L167,166.5 L89,166.5 Z M173,83 L83,83 L83,173 L173,173 L173,83 Z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return renderIcon();
};

export default ChainIcon;
