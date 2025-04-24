
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChainIcon } from "./ChainIcon";
import { ArrowRight } from "lucide-react";

type OutputAsset = {
  symbol: string;
  chain: 'ethereum' | 'starknet' | 'solana' | 'polygon' | 'stellar';
};

interface ConversionSettingsProps {
  totalValue: number;
  onConfirm: (output: OutputAsset, withdrawalMethod: string) => void;
  onBack: () => void;
}

export const ConversionSettings: React.FC<ConversionSettingsProps> = ({
  totalValue,
  onConfirm,
  onBack
}) => {
  const [outputAsset, setOutputAsset] = useState<OutputAsset>({
    symbol: 'USDC',
    chain: 'stellar'
  });
  const [withdrawalMethod, setWithdrawalMethod] = useState('withdraw');
  
  const outputOptions = [
    { symbol: 'USDC', chain: 'stellar' as const },
    { symbol: 'XLM', chain: 'stellar' as const },
    { symbol: 'ETH', chain: 'ethereum' as const },
    { symbol: 'SOL', chain: 'solana' as const },
    { symbol: 'MATIC', chain: 'polygon' as const }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Convert Dust Tokens</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 bg-secondary rounded-lg">
          <div className="text-sm text-muted-foreground mb-1">Total Value</div>
          <div className="text-2xl font-bold">${totalValue.toFixed(2)}</div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="output-asset">Convert to</Label>
          <Select
            value={`${outputAsset.chain}-${outputAsset.symbol}`}
            onValueChange={(value) => {
              const [chain, symbol] = value.split('-');
              setOutputAsset({ 
                symbol, 
                chain: chain as 'ethereum' | 'starknet' | 'solana' | 'polygon' | 'stellar'
              });
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select output asset" />
            </SelectTrigger>
            <SelectContent>
              {outputOptions.map((option) => (
                <SelectItem key={`${option.chain}-${option.symbol}`} value={`${option.chain}-${option.symbol}`}>
                  <div className="flex items-center gap-2">
                    <ChainIcon chain={option.chain} size="sm" />
                    <span>{option.symbol}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label>What would you like to do with your converted dust?</Label>
          <RadioGroup 
            value={withdrawalMethod} 
            onValueChange={setWithdrawalMethod}
            className="grid grid-cols-1 gap-2"
          >
            <div className="flex items-start space-x-2 p-3 rounded-md bg-background border">
              <RadioGroupItem value="withdraw" id="withdraw" className="mt-1" />
              <div className="grid gap-1">
                <Label htmlFor="withdraw" className="font-medium">
                  Withdraw to my wallet
                </Label>
                <p className="text-sm text-muted-foreground">
                  Send the converted assets directly to my connected wallet
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2 p-3 rounded-md bg-background border">
              <RadioGroupItem value="donate" id="donate" className="mt-1" />
              <div className="grid gap-1">
                <Label htmlFor="donate" className="font-medium">
                  Donate to charity
                </Label>
                <p className="text-sm text-muted-foreground">
                  Contribute to ecosystem growth and development projects
                </p>
              </div>
            </div>
          </RadioGroup>
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button 
            onClick={() => onConfirm(outputAsset, withdrawalMethod)}
            className="relative overflow-hidden group bg-accent hover:bg-accent/90"
          >
            <span className="relative z-10 flex items-center">
              Convert and {withdrawalMethod === 'withdraw' ? 'Withdraw' : 'Donate'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </span>
            <span className="absolute inset-0 bg-glow-conic opacity-0 group-hover:opacity-20 transition-opacity duration-500"></span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversionSettings;
