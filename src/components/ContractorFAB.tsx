import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Send, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ContractorFABProps {
  onCreateBid?: () => void;
  onSendPaymentLink?: () => void;
}

export const ContractorFAB: React.FC<ContractorFABProps> = ({
  onCreateBid,
  onSendPaymentLink,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleCreateBid = () => {
    setIsOpen(false);
    onCreateBid?.() || navigate('/estimates/new');
  };

  const handleSendPaymentLink = () => {
    setIsOpen(false);
    onSendPaymentLink?.() || navigate('/estimates');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 md:hidden">
      {/* Main FAB Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="lg"
        className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-shadow"
        aria-label="Menu"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </Button>

      {/* Action Buttons */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 space-y-3 animate-in fade-in slide-in-from-bottom-2">
          {/* Create Bid Button */}
          <div className="flex items-center gap-3 justify-end">
            <span className="text-sm font-medium text-muted-foreground bg-background px-3 py-1 rounded-lg shadow">
              Create Bid
            </span>
            <Button
              onClick={handleCreateBid}
              size="lg"
              variant="secondary"
              className="rounded-full w-12 h-12 shadow-md hover:shadow-lg transition-shadow"
              aria-label="Create new bid"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>

          {/* Send Payment Link Button */}
          <div className="flex items-center gap-3 justify-end">
            <span className="text-sm font-medium text-muted-foreground bg-background px-3 py-1 rounded-lg shadow">
              Payment Link
            </span>
            <Button
              onClick={handleSendPaymentLink}
              size="lg"
              variant="secondary"
              className="rounded-full w-12 h-12 shadow-md hover:shadow-lg transition-shadow"
              aria-label="Send payment link"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default ContractorFAB;

