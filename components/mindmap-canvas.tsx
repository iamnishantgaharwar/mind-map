"use client";
import useStore, { RFState } from "@/store/store";
import {
  ReactFlow,
  Controls,
  Panel,
  Background,
  NodeOrigin,
  ReactFlowInstance,
  NodeTypes,
  MiniMap,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { shallow } from "zustand/shallow";
import MindmapNodes from "./mindmap-nodes";
import MindmapEdges from "./mindmap-edges";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { useTheme } from "next-themes";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Textarea } from "./ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { toast } from "sonner";
import { Command, Keyboard, Upload, FileText, Sparkles, Copy, ExternalLink, Moon, Sun } from "lucide-react";
import React, { useRef, useState, useEffect, useCallback } from "react";
import useMousePosition from "@/hooks/useMousePosition";

const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  childMode: state.childMode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  addNode: state.addNode,
  onConnect: state.onConnect,
  clearAll: state.clearAll,
  exportData: state.exportData,
  importData: state.importData,
  toggleChildMode: state.toggleChildMode,
});

// Setting node origin to center
const nodeOrigin: NodeOrigin = [0.5, 0.5];

const nodeTypes: NodeTypes = {
  input: MindmapNodes,
};

const edgeTypes = {
  mindmap: MindmapEdges,
};

