
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChainIcon } from "./ChainIcon";
import { ChainType } from '@/utils/alchemyService';

interface TokenFilterTabsProps {
  activeTab: string;
  tokenCounts: Record<string, number>;
}

export const TokenFilterTabs: React.FC<TokenFilterTabsProps> = ({
  activeTab,
  tokenCounts
}) => {
  return (
    <TabsList>
      <TabsTrigger value="all" className="relative">
        All
        <span className="ml-1 text-xs bg-secondary px-1.5 rounded-full">{tokenCounts.all || 0}</span>
      </TabsTrigger>
      <TabsTrigger value="ethereum" className="relative">
        <ChainIcon chain="ethereum" size="sm" className="mr-1" />
        ETH
        {tokenCounts.ethereum > 0 && (
          <span className="ml-1 text-xs bg-secondary px-1.5 rounded-full">{tokenCounts.ethereum}</span>
        )}
      </TabsTrigger>
      <TabsTrigger value="starknet" className="relative">
        <ChainIcon chain="starknet" size="sm" className="mr-1" />
        STRK
        {tokenCounts.starknet > 0 && (
          <span className="ml-1 text-xs bg-secondary px-1.5 rounded-full">{tokenCounts.starknet}</span>
        )}
      </TabsTrigger>
      <TabsTrigger value="solana" className="relative">
        <ChainIcon chain="solana" size="sm" className="mr-1" />
        SOL
        {tokenCounts.solana > 0 && (
          <span className="ml-1 text-xs bg-secondary px-1.5 rounded-full">{tokenCounts.solana}</span>
        )}
      </TabsTrigger>
      <TabsTrigger value="polygon" className="relative">
        <ChainIcon chain="polygon" size="sm" className="mr-1" />
        MATIC
        {tokenCounts.polygon > 0 && (
          <span className="ml-1 text-xs bg-secondary px-1.5 rounded-full">{tokenCounts.polygon}</span>
        )}
      </TabsTrigger>
      <TabsTrigger value="stellar" className="relative">
        <ChainIcon chain="stellar" size="sm" className="mr-1" />
        XLM
        {tokenCounts.stellar > 0 && (
          <span className="ml-1 text-xs bg-secondary px-1.5 rounded-full">{tokenCounts.stellar}</span>
        )}
      </TabsTrigger>
    </TabsList>
  );
};

export default TokenFilterTabs;
