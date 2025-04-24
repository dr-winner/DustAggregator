
import { useState, useMemo } from 'react';
import { TokenInfo } from '@/types';
import { ChainType } from '@/utils/alchemyService';

export const useTokenFilter = (tokens: TokenInfo[]) => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredTokens = useMemo(() => {
    return tokens.filter(token => {
      if (activeTab !== "all" && token.chain !== activeTab) {
        return false;
      }
      
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          token.name?.toLowerCase().includes(query) || 
          token.symbol?.toLowerCase().includes(query)
        );
      }
      
      return true;
    });
  }, [tokens, activeTab, searchQuery]);

  const tokenCounts = useMemo(() => {
    const counts: Record<string, number> = { all: tokens.length };
    tokens.forEach(token => {
      counts[token.chain] = (counts[token.chain] || 0) + 1;
    });
    return counts;
  }, [tokens]);

  return {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    filteredTokens,
    tokenCounts
  };
};

export default useTokenFilter;
