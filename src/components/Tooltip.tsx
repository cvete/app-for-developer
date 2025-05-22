import React from "react";

interface TooltipProps {
  show: boolean;
  x: number;
  y: number;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ show, x, y, children }) => {
  if (!show) return null;
  return (
    <div
      className="fixed z-50"
      style={{ left: x, top: y, pointerEvents: 'none' }}
    >
      <div className="bg-white rounded-md shadow-lg px-4 py-3 min-w-[160px] text-sm border border-gray-100">
        {children}
      </div>
    </div>
  );
};

export default Tooltip;
