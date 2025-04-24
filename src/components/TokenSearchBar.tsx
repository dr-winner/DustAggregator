
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";

interface TokenSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const TokenSearchBar: React.FC<TokenSearchBarProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search tokens..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 w-48"
        />
      </div>
      <Button variant="outline" size="icon">
        <SlidersHorizontal className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default TokenSearchBar;
