
import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import DustParticles from "./DustParticles";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  onGetStarted: () => void;
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onGetStarted,
  className
}) => {
  const dustRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className={cn("relative overflow-hidden py-20 px-6 text-center", className)}>
      {/* Background gradient and particles */}
      <div className="absolute inset-0 bg-hero-gradient -z-10"></div>
      <div ref={dustRef} className="absolute inset-0 -z-10">
        <DustParticles count={50} />
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-pink-500/10 blur-3xl"></div>
      
      {/* Hero content */}
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="inline-flex items-center px-4 py-2 mb-8 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse mr-2"></div>
          <span className="text-sm font-medium">Consolidate &amp; Convert Your Dust Tokens</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight relative">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-violet-500 animate-pulse-glow">
            Unlock the Value
          </span>{" "}
          <br className="hidden md:block" />
          <span className="text-gradient bg-gradient-to-b from-white to-white/70">
            of Your Forgotten Crypto
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          Connect multiple wallets and convert small, unused token balances into a single valuable asset 
          across multiple blockchains.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            onClick={onGetStarted} 
            size="lg"
            className="relative overflow-hidden group text-lg px-8 py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0"
          >
            <span className="relative z-10 flex items-center">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="absolute inset-0 bg-glow-conic opacity-0 group-hover:opacity-30 transition-opacity duration-500"></span>
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="text-lg px-8 py-6 backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10"
          >
            Learn More
          </Button>
        </div>
        
        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {[
            { value: "$2.3M+", label: "Total Dust Converted" },
            { value: "5", label: "Supported Chains" },
            { value: "12K+", label: "Active Users" },
            { value: "56K+", label: "Transactions" },
          ].map((stat, index) => (
            <div 
              key={index} 
              className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all hover:bg-white/10"
            >
              <div className="text-3xl font-bold text-gradient bg-gradient-to-r from-white to-gray-300">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
