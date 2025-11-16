import { createWithEqualityFn } from "zustand/traditional";
import {
    Edge,
    EdgeChange,
    Node,
    NodeChange,
    OnEdgesChange,
    OnNodesChange,
    applyEdgeChanges,
    applyNodeChanges,
    OnConnect,
    Connection
} from '@xyflow/react'


export type ImportResult = {
    success: boolean;
    message: string;
    type: 'success' | 'error';
}

export type RFState = {
    nodes: Node[];
    edges: Edge[];
    childMode: boolean;
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    addNode: (x: number, y: number) => void;
    addOutputNode: (x: number, y: number) => void;
    onConnect: OnConnect;
    clearAll: () => void;
    exportData: () => string;
    importData: (jsonData: string) => ImportResult;
    toggleChildMode: () => void;
}

// Vibrant colors that stand out on light background
const edgeColors = [
    '#ef4444', // red
    '#f97316', // orange
    '#f59e0b', // amber
    '#84cc16', // lime
    '#10b981', // emerald
    '#14b8a6', // teal
    '#06b6d4', // cyan
    '#3b82f6', // blue
    '#6366f1', // indigo
    '#8b5cf6', // violet
    '#a855f7', // purple
    '#d946ef', // fuchsia
    '#ec4899', // pink
    '#f43f5e', // rose
];

const getRandomEdgeColor = () => {
    return edgeColors[Math.floor(Math.random() * edgeColors.length)];
}

// LocalStorage key
const STORAGE_KEY = 'mindmap-data';

// Load initial state from localStorage
const loadFromStorage = (): { nodes: Node[], edges: Edge[] } => {
    if (typeof window === 'undefined') return { nodes: [], edges: [] };
    
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (error) {
        console.error('Failed to load from localStorage:', error);
    }
    return { nodes: [], edges: [] };
}

// Save to localStorage
const saveToStorage = (nodes: Node[], edges: Edge[]) => {
    if (typeof window === 'undefined') return;
    
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ nodes, edges }));
    } catch (error) {
        console.error('Failed to save to localStorage:', error);
    }
}

/**
 * Normalizes all node types to "input" to ensure consistent rendering
 * with the MindmapNodes component, regardless of AI-generated or imported data.
 * 
 * @param nodes - Array of nodes to normalize
 * @returns New array with all nodes having type "input"
 */
const normalizeNodeTypes = (nodes: Node[]): Node[] => {
    return nodes.map(node => ({
        ...node,
        type: 'input'
    }));
};

// Now we have to create a store for it
const initialState = loadFromStorage();

const useStore = createWithEqualityFn<RFState>(
    ( set, get ) => ({
        nodes: initialState.nodes,
        edges: initialState.edges,
        childMode: true, // Default to true (show alerts)
        onNodesChange: ( changes: NodeChange[]) => {
            const updatedNodes = applyNodeChanges(changes, get().nodes);
            set({ nodes: updatedNodes });
            saveToStorage(updatedNodes, get().edges);
        },
        onEdgesChange: ( changes: EdgeChange[]) => {
            const updatedEdges = applyEdgeChanges(changes, get().edges);
            set({ edges: updatedEdges });
            saveToStorage(get().nodes, updatedEdges);
        },
        addNode: (x: number, y: number) => {
            const newNode = {
                id: crypto.randomUUID(),
                type: 'input',
                data: { label: 'New Node' },
                position: { x, y },
                style: { width: 150, height: 80 }
            }
            const updatedNodes = [...get().nodes, newNode];
            set({ nodes: updatedNodes });
            saveToStorage(updatedNodes, get().edges);
        },
        addOutputNode: (x: number, y: number) => {
            const newNode = {
                id: crypto.randomUUID(),
                type: 'output',
                data: { label: 'New Output Node'},
                position: { x, y },
                style: { width: 150, height: 80 }
            }
            const updatedNodes = [...get().nodes, newNode];
            set({ nodes: updatedNodes });
            saveToStorage(updatedNodes, get().edges);
        },
        onConnect: (params: Connection) => {
            const newEdge = {
                id: crypto.randomUUID(),
                source: params.source,
                target: params.target,
                style: { stroke: getRandomEdgeColor() },
                data: { color: getRandomEdgeColor() }
            };
            const updatedEdges = [...get().edges, newEdge];
            set({ edges: updatedEdges });
            saveToStorage(get().nodes, updatedEdges);
        },
        clearAll: () => {
            set({ nodes: [], edges: [] });
            saveToStorage([], []);
        },
        exportData: () => {
            const exportData = {
                _metadata: {
                    version: "1.0.0",
                    format: "mindmap-json",
                    author: "Nishant Gaharwar",
                    github: "https://github.com/iamnishantgaharwar",
                    website: "https://www.nishantgaharwar.com",
                    exportedAt: new Date().toISOString(),
                    description: "Mindmap data file - Do not modify this metadata"
                },
                nodes: get().nodes,
                edges: get().edges
            };
            return JSON.stringify(exportData, null, 2);
        },
        importData: (jsonData: string): ImportResult => {
            try {
                const data = JSON.parse(jsonData);
                
                // Validate the file format
                if (!data._metadata || data._metadata.format !== "mindmap-json") {
                    return {
                        success: false,
                        message: 'Invalid file format. Please upload a valid mindmap JSON file.',
                        type: 'error'
                    };
                }
                
                // Check if it has the required data
                if (!data.nodes || !data.edges) {
                    return {
                        success: false,
                        message: 'Invalid mindmap data. Missing nodes or edges.',
                        type: 'error'
                    };
                }
                
                // Normalize node types to ensure consistent rendering
                const normalizedNodes = normalizeNodeTypes(data.nodes);
                
                // Import the data with normalized nodes
                set({ nodes: normalizedNodes, edges: data.edges });
                saveToStorage(normalizedNodes, data.edges);
                
                // Return success with file info
                const exportedAt = data._metadata.exportedAt 
                    ? new Date(data._metadata.exportedAt).toLocaleDateString() 
                    : 'Unknown date';
                
                return {
                    success: true,
                    message: `Successfully imported mindmap (exported on ${exportedAt})`,
                    type: 'success'
                };
                
            } catch (error) {
                console.error('Failed to import data:', error);
                return {
                    success: false,
                    message: 'Invalid JSON file. Please check the file and try again.',
                    type: 'error'
                };
            }
        },
        toggleChildMode: () => {
            set({ childMode: !get().childMode });
        }
    })
)


export default useStore;