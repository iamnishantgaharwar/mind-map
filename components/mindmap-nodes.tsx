"use client"
import type React from "react";
import { Handle, NodeProps, NodeResizer, Position, useReactFlow, Node } from "@xyflow/react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export type MindmapNodeData = {
  label: string;
};

const MindmapNodes: React.FC<NodeProps<Node<MindmapNodeData>>> = ({ id, data, selected }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(data.label || "New Node");
  const inputRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { updateNodeData, updateNode } = useReactFlow();

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  // Auto-resize node based on text content
  useEffect(() => {
    if (!isEditing && textRef.current && title.trim()) {
      const padding = 24; // px-3 py-2 = 12px each side
      const minWidth = 120;
      const minHeight = 60;
      const maxWidth = 400;
      
      // Create a temporary element to measure text
      const temp = document.createElement('div');
      temp.style.position = 'absolute';
      temp.style.visibility = 'hidden';
      temp.style.width = 'auto';
      temp.style.fontSize = '0.875rem'; // text-sm
      temp.style.padding = '0.5rem 0.75rem'; // py-2 px-3
      temp.style.whiteSpace = 'nowrap';
      temp.textContent = title;
      document.body.appendChild(temp);
      
      const newWidth = Math.max(minWidth, Math.min(maxWidth, temp.offsetWidth + padding));
      document.body.removeChild(temp);
      
      // Calculate height based on wrapped text
      const charsPerLine = Math.floor((newWidth - padding) / 7); // Approximate char width
      const lines = Math.ceil(title.length / charsPerLine);
      const lineHeight = 20; // Approximate line height
      const newHeight = Math.max(minHeight, lines * lineHeight + padding);
      
      // Update node dimensions
      updateNode(id, {
        style: { width: newWidth, height: newHeight }
      });
    } else if (!isEditing && !title.trim()) {
      // If text is empty, maintain minimum size
      updateNode(id, {
        style: { width: 120, height: 60 }
      });
    }
  }, [title, isEditing, id, updateNode]);

  const handleBlur = () => {
    setIsEditing(false);
    updateNodeData(id, { label: title });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleBlur();
    }
    if (e.key === "Escape") {
      setTitle(data.label || "New Node");
      setIsEditing(false);
    }
  };

  return (
    <>
      <NodeResizer 
        minWidth={120} 
        minHeight={60}
        isVisible={selected}
        lineClassName="border-blue-400!"
        handleClassName="w-2! h-2! bg-blue-400!"
      />

      <div className={cn(
        "h-full w-full rounded-md border bg-white transition-all",
        selected ? "border-blue-400 shadow-lg" : "border-gray-300 shadow-sm"
      )}>
        <div className="flex items-center justify-center h-full px-3 py-2">
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent text-sm text-gray-900 text-center outline-none"
            />
          ) : (
            <div
              ref={textRef}
              onClick={() => setIsEditing(true)}
              className="w-full text-sm text-gray-900 text-center cursor-text break-words"
            >
              {title || "Click to edit"}
            </div>
          )}
        </div>
      </div>

      <Handle 
        type="target" 
        position={Position.Top}
        className="w-4! h-4! bg-blue-400! border-none! opacity-0 hover:opacity-100!"
      />
      <Handle 
        type="source" 
        position={Position.Bottom}
        className="w-4! h-4! bg-blue-400! border-none! opacity-0 hover:opacity-100!"
      />
      <Handle 
        type="source" 
        position={Position.Right}
        className="w-4! h-4! bg-blue-400! border-none! opacity-0 hover:opacity-100!"
      />
      <Handle 
        type="source" 
        position={Position.Left}
        className="w-4! h-4! bg-blue-400! border-none! opacity-0 hover:opacity-100!"
      />
    </>
  );
};

export default MindmapNodes;
