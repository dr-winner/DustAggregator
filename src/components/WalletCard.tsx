
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChainIcon } from "./ChainIcon";
import { cn } from "@/lib/utils";
import { Check, Wallet, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { WalletInfo } from '@/hooks/useWalletConnection';

interface WalletCardProps {
  wallet: WalletInfo;
  onConnect: (wallet: WalletInfo) => Promise<WalletInfo>;
  onDisconnect?: (wallet: WalletInfo) => void;
  isConnected?: boolean;
  className?: string;
}

export const WalletCard: React.FC<WalletCardProps> = ({
  wallet,
  onConnect,
  onDisconnect,
  isConnected = false,
  className
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  // Get chain display name
  const getChainDisplayName = () => {
    const chainNames = {
      ethereum: 'Ethereum',
      starknet: 'Starknet',
      solana: 'Solana',
      polygon: 'Polygon',
      stellar: 'Stellar',
    };
    
    return chainNames[wallet.chain] || wallet.chain;
  };

  // Handle wallet connection
  const handleConnect = async () => {
    if (isConnected || isConnecting) return;
    
    setIsConnecting(true);
    
    try {
      await onConnect(wallet);
    } catch (error) {
      console.error("Wallet connection error:", error);
      toast({
        title: "Connection Failed",
        description: "Could not connect to wallet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  // Handle wallet disconnection
  const handleDisconnect = () => {
    if (onDisconnect) {
      onDisconnect(wallet);
    }
  };

  // Dynamically generate a gradient background based on wallet chain
  const getChainGradient = () => {
    const chainColors = {
      ethereum: "from-purple-600 to-blue-500",
      starknet: "from-red-500 to-pink-600",
      solana: "from-green-400 to-teal-500",
      polygon: "from-purple-600 to-indigo-600",
      stellar: "from-blue-600 to-indigo-700",
    };
    
    return chainColors[wallet.chain] || "from-gray-700 to-gray-800";
  };

  return (
    <Card 
      className={cn(
        "group relative overflow-hidden border-transparent transition-all duration-300 hover:scale-105 backdrop-blur-md",
        `chain-glow ${wallet.chain}-glow`,
        "bg-gradient-to-br bg-opacity-20",
        className
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="absolute inset-0 opacity-20 bg-gradient-to-br pointer-events-none"></div>
      
      <div className="flex flex-col items-center justify-center p-6 h-full space-y-4 relative z-10">
        <div className={cn(
          "relative rounded-full p-3 transition-transform duration-500",
          "bg-gradient-to-br shadow-lg",
          getChainGradient(),
          isHovering ? "scale-110" : "",
          isConnected ? "ring-2 ring-white/30" : ""
        )}>
          <ChainIcon chain={wallet.chain} size="lg" className="animate-pulse-glow" />
        </div>
        
        <h3 className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
          {getChainDisplayName()}
        </h3>
        
        {isConnected ? (
          <div className="w-full space-y-3">
            <div className="text-xs text-center text-muted-foreground overflow-hidden text-ellipsis">
              {wallet.address && (
                <span title={wallet.address}>
                  {wallet.address.substring(0, 6)}...{wallet.address.substring(wallet.address.length - 4)}
                </span>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs bg-white/5"
                onClick={handleDisconnect}
              >
                <X size={12} className="mr-1" /> Disconnect
              </Button>
            </div>
          </div>
        ) : (
          <Button 
            variant="default"
            className={cn(
              "w-full transition-all duration-300 bg-gradient-to-r shadow-lg",
              isConnected 
                ? "from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700" 
                : `bg-${wallet.chain}/80 hover:bg-${wallet.chain} ${getChainGradient()}`
            )}
            disabled={isConnecting}
            onClick={handleConnect}
          >
            {isConnecting ? (
              <span className="flex items-center">
                Connecting
                <span className="ml-2 flex space-x-1">
                  {[0, 1, 2].map(i => (
                    <span 
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-current animate-wave"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </span>
              </span>
            ) : (
              <>
                <Wallet size={16} className="mr-2" /> Connect {getChainDisplayName()}
              </>
            )}
          </Button>
        )}
      </div>
    </Card>
  );
};

export default WalletCard;
