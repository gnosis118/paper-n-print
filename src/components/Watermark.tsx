import React from 'react';

export function Watermark() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="select-none text-6xl md:text-8xl font-bold text-gray-400/20 transform -rotate-45 whitespace-nowrap"
        style={{
          textShadow: '0 0 10px rgba(0,0,0,0.1)'
        }}
      >
        PROINVOICE.APP
      </div>
    </div>
  );
}
