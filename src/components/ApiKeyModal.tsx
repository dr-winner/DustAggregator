
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Key } from "lucide-react";
import { setAlchemyApiKey, getAlchemyApiKey } from '@/utils/alchemyService';

interface ApiKeyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onKeySubmit?: () => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ 
  open, 
  onOpenChange,
  onKeySubmit
}) => {
  const [apiKey, setApiKey] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if we already have an API key stored
    const existingKey = getAlchemyApiKey();
    if (existingKey) {
      setApiKey(existingKey);
    }
  }, [open]);

  const handleSubmit = () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter a valid Alchemy API key",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Save the API key
      setAlchemyApiKey(apiKey.trim());
      
      toast({
        title: "API Key Saved",
        description: "Your Alchemy API key has been saved successfully.",
      });
      
      if (onKeySubmit) onKeySubmit();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save API key.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md glassmorphic border-none bg-black/30">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="h-5 w-5 text-primary" />
            <span>Enter Alchemy API Key</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="api-key">Alchemy API Key</Label>
            <Input
              id="api-key"
              placeholder="Enter your Alchemy API key..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="bg-black/20 border-white/10"
            />
          </div>
          
          <p className="text-sm text-muted-foreground">
            This API key will be stored in your browser's local storage and used to fetch blockchain data from Alchemy.
          </p>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {isSubmitting ? 'Saving...' : 'Save API Key'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyModal;
