"use client";

import { useEffect, useState } from "react";
import { Command } from "lucide-react";
import { Badge } from "./ui/badge";

interface CursorBadgeProps {
  show: boolean;
  selectedNodesCount: number;
}

const CursorBadge = ({ show, selectedNodesCount }: CursorBadgeProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!show) {
      setIsVisible(false);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [show]);

  if (!show || !isVisible) return null;

  // Detect if user is on Mac
  const isMac = typeof window !== "undefined" && navigator.userAgent.toUpperCase().indexOf("MAC") >= 0;
  
  // Show different shortcut based on selected nodes count
  const shortcut = selectedNodesCount === 2 
    ? (isMac ? "⌘ C" : "Ctrl C")
    : (isMac ? "⌘ R" : "Ctrl R");
  
  const action = selectedNodesCount === 2 ? "to connect" : "to add node";

  return (
    <div
      className="fixed pointer-events-none z-[9999] transition-opacity duration-200"
      style={{
        left: `${position.x + 10}px`,
        top: `${position.y + 10}px`,
      }}
    >
      <Badge className="flex items-center gap-1.5">
        <Command className="w-3 h-3" />
        <span>{shortcut}</span>
        <span className="opacity-75">{action}</span>
      </Badge>
    </div>
  );
};

export default CursorBadge;