const MindmapCanvas = () => {
  const { nodes, edges, childMode, onNodesChange, onEdgesChange, addNode, onConnect, clearAll, exportData, importData, toggleChildMode } = useStore(
    selector,
    shallow
  );
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  const proOptions = { hideAttribution: true };
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const { x, y } = useMousePosition(); // viewport coords (clientX/clientY)
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [showCommandsDialog, setShowCommandsDialog] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showAskAIDialog, setShowAskAIDialog] = useState(false);
  const [jsonInput, setJsonInput] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  // Check if user is on mobile
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor;
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(isMobileDevice || isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleAddNode = useCallback(() => {
    if (!reactFlowWrapper.current || !rfInstance) return;

    const bounds = reactFlowWrapper.current.getBoundingClientRect();
    const localX = x - bounds.left;
    const localY = y - bounds.top;
    const position = rfInstance.screenToFlowPosition({ x: localX, y: localY });
    addNode(position.x, position.y);
  }, [x, y, rfInstance, addNode]);

  const handleExport = () => {
    const jsonData = exportData();
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `mindmap-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportFromFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target?.result as string;
          const result = importData(content);
          
          // Show toast notification if child mode is on
          if (childMode) {
            if (result.success) {
              toast.success(result.message);
            } else {
              toast.error(result.message);
            }
          }
          
          if (result.success) {
            setShowImportDialog(false);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleImportFromText = () => {
    if (!jsonInput.trim()) {
      if (childMode) {
        toast.error("Please paste JSON data first");
      }
      return;
    }

    const result = importData(jsonInput);
    
    // Show toast notification if child mode is on
    if (childMode) {
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    }
    
    if (result.success) {
      setJsonInput("");
      setShowImportDialog(false);
    }
  };

  const handleClearAll = () => {
    if (childMode) {
      setShowClearDialog(true);
    } else {
      clearAll();
    }
  };

  const  getAIPrompt = () => {
    return `Create a mindmap in JSON format with the following structure:

{
  "_metadata": {
    "version": "1.0.0",
    "format": "mindmap-json",
    "author": "Nishant Gaharwar",
    "github": "https://github.com/iamnishantgaharwar",
    "website": "https://www.nishantgaharwar.com",
    "exportedAt": "2025-11-15T10:30:00.000Z",
    "description": "Mindmap data file - Do not modify this metadata"
  },
  "nodes": [
    {
      "id": "unique-id-1",
      "type": "input",
      "position": { "x": 0, "y": 0 },
      "data": { "label": "Node Title" },
      "style": { "width": 150, "height": 80 }
    }
  ],
  "edges": [
    {
      "id": "unique-edge-id",
      "source": "node-id-1",
      "target": "node-id-2",
      "style": { "stroke": "#ef4444" }
    }
  ]
}

Available edge colors (pick randomly):
#ef4444 (red), #f97316 (orange), #f59e0b (amber), #84cc16 (lime), #10b981 (emerald), #14b8a6 (teal), #06b6d4 (cyan), #3b82f6 (blue), #6366f1 (indigo), #8b5cf6 (violet), #a855f7 (purple), #d946ef (fuchsia), #ec4899 (pink), #f43f5e (rose)

CRITICAL POSITIONING RULES:

For Hierarchical Layout (Parent-Child relationships):
- Root/Parent node: x=400, y=0 (center top)
- Child nodes: Place BELOW parent with y = parent.y + 150
- Siblings: Space horizontally 250px apart
- Example hierarchy:
  * Parent at (400, 0)
  * Child 1 at (250, 150)
  * Child 2 at (400, 150)
  * Child 3 at (550, 150)
  * Grandchild 1.1 at (200, 300)
  * Grandchild 1.2 at (300, 300)

For Circular/Radial Layout:
- Center node: x=400, y=300
- Surrounding nodes: Place in circle around center
- Radius: 250-300px from center
- Calculate positions using:
  * x = centerX + radius * cos(angle)
  * y = centerY + radius * sin(angle)
- Distribute angles evenly (360° / number of nodes)
- Example for 6 nodes around center:
  * Node 1: (400 + 250*cos(0°), 300 + 250*sin(0°)) = (650, 300)
  * Node 2: (400 + 250*cos(60°), 300 + 250*sin(60°)) = (525, 517)
  * Node 3: (400 + 250*cos(120°), 300 + 250*sin(120°)) = (275, 517)
  * And so on...

General Rules:
- Each node must have a unique ID (use descriptive names like "node-parent", "node-child-1")
- Minimum spacing between nodes: 200px
- Node dimensions: width=150px, height=80px (always)
- Each edge must connect existing node IDs
- Use different colors for different edges
- Keep the _metadata structure exactly as shown
- Avoid overlapping nodes
- Create clear visual hierarchy

Now create a mindmap about: [YOUR TOPIC HERE]`;
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(getAIPrompt());
    if (childMode) {
      toast.success("Prompt copied to clipboard!");
    }
  };

  const handleOpenChatGPT = () => {
    const prompt = encodeURIComponent(getAIPrompt());
    window.open(`https://chat.openai.com/?q=${prompt}`, '_blank');
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+R / Ctrl+R: Add node at mouse position
      if ((e.metaKey || e.ctrlKey) && e.key === 'r') {
        e.preventDefault();
        handleAddNode();
      }
      
      // Cmd+C / Ctrl+C: Connect two selected nodes
      if ((e.metaKey || e.ctrlKey) && e.key === 'c') {
        const selectedNodes = nodes.filter(node => node.selected);
        
        if (selectedNodes.length === 2) {
          e.preventDefault(); // Prevent default copy behavior
          
          // Check if edge already exists
          const edgeExists = edges.some(
            edge => 
              (edge.source === selectedNodes[0].id && edge.target === selectedNodes[1].id) ||
              (edge.source === selectedNodes[1].id && edge.target === selectedNodes[0].id)
          );
          
          if (!edgeExists) {
            onConnect({
              source: selectedNodes[0].id,
              target: selectedNodes[1].id,
              sourceHandle: null,
              targetHandle: null,
            });
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [x, y, rfInstance, nodes, edges, onConnect, handleAddNode]); // Dependencies



  // Show mobile warning
  if (isMobile) {
    return (
      <div className="h-screen w-screen bg-background flex items-center justify-center p-6">
        <div className="max-w-md text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Desktop Browser Required</h1>
            <p className="text-muted-foreground">
              This mindmap tool is optimized for desktop browsers and requires a larger screen for the best experience.
            </p>
          </div>

          <div className="space-y-3 text-sm text-muted-foreground">
            <p className="font-medium">Please open this app on:</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 justify-center">
                <span className="text-blue-500">•</span>
                <span>Desktop or Laptop computer</span>
              </li>
              <li className="flex items-center gap-2 justify-center">
                <span className="text-blue-500">•</span>
                <span>Tablet in landscape mode (minimum 768px width)</span>
              </li>
            </ul>
          </div>

          <div className="pt-4">
            <p className="text-xs text-muted-foreground">
              Features like node editing, dragging, and keyboard shortcuts work best with a mouse and keyboard.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-background" ref={reactFlowWrapper}>
      <ReactFlow
        colorMode={isDark ? 'dark' : 'light'}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeOrigin={nodeOrigin}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onConnect={onConnect}
        proOptions={proOptions}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        minZoom={0.2}
        maxZoom={2}
        onInit={(instance) => setRfInstance(instance)}
      >
        <MiniMap 
          nodeColor={isDark ? "#1f2937" : "var(--color-gray-300)"}
          maskColor={isDark ? "rgb(17, 24, 39, 0.6)" : "rgb(240, 240, 240, 0.6)"}
        />
        <Controls showInteractive={false} />
        <Panel position="top-left" className="flex gap-2">
          <Button 
            onClick={() => setShowCommandsDialog(true)} 
            variant="outline"
          >
            <Command className="w-4 h-4 mr-2" />
            Commands
          </Button>
          <Button 
            onClick={() => setShowAskAIDialog(true)} 
            variant="outline"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Ask AI
          </Button>
          <Button 
            onClick={handleExport} 
            variant="outline"
          >
            Export
          </Button>
          <Button 
            onClick={() => setShowImportDialog(true)} 
            variant="outline"
          >
            Import
          </Button>
          <Button 
            onClick={handleClearAll} 
            variant="outline"
          >
            Clear All
          </Button>
        </Panel>
        <Panel position="top-right" className="flex flex-col gap-2">
          {childMode ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg border shadow-sm bg-card cursor-help">
                  <span className="text-sm font-medium text-card-foreground">Child Mode</span>
                  <Switch checked={childMode} onCheckedChange={toggleChildMode} />
                </div>
              </TooltipTrigger>
              <TooltipContent side="left" className="max-w-xs">
                <p className="text-sm">
                  <strong>ON:</strong> Shows confirmation dialogs, tooltips and success messages.
                  <br />
                  <strong>OFF:</strong> Actions execute immediately without interruptions.
                </p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg border shadow-sm bg-card">
              <span className="text-sm font-medium text-card-foreground">Child Mode</span>
              <Switch checked={childMode} onCheckedChange={toggleChildMode} />
            </div>
          )}
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border shadow-sm bg-card">
            <span className="text-sm font-medium text-card-foreground">Dark Mode</span>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className={isDark ? 'text-yellow-400 hover:text-yellow-300' : 'text-gray-600 hover:text-gray-900'}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>
        </Panel>
        <Background gap={16} color={isDark ? "#374151" : "#e5e7eb"} />
      </ReactFlow>

      {/* Ask AI Dialog */}
      <Dialog open={showAskAIDialog} onOpenChange={setShowAskAIDialog}>
        <DialogContent className="max-w-2xl max-h-[92vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-500" />
              Ask AI to Create Mindmap
            </DialogTitle>
            <DialogDescription>
              Use AI to generate mindmap JSON data. Choose your preferred AI assistant.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* Prompt Preview */}
            <div className="bg-muted border rounded-lg p-4">
              <h3 className="text-sm font-semibold mb-2">Prompt Preview</h3>
              <div className="bg-background border rounded p-3 max-h-[200px] overflow-y-auto">
                <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-mono">
                  {getAIPrompt()}
                </pre>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="grid grid-cols-1 gap-3">
                <Button 
                  onClick={handleOpenChatGPT}
                  className="w-full justify-start h-auto py-4"
                  variant="outline"
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="flex items-center justify-center w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <ExternalLink className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-sm">Open in ChatGPT</div>
                      <div className="text-xs text-muted-foreground">Opens ChatGPT with pre-filled prompt</div>
                    </div>
                  </div>
                </Button>

                <Button 
                  onClick={handleCopyPrompt}
                  className="w-full justify-start h-auto py-4"
                  variant="outline"
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Copy className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-sm">Copy Prompt</div>
                      <div className="text-xs text-muted-foreground">Use with any AI assistant (Claude, Gemini, etc.)</div>
                    </div>
                  </div>
                </Button>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">How to use:</h4>
              <ol className="text-xs text-blue-700 dark:text-blue-400 space-y-1 list-decimal list-inside">
                <li>Click &quot;Open in ChatGPT&quot; or copy the prompt</li>
                <li>Replace [YOUR TOPIC HERE] with your desired mindmap topic</li>
                <li>Let AI generate the JSON structure</li>
                <li>Copy the generated JSON</li>
                <li>Use the Import button to paste it into your mindmap</li>
              </ol>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Import Dialog */}
      <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Import Mindmap</DialogTitle>
            <DialogDescription>
              Choose how you want to import your mindmap data
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="paste" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="paste">
                <FileText className="w-4 h-4 mr-2" />
                Paste JSON
              </TabsTrigger>
              <TabsTrigger value="upload">
                <Upload className="w-4 h-4 mr-2" />
                Upload File
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="paste" className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Paste your mindmap JSON data below:
                </label>
                <Textarea
                  placeholder='{"_metadata": {...}, "nodes": [...], "edges": [...]}'
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  className="min-h-[200px] max-h-[200px] font-mono text-xs"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowImportDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleImportFromText}>
                  Import
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="upload" className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Upload JSON File
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  Select a previously exported mindmap JSON file
                </p>
                <Button onClick={handleImportFromFile}>
                  Choose File
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Commands Dialog */}
      <Dialog open={showCommandsDialog} onOpenChange={setShowCommandsDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Keyboard className="w-5 h-5" />
              Keyboard Shortcuts & Features
            </DialogTitle>
            <DialogDescription>
              Learn how to use the mindmap app efficiently
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Keyboard Shortcuts */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Keyboard Shortcuts</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between py-2 px-3 bg-muted rounded-md">
                  <span className="text-sm">Add node at cursor</span>
                  <kbd className="px-2 py-1 text-xs font-semibold bg-background border rounded">
                    Cmd/Ctrl + R
                  </kbd>
                </div>
                <div className="flex items-center justify-between py-2 px-3 bg-muted rounded-md">
                  <span className="text-sm">Connect two selected nodes</span>
                  <kbd className="px-2 py-1 text-xs font-semibold bg-background border rounded">
                    Cmd/Ctrl + C
                  </kbd>
                </div>
                <div className="flex items-center justify-between py-2 px-3 bg-muted rounded-md">
                  <span className="text-sm">Delete selected nodes/edges</span>
                  <kbd className="px-2 py-1 text-xs font-semibold bg-background border rounded">
                    Delete
                  </kbd>
                </div>
                <div className="flex items-center justify-between py-2 px-3 bg-muted rounded-md">
                  <span className="text-sm">Edit node text</span>
                  <kbd className="px-2 py-1 text-xs font-semibold bg-background border rounded">
                    Click on node
                  </kbd>
                </div>
                <div className="flex items-center justify-between py-2 px-3 bg-muted rounded-md">
                  <span className="text-sm">Save text changes</span>
                  <kbd className="px-2 py-1 text-xs font-semibold bg-background border rounded">
                    Enter
                  </kbd>
                </div>
                <div className="flex items-center justify-between py-2 px-3 bg-muted rounded-md">
                  <span className="text-sm">Cancel editing</span>
                  <kbd className="px-2 py-1 text-xs font-semibold bg-background border rounded">
                    Escape
                  </kbd>
                </div>
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Features</h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-md">
                  <h4 className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-1">Auto-Save</h4>
                  <p className="text-xs text-blue-700 dark:text-blue-400">
                    Your mindmap is automatically saved to browser storage. It will persist even after refreshing the page.
                  </p>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-md">
                  <h4 className="text-sm font-medium text-green-900 dark:text-green-300 mb-1">Export & Import</h4>
                  <p className="text-xs text-green-700 dark:text-green-400">
                    Export your mindmap as JSON to save it permanently or share with others. Import previously exported files to restore your work.
                  </p>
                </div>
                <div className="p-3 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900 rounded-md">
                  <h4 className="text-sm font-medium text-purple-900 dark:text-purple-300 mb-1">Colorful Connections</h4>
                  <p className="text-xs text-purple-700 dark:text-purple-400">
                    Each connection automatically gets a unique vibrant color to help you visually distinguish different relationships.
                  </p>
                </div>
                <div className="p-3 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900 rounded-md">
                  <h4 className="text-sm font-medium text-orange-900 dark:text-orange-300 mb-1">Child Mode</h4>
                  <p className="text-xs text-orange-700 dark:text-orange-400">
                    Toggle in the top-right corner. When ON, shows confirmation dialogs and success messages. When OFF, actions execute immediately without interruptions for faster workflow.
                  </p>
                </div>
                <div className="p-3 bg-pink-50 dark:bg-pink-950/30 border border-pink-200 dark:border-pink-900 rounded-md">
                  <h4 className="text-sm font-medium text-pink-900 dark:text-pink-300 mb-1">Resizable Nodes</h4>
                  <p className="text-xs text-pink-700 dark:text-pink-400">
                    Select a node to see resize handles. Drag the corners to make nodes bigger or smaller to fit your content.
                  </p>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Tips</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>Hold Cmd/Ctrl and click to select multiple nodes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>Drag nodes to reposition them on the canvas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>Use the minimap (bottom-left) to navigate large mindmaps</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>Scroll to zoom in/out, or use the controls (bottom-left)</span>
                </li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Clear All Confirmation Dialog */}
      <AlertDialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear all nodes and edges?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete all nodes and connections from your mindmap.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                clearAll();
                setShowClearDialog(false);
              }}
            >
              Clear All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MindmapCanvas;
