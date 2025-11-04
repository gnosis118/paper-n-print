import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, Edit2, Eye } from 'lucide-react';

export interface SwipeAction {
  label: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
}

interface SwipeableCardProps {
  children: React.ReactNode;
  actions?: SwipeAction[];
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  className?: string;
}

const SwipeableCard: React.FC<SwipeableCardProps> = ({
  children,
  actions = [],
  onSwipeLeft,
  onSwipeRight,
  className,
}) => {
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const SWIPE_THRESHOLD = 50;
  const MAX_SWIPE = 80;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = currentX - touchStartX.current;
    const diffY = currentY - touchStartY.current;

    // Only allow horizontal swipe if horizontal movement is greater than vertical
    if (Math.abs(diffX) > Math.abs(diffY)) {
      e.preventDefault();
      const newOffset = Math.max(-MAX_SWIPE, Math.min(MAX_SWIPE, diffX));
      setSwipeOffset(newOffset);
    }
  };

  const handleTouchEnd = () => {
    setIsAnimating(true);

    if (swipeOffset < -SWIPE_THRESHOLD && onSwipeLeft) {
      onSwipeLeft();
      setSwipeOffset(-MAX_SWIPE);
    } else if (swipeOffset > SWIPE_THRESHOLD && onSwipeRight) {
      onSwipeRight();
      setSwipeOffset(MAX_SWIPE);
    } else {
      setSwipeOffset(0);
    }

    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleReset = () => {
    setIsAnimating(true);
    setSwipeOffset(0);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div className="relative overflow-hidden rounded-lg">
      {/* Action buttons background */}
      {actions.length > 0 && (
        <div className="absolute inset-0 flex items-center justify-end gap-2 px-4 bg-red-50 rounded-lg">
          {actions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => {
                action.onClick();
                handleReset();
              }}
              className={cn(
                'p-2 rounded-lg transition-all',
                action.color
              )}
              title={action.label}
            >
              {action.icon}
            </button>
          ))}
        </div>
      )}

      {/* Swipeable card */}
      <div
        ref={cardRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={cn(
          'transition-transform duration-300 ease-out cursor-grab active:cursor-grabbing',
          isAnimating && 'transition-transform duration-300',
          className
        )}
        style={{
          transform: `translateX(${swipeOffset}px)`,
        }}
      >
        <Card className="bg-white hover:shadow-md transition-shadow">
          {children}
        </Card>
      </div>

      {/* Swipe hint for first interaction */}
      {swipeOffset === 0 && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
          <div className="animate-pulse text-muted-foreground text-xs opacity-50">
            ← Swipe
          </div>
        </div>
      )}
    </div>
  );
};

export default SwipeableCard;

